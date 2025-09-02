<?php
/**
 * Base API Class
 * Handles common API functionality, responses, validation, and security
 */

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../config/security.php';
require_once __DIR__ . '/JWT.php';

class BaseAPI {
    protected $pdo;
    protected $security;
    protected $requestData;
    protected $user;
    
    public function __construct() {
        global $pdo;
        $this->pdo = $pdo;
        $this->security = require __DIR__ . '/../config/security.php';
        
        // Set security headers
        $this->setSecurityHeaders();
        
        // Handle CORS
        $this->handleCORS();
        
        // Parse request data
        $this->parseRequest();
    }
    
    /**
     * Set security headers
     */
    protected function setSecurityHeaders() {
        foreach ($this->security['headers'] as $header => $value) {
            if ($value !== null) {
                header("{$header}: {$value}");
            }
        }
    }
    
    /**
     * Handle CORS requests
     */
    protected function handleCORS() {
        $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
        
        if (in_array($origin, $this->security['cors']['allowed_origins'])) {
            header("Access-Control-Allow-Origin: {$origin}");
        }
        
        header('Access-Control-Allow-Methods: ' . implode(', ', $this->security['cors']['allowed_methods']));
        header('Access-Control-Allow-Headers: ' . implode(', ', $this->security['cors']['allowed_headers']));
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: ' . $this->security['cors']['max_age']);
        
        // Handle preflight OPTIONS request
        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            http_response_code(204);
            exit;
        }
    }
    
    /**
     * Parse incoming request data
     */
    protected function parseRequest() {
        $contentType = $_SERVER['CONTENT_TYPE'] ?? '';
        
        if (strpos($contentType, 'application/json') !== false) {
            $input = file_get_contents('php://input');
            $this->requestData = json_decode($input, true);
            
            if (json_last_error() !== JSON_ERROR_NONE) {
                $this->sendError(400, 'Invalid JSON format');
            }
        } else {
            $this->requestData = $_POST;
        }
    }
    
    /**
     * Require authentication and return user data
     */
    protected function requireAuth(): array {
        $token = $this->getAuthToken();
        
        if (!$token) {
            $this->sendError(401, 'Authentication required');
        }
        
        try {
            $payload = JWT::decode($token, $this->security['jwt']['secret'], [$this->security['jwt']['algorithm']]);
            
            // Verify session in database
            $stmt = $this->pdo->prepare("
                SELECT s.*, u.username, u.email, u.is_active 
                FROM admin_sessions s 
                JOIN admin_users u ON s.user_id = u.id 
                WHERE s.id = ? AND s.expires_at > NOW() AND u.is_active = 1
            ");
            $stmt->execute([$payload->session_id]);
            $session = $stmt->fetch();
            
            if (!$session) {
                $this->sendError(401, 'Invalid or expired session');
            }
            
            // Update last activity
            $stmt = $this->pdo->prepare("UPDATE admin_sessions SET last_activity = NOW() WHERE id = ?");
            $stmt->execute([$payload->session_id]);
            
            // Log activity
            $this->logActivity($session['user_id'], 'api_access', null, null, [
                'endpoint' => $_SERVER['REQUEST_URI'],
                'method' => $_SERVER['REQUEST_METHOD']
            ]);
            
            $this->user = $session;
            return $session;
            
        } catch (Exception $e) {
            $this->sendError(401, 'Invalid authentication token');
        }
    }
    
    /**
     * Get authentication token from request
     */
    protected function getAuthToken(): ?string {
        // Check Authorization header
        $headers = getallheaders();
        if (isset($headers['Authorization'])) {
            if (preg_match('/Bearer\s+(.*)$/i', $headers['Authorization'], $matches)) {
                return $matches[1];
            }
        }
        
        // Check cookie
        if (isset($_COOKIE[$this->security['session']['cookie_name']])) {
            return $_COOKIE[$this->security['session']['cookie_name']];
        }
        
        return null;
    }
    
    /**
     * Validate request data
     */
    protected function validate(array $rules): array {
        $errors = [];
        $validatedData = [];
        
        foreach ($rules as $field => $rule) {
            $value = $this->requestData[$field] ?? null;
            $isRequired = isset($rule['required']) && $rule['required'];
            
            // Check required fields
            if ($isRequired && ($value === null || $value === '')) {
                $errors[$field] = 'This field is required';
                continue;
            }
            
            // Skip validation if field is empty and not required
            if (($value === null || $value === '') && !$isRequired) {
                $validatedData[$field] = $value;
                continue;
            }
            
            // Type validation
            if (isset($rule['type'])) {
                switch ($rule['type']) {
                    case 'string':
                        if (!is_string($value)) {
                            $errors[$field] = 'Must be a string';
                            continue 2;
                        }
                        break;
                        
                    case 'int':
                        if (!is_numeric($value)) {
                            $errors[$field] = 'Must be a number';
                            continue 2;
                        }
                        $value = (int)$value;
                        break;
                        
                    case 'bool':
                        $value = (bool)$value;
                        break;
                        
                    case 'email':
                        if (!filter_var($value, FILTER_VALIDATE_EMAIL)) {
                            $errors[$field] = 'Must be a valid email address';
                            continue 2;
                        }
                        break;
                }
            }
            
            // Length validation
            if (isset($rule['min_length']) && strlen($value) < $rule['min_length']) {
                $errors[$field] = "Must be at least {$rule['min_length']} characters";
                continue;
            }
            
            if (isset($rule['max_length']) && strlen($value) > $rule['max_length']) {
                $errors[$field] = "Must not exceed {$rule['max_length']} characters";
                continue;
            }
            
            // Pattern validation
            if (isset($rule['pattern']) && !preg_match($rule['pattern'], $value)) {
                $errors[$field] = $rule['pattern_message'] ?? 'Invalid format';
                continue;
            }
            
            // Enum validation
            if (isset($rule['enum']) && !in_array($value, $rule['enum'])) {
                $errors[$field] = 'Invalid value. Allowed: ' . implode(', ', $rule['enum']);
                continue;
            }
            
            $validatedData[$field] = $value;
        }
        
        if (!empty($errors)) {
            $this->sendError(422, 'Validation failed', ['validation_errors' => $errors]);
        }
        
        return $validatedData;
    }
    
    /**
     * Log user activity
     */
    protected function logActivity(int $userId, string $action, ?string $resource = null, ?string $resourceId = null, ?array $details = null) {
        try {
            $stmt = $this->pdo->prepare("
                INSERT INTO admin_activity_log (user_id, action, resource, resource_id, details, ip_address, user_agent) 
                VALUES (?, ?, ?, ?, ?, ?, ?)
            ");
            
            $stmt->execute([
                $userId,
                $action,
                $resource,
                $resourceId,
                $details ? json_encode($details) : null,
                $_SERVER['REMOTE_ADDR'] ?? null,
                $_SERVER['HTTP_USER_AGENT'] ?? null
            ]);
        } catch (Exception $e) {
            error_log("Failed to log activity: " . $e->getMessage());
        }
    }
    
    /**
     * Rate limiting check
     */
    protected function checkRateLimit(string $key, int $maxAttempts, int $windowMinutes): bool {
        $windowStart = date('Y-m-d H:i:s', time() - ($windowMinutes * 60));
        
        // For now, use a simple file-based rate limiting
        // In production, use Redis or database
        $rateLimitFile = sys_get_temp_dir() . '/rate_limit_' . md5($key);
        $attempts = [];
        
        if (file_exists($rateLimitFile)) {
            $data = file_get_contents($rateLimitFile);
            $attempts = json_decode($data, true) ?: [];
        }
        
        // Clean old attempts
        $attempts = array_filter($attempts, function($timestamp) use ($windowStart) {
            return $timestamp >= $windowStart;
        });
        
        if (count($attempts) >= $maxAttempts) {
            return false;
        }
        
        // Add current attempt
        $attempts[] = date('Y-m-d H:i:s');
        file_put_contents($rateLimitFile, json_encode($attempts));
        
        return true;
    }
    
    /**
     * Send success response
     */
    protected function sendSuccess($data = null, string $message = 'Success', int $statusCode = 200) {
        http_response_code($statusCode);
        header('Content-Type: application/json; charset=utf-8');
        
        $response = [
            'success' => true,
            'message' => $message
        ];
        
        if ($data !== null) {
            $response['data'] = $data;
        }
        
        echo json_encode($response, JSON_UNESCAPED_UNICODE);
        exit;
    }
    
    /**
     * Send error response
     */
    protected function sendError(int $statusCode, string $message, ?array $data = null) {
        http_response_code($statusCode);
        header('Content-Type: application/json; charset=utf-8');
        
        $response = [
            'success' => false,
            'message' => $message
        ];
        
        if ($data !== null) {
            $response['data'] = $data;
        }
        
        // Log error in development
        if (($_ENV['APP_ENV'] ?? 'production') === 'development') {
            error_log("API Error {$statusCode}: {$message}");
        }
        
        echo json_encode($response, JSON_UNESCAPED_UNICODE);
        exit;
    }
    
    /**
     * Handle different HTTP methods
     */
    protected function handleRequest() {
        $method = $_SERVER['REQUEST_METHOD'];
        
        switch ($method) {
            case 'GET':
                if (method_exists($this, 'get')) {
                    return $this->get();
                }
                break;
                
            case 'POST':
                if (method_exists($this, 'post')) {
                    return $this->post();
                }
                break;
                
            case 'PUT':
                if (method_exists($this, 'put')) {
                    return $this->put();
                }
                break;
                
            case 'DELETE':
                if (method_exists($this, 'delete')) {
                    return $this->delete();
                }
                break;
        }
        
        $this->sendError(405, 'Method not allowed');
    }
}