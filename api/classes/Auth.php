<?php
/**
 * Authentication System
 * Production Ready Authentication with JWT, TOTP, Rate Limiting
 */

require_once __DIR__ . '/BaseAPI.php';
require_once __DIR__ . '/TOTP.php';

class Auth extends BaseAPI {
    
    /**
     * Login user with username/password
     */
    public function login(string $username, string $password): array {
        // Rate limiting
        $clientIP = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
        $rateLimitKey = "login_{$clientIP}";
        
        $rateLimit = $this->security['rate_limit']['login_attempts'];
        if (!$this->checkRateLimit($rateLimitKey, $rateLimit['max_attempts'], $rateLimit['window_minutes'])) {
            $this->sendError(429, 'Too many login attempts. Please try again later.');
        }
        
        // Get user
        $stmt = $this->pdo->prepare("
            SELECT id, username, email, password_hash, totp_secret, failed_login_attempts, locked_until, is_active
            FROM admin_users 
            WHERE username = ? AND is_active = 1
        ");
        $stmt->execute([$username]);
        $user = $stmt->fetch();
        
        if (!$user) {
            $this->logFailedLogin($username, 'user_not_found');
            $this->sendError(401, 'Invalid credentials');
        }
        
        // Check if account is locked
        if ($user['locked_until'] && strtotime($user['locked_until']) > time()) {
            $this->sendError(423, 'Account temporarily locked due to failed login attempts');
        }
        
        // Verify password
        if (!password_verify($password, $user['password_hash'])) {
            $this->handleFailedLogin($user['id'], $username);
            $this->sendError(401, 'Invalid credentials');
        }
        
        // Reset failed attempts on successful password verification
        $this->resetFailedAttempts($user['id']);
        
        // Check if TOTP is required
        if (!empty($user['totp_secret'])) {
            $tempSessionId = $this->createTempSession($user['id']);
            
            $this->logActivity($user['id'], 'login_mfa_required');
            
            return [
                'mfa_required' => true,
                'mfa_token' => $tempSessionId,
                'user_id' => $user['id']
            ];
        }
        
        // Create full session
        $sessionData = $this->createSession($user['id']);
        
        $this->logActivity($user['id'], 'login_success');
        
        return [
            'success' => true,
            'token' => $sessionData['token'],
            'user' => [
                'id' => $user['id'],
                'username' => $user['username'],
                'email' => $user['email']
            ]
        ];
    }
    
    /**
     * Verify TOTP code and complete login
     */
    public function verifyTOTP(string $mfaToken, string $totpCode): array {
        // Get temporary session
        $stmt = $this->pdo->prepare("
            SELECT ts.*, u.username, u.email, u.totp_secret
            FROM admin_temp_sessions ts
            JOIN admin_users u ON ts.user_id = u.id
            WHERE ts.id = ? AND ts.expires_at > NOW() AND u.is_active = 1
        ");
        $stmt->execute([$mfaToken]);
        $tempSession = $stmt->fetch();
        
        if (!$tempSession) {
            $this->sendError(401, 'Invalid or expired MFA session');
        }
        
        // Rate limiting for TOTP attempts
        $attempts = $tempSession['attempts'];
        $maxAttempts = $this->security['rate_limit']['totp_attempts']['max_attempts'];
        
        if ($attempts >= $maxAttempts) {
            // Delete temp session
            $this->deleteTempSession($mfaToken);
            $this->sendError(429, 'Too many TOTP attempts. Please login again.');
        }
        
        // Increment attempts
        $stmt = $this->pdo->prepare("UPDATE admin_temp_sessions SET attempts = attempts + 1 WHERE id = ?");
        $stmt->execute([$mfaToken]);
        
        // Verify TOTP code
        if (!TOTP::verify($tempSession['totp_secret'], $totpCode)) {
            $this->logActivity($tempSession['user_id'], 'login_mfa_failed', 'totp_verification', null, [
                'attempts' => $attempts + 1,
                'ip_address' => $_SERVER['REMOTE_ADDR'] ?? null
            ]);
            
            $this->sendError(401, 'Invalid TOTP code');
        }
        
        // Delete temp session
        $this->deleteTempSession($mfaToken);
        
        // Create full session
        $sessionData = $this->createSession($tempSession['user_id']);
        
        $this->logActivity($tempSession['user_id'], 'login_success', 'totp_verification');
        
        return [
            'success' => true,
            'token' => $sessionData['token'],
            'user' => [
                'id' => $tempSession['user_id'],
                'username' => $tempSession['username'],
                'email' => $tempSession['email']
            ]
        ];
    }
    
    /**
     * Create temporary session for MFA
     */
    private function createTempSession(int $userId): string {
        $sessionId = bin2hex(random_bytes(32));
        $expiresAt = date('Y-m-d H:i:s', time() + $this->security['jwt']['expiry']['temp_session']);
        
        $stmt = $this->pdo->prepare("
            INSERT INTO admin_temp_sessions (id, user_id, ip_address, expires_at) 
            VALUES (?, ?, ?, ?)
        ");
        $stmt->execute([
            $sessionId,
            $userId,
            $_SERVER['REMOTE_ADDR'] ?? null,
            $expiresAt
        ]);
        
        return $sessionId;
    }
    
    /**
     * Delete temporary session
     */
    private function deleteTempSession(string $sessionId): void {
        $stmt = $this->pdo->prepare("DELETE FROM admin_temp_sessions WHERE id = ?");
        $stmt->execute([$sessionId]);
    }
    
    /**
     * Create full authenticated session
     */
    private function createSession(int $userId): array {
        $sessionId = bin2hex(random_bytes(32));
        $expiresAt = date('Y-m-d H:i:s', time() + $this->security['jwt']['expiry']['access_token']);
        
        // Store session in database
        $stmt = $this->pdo->prepare("
            INSERT INTO admin_sessions (id, user_id, ip_address, user_agent, expires_at) 
            VALUES (?, ?, ?, ?, ?)
        ");
        $stmt->execute([
            $sessionId,
            $userId,
            $_SERVER['REMOTE_ADDR'] ?? null,
            $_SERVER['HTTP_USER_AGENT'] ?? null,
            $expiresAt
        ]);
        
        // Create JWT token
        $payload = [
            'session_id' => $sessionId,
            'user_id' => $userId,
            'exp' => time() + $this->security['jwt']['expiry']['access_token'],
            'iat' => time(),
            'iss' => 'workstab-admin'
        ];
        
        $token = JWT::encode($payload, $this->security['jwt']['secret'], $this->security['jwt']['algorithm']);
        
        // Set secure cookie
        $this->setSessionCookie($token);
        
        // Update last login
        $stmt = $this->pdo->prepare("UPDATE admin_users SET last_login_at = NOW() WHERE id = ?");
        $stmt->execute([$userId]);
        
        return [
            'token' => $token,
            'session_id' => $sessionId,
            'expires_at' => $expiresAt
        ];
    }
    
    /**
     * Set secure session cookie
     */
    private function setSessionCookie(string $token): void {
        $config = $this->security['session'];
        
        setcookie($config['cookie_name'], $token, [
            'expires' => time() + $this->security['jwt']['expiry']['access_token'],
            'path' => '/',
            'domain' => $config['cookie_domain'],
            'secure' => $config['cookie_secure'],
            'httponly' => $config['cookie_httponly'],
            'samesite' => $config['cookie_samesite']
        ]);
    }
    
    /**
     * Logout user
     */
    public function logout(): void {
        $token = $this->getAuthToken();
        
        if ($token) {
            try {
                $payload = JWT::decode($token, $this->security['jwt']['secret'], [$this->security['jwt']['algorithm']]);
                
                // Delete session from database
                $stmt = $this->pdo->prepare("DELETE FROM admin_sessions WHERE id = ?");
                $stmt->execute([$payload->session_id]);
                
                $this->logActivity($payload->user_id, 'logout');
                
            } catch (Exception $e) {
                // Invalid token, but still clear cookie
            }
        }
        
        // Clear cookie
        $config = $this->security['session'];
        setcookie($config['cookie_name'], '', [
            'expires' => time() - 3600,
            'path' => '/',
            'domain' => $config['cookie_domain'],
            'secure' => $config['cookie_secure'],
            'httponly' => $config['cookie_httponly'],
            'samesite' => $config['cookie_samesite']
        ]);
    }
    
    /**
     * Handle failed login attempt
     */
    private function handleFailedLogin(int $userId, string $username): void {
        $stmt = $this->pdo->prepare("
            UPDATE admin_users 
            SET failed_login_attempts = failed_login_attempts + 1
            WHERE id = ?
        ");
        $stmt->execute([$userId]);
        
        // Get updated attempts count
        $stmt = $this->pdo->prepare("SELECT failed_login_attempts FROM admin_users WHERE id = ?");
        $stmt->execute([$userId]);
        $attempts = $stmt->fetchColumn();
        
        $maxAttempts = $this->security['rate_limit']['login_attempts']['max_attempts'];
        
        // Lock account after max attempts
        if ($attempts >= $maxAttempts) {
            $lockoutMinutes = $this->security['rate_limit']['login_attempts']['lockout_minutes'];
            $lockedUntil = date('Y-m-d H:i:s', time() + ($lockoutMinutes * 60));
            
            $stmt = $this->pdo->prepare("UPDATE admin_users SET locked_until = ? WHERE id = ?");
            $stmt->execute([$lockedUntil, $userId]);
            
            $this->logActivity($userId, 'account_locked', 'user', $userId, [
                'failed_attempts' => $attempts,
                'locked_until' => $lockedUntil
            ]);
        }
        
        $this->logFailedLogin($username, 'invalid_password', $attempts);
    }
    
    /**
     * Reset failed login attempts
     */
    private function resetFailedAttempts(int $userId): void {
        $stmt = $this->pdo->prepare("
            UPDATE admin_users 
            SET failed_login_attempts = 0, locked_until = NULL 
            WHERE id = ?
        ");
        $stmt->execute([$userId]);
    }
    
    /**
     * Log failed login attempt
     */
    private function logFailedLogin(string $username, string $reason, int $attempts = 0): void {
        $this->logActivity(null, 'login_failed', 'auth', null, [
            'username' => $username,
            'reason' => $reason,
            'attempts' => $attempts,
            'ip_address' => $_SERVER['REMOTE_ADDR'] ?? null
        ]);
    }
}