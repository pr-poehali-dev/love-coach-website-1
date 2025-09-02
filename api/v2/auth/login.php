<?php
/**
 * Admin Login API v2
 * Production Ready Authentication Endpoint
 */

require_once __DIR__ . '/../../classes/Auth.php';

class LoginAPI extends Auth {
    
    public function post() {
        // Validate input
        $data = $this->validate([
            'username' => [
                'required' => true,
                'type' => 'string',
                'min_length' => 3,
                'max_length' => 50,
                'pattern' => '/^[a-zA-Z0-9_-]+$/',
                'pattern_message' => 'Username can only contain letters, numbers, underscore and dash'
            ],
            'password' => [
                'required' => true,
                'type' => 'string',
                'min_length' => 6,
                'max_length' => 255
            ]
        ]);
        
        try {
            $result = $this->login($data['username'], $data['password']);
            
            if (isset($result['mfa_required']) && $result['mfa_required']) {
                $this->sendSuccess([
                    'mfa_required' => true,
                    'mfa_token' => $result['mfa_token'],
                    'message' => 'Please enter your 2FA code to complete login'
                ], 'MFA verification required', 200);
            } else {
                $this->sendSuccess([
                    'token' => $result['token'],
                    'user' => $result['user']
                ], 'Login successful', 200);
            }
            
        } catch (Exception $e) {
            error_log("Login error: " . $e->getMessage());
            $this->sendError(500, 'An error occurred during login');
        }
    }
}

// Initialize and handle request
try {
    $api = new LoginAPI();
    $api->handleRequest();
} catch (Exception $e) {
    http_response_code(500);
    header('Content-Type: application/json');
    echo json_encode([
        'success' => false,
        'message' => 'Internal server error'
    ]);
}