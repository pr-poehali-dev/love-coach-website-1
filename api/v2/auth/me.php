<?php
/**
 * Current User API v2
 * Returns current authenticated user information
 */

require_once __DIR__ . '/../../classes/Auth.php';

class MeAPI extends Auth {
    
    public function get() {
        try {
            $user = $this->requireAuth();
            
            $this->sendSuccess([
                'user' => [
                    'id' => (int)$user['user_id'],
                    'username' => $user['username'],
                    'email' => $user['email'],
                    'last_login_at' => $user['last_login_at'],
                    'session_expires_at' => $user['expires_at']
                ]
            ], 'User information retrieved successfully', 200);
            
        } catch (Exception $e) {
            error_log("Me endpoint error: " . $e->getMessage());
            $this->sendError(500, 'Failed to retrieve user information');
        }
    }
}

// Initialize and handle request
try {
    $api = new MeAPI();
    $api->handleRequest();
} catch (Exception $e) {
    http_response_code(500);
    header('Content-Type: application/json');
    echo json_encode([
        'success' => false,
        'message' => 'Internal server error'
    ]);
}