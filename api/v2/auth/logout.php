<?php
/**
 * Logout API v2
 * Production Ready Logout Endpoint
 */

require_once __DIR__ . '/../../classes/Auth.php';

class LogoutAPI extends Auth {
    
    public function post() {
        try {
            $this->logout();
            
            $this->sendSuccess(null, 'Logged out successfully', 200);
            
        } catch (Exception $e) {
            error_log("Logout error: " . $e->getMessage());
            
            // Even if logout fails, we still clear the cookie and return success
            // This ensures the client doesn't get stuck in an authenticated state
            $this->sendSuccess(null, 'Logged out successfully', 200);
        }
    }
}

// Initialize and handle request
try {
    $api = new LogoutAPI();
    $api->handleRequest();
} catch (Exception $e) {
    http_response_code(500);
    header('Content-Type: application/json');
    echo json_encode([
        'success' => false,
        'message' => 'Internal server error'
    ]);
}