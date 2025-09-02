<?php
/**
 * TOTP Verification API v2
 * Production Ready 2FA Verification Endpoint
 */

require_once __DIR__ . '/../../classes/Auth.php';

class VerifyTOTPAPI extends Auth {
    
    public function post() {
        // Validate input
        $data = $this->validate([
            'mfa_token' => [
                'required' => true,
                'type' => 'string',
                'pattern' => '/^[a-f0-9]{64}$/',
                'pattern_message' => 'Invalid MFA token format'
            ],
            'totp_code' => [
                'required' => true,
                'type' => 'string',
                'pattern' => '/^\d{6}$/',
                'pattern_message' => 'TOTP code must be 6 digits'
            ]
        ]);
        
        try {
            $result = $this->verifyTOTP($data['mfa_token'], $data['totp_code']);
            
            $this->sendSuccess([
                'token' => $result['token'],
                'user' => $result['user']
            ], 'Login completed successfully', 200);
            
        } catch (Exception $e) {
            error_log("TOTP verification error: " . $e->getMessage());
            $this->sendError(500, 'An error occurred during verification');
        }
    }
}

// Initialize and handle request
try {
    $api = new VerifyTOTPAPI();
    $api->handleRequest();
} catch (Exception $e) {
    http_response_code(500);
    header('Content-Type: application/json');
    echo json_encode([
        'success' => false,
        'message' => 'Internal server error'
    ]);
}