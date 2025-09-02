<?php
require_once 'config.php';

class Auth {
    private $pdo;
    
    public function __construct($pdo) {
        $this->pdo = $pdo;
    }
    
    public function login($username, $password) {
        try {
            $stmt = $this->pdo->prepare("SELECT id, username, password_hash, totp_secret, is_active FROM admin_users WHERE username = ? AND is_active = 1");
            $stmt->execute([$username]);
            $user = $stmt->fetch();
            
            if ($user && password_verify($password, $user['password_hash'])) {
                return [
                    'success' => true,
                    'user' => $user,
                    'needs_totp' => !empty($user['totp_secret'])
                ];
            }
            
            return ['success' => false, 'message' => 'Invalid credentials'];
        } catch (Exception $e) {
            error_log("Login error: " . $e->getMessage());
            return ['success' => false, 'message' => 'Authentication failed'];
        }
    }
    
    public function createSession($userId) {
        try {
            $sessionId = bin2hex(random_bytes(32));
            $expiresAt = date('Y-m-d H:i:s', time() + 7200); // 2 hours
            
            $stmt = $this->pdo->prepare("INSERT INTO admin_sessions (id, user_id, expires_at) VALUES (?, ?, ?)");
            $stmt->execute([$sessionId, $userId, $expiresAt]);
            
            return $sessionId;
        } catch (Exception $e) {
            error_log("Session creation error: " . $e->getMessage());
            return false;
        }
    }
    
    public function verifySession($sessionId) {
        try {
            $stmt = $this->pdo->prepare("
                SELECT s.*, u.username, u.is_active 
                FROM admin_sessions s 
                JOIN admin_users u ON s.user_id = u.id 
                WHERE s.id = ? AND s.expires_at > NOW() AND u.is_active = 1
            ");
            $stmt->execute([$sessionId]);
            return $stmt->fetch();
        } catch (Exception $e) {
            error_log("Session verification error: " . $e->getMessage());
            return false;
        }
    }
    
    public function deleteSession($sessionId) {
        try {
            $stmt = $this->pdo->prepare("DELETE FROM admin_sessions WHERE id = ?");
            return $stmt->execute([$sessionId]);
        } catch (Exception $e) {
            error_log("Session deletion error: " . $e->getMessage());
            return false;
        }
    }
    
    public function getSessionFromRequest() {
        $sessionId = null;
        $headers = getallheaders();
        
        if (isset($headers['Authorization'])) {
            if (preg_match('/Bearer\s+(.*)$/i', $headers['Authorization'], $matches)) {
                $sessionId = $matches[1];
            }
        } elseif (isset($_COOKIE['session_id'])) {
            $sessionId = $_COOKIE['session_id'];
        }
        
        return $sessionId ? $this->verifySession($sessionId) : null;
    }
    
    public function requireAuth() {
        $session = $this->getSessionFromRequest();
        if (!$session) {
            sendError(401, 'Authentication required');
        }
        return $session;
    }
    
    public function verifyTotp($secret, $code) {
        if (!$secret || !$code) return false;
        
        $timeSlice = floor(time() / 30);
        $secretKey = $this->base32_decode($secret);
        
        // Check current and previous time slice for clock drift
        for ($i = -1; $i <= 1; $i++) {
            $calculatedCode = $this->oath_hotp($secretKey, $timeSlice + $i);
            if ($calculatedCode === $code) {
                return true;
            }
        }
        return false;
    }
    
    private function oath_hotp($key, $counter) {
        $bin_counter = pack('N*', 0) . pack('N*', $counter);
        $hash = hash_hmac('sha1', $bin_counter, $key, true);
        $offset = ord($hash[19]) & 0xf;
        $otp = (
            ((ord($hash[$offset+0]) & 0x7f) << 24) |
            ((ord($hash[$offset+1]) & 0xff) << 16) |
            ((ord($hash[$offset+2]) & 0xff) << 8) |
            (ord($hash[$offset+3]) & 0xff)
        ) % pow(10, 6);
        return str_pad($otp, 6, '0', STR_PAD_LEFT);
    }
    
    private function base32_decode($data) {
        $alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
        $output = '';
        $v = 0;
        $vbits = 0;
        $j = 0;
        for ($i = 0, $len = strlen($data); $i < $len; ++$i) {
            $v <<= 5;
            if (($j = strpos($alphabet, $data[$i])) !== false) {
                $v += $j;
                $vbits += 5;
                if ($vbits >= 8) {
                    $output .= chr(($v >> ($vbits - 8)) & 255);
                    $vbits -= 8;
                }
            }
        }
        return $output;
    }
}

$auth = new Auth($pdo);
?>