<?php
require_once '../../includes/auth.php';

// Require authentication
$session = $auth->requireAuth();

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    // Get payment settings
    try {
        $stmt = $pdo->prepare("SELECT * FROM payment_settings WHERE id = 1");
        $stmt->execute();
        $settings = $stmt->fetch();
        
        if (!$settings) {
            // Create default settings if not exists
            $stmt = $pdo->prepare("
                INSERT INTO payment_settings (id, active_provider) 
                VALUES (1, 'yookassa')
            ");
            $stmt->execute();
            
            // Fetch the newly created record
            $stmt = $pdo->prepare("SELECT * FROM payment_settings WHERE id = 1");
            $stmt->execute();
            $settings = $stmt->fetch();
        }
        
        // Transform flat structure to nested structure expected by frontend
        $transformed = [
            'active_provider' => $settings['active_provider'] ?? 'yookassa',
            'providers' => [
                'yookassa' => [
                    'enabled' => (bool)($settings['yookassa_enabled'] ?? false),
                    'shop_id' => $settings['yookassa_shop_id'] ?? '',
                    'secret_key' => $settings['yookassa_secret_key'] ?? '',
                    'base_return_url' => $settings['yookassa_base_return_url'] ?? '',
                    'capture' => (bool)($settings['yookassa_capture'] ?? true)
                ],
                'robokassa' => [
                    'enabled' => (bool)($settings['robokassa_enabled'] ?? false),
                    'merchant_login' => $settings['robokassa_merchant_login'] ?? '',
                    'password1' => $settings['robokassa_password1'] ?? '',
                    'password2' => $settings['robokassa_password2'] ?? '',
                    'test_mode' => (bool)($settings['robokassa_test_mode'] ?? true),
                    'culture' => $settings['robokassa_culture'] ?? 'ru',
                    'success_url' => $settings['robokassa_success_url'] ?? '',
                    'fail_url' => $settings['robokassa_fail_url'] ?? ''
                ],
                'cloudpayments' => [
                    'enabled' => (bool)($settings['cloudpayments_enabled'] ?? false),
                    'public_id' => $settings['cloudpayments_public_id'] ?? '',
                    'api_secret' => $settings['cloudpayments_api_secret'] ?? '',
                    'success_url' => $settings['cloudpayments_success_url'] ?? '',
                    'fail_url' => $settings['cloudpayments_fail_url'] ?? ''
                ],
                'alfabank' => [
                    'enabled' => (bool)($settings['alfabank_enabled'] ?? false),
                    'token' => $settings['alfabank_token'] ?? '',
                    'gateway' => $settings['alfabank_gateway'] ?? 'test',
                    'stages' => (int)($settings['alfabank_stages'] ?? 1),
                    'language' => $settings['alfabank_language'] ?? 'ru',
                    'return_url' => $settings['alfabank_return_url'] ?? '',
                    'fail_url' => $settings['alfabank_fail_url'] ?? '',
                    'amount_format' => $settings['alfabank_amount_format'] ?? 'kopeyki'
                ]
            ]
        ];
        
        sendSuccess($transformed);
        
    } catch (Exception $e) {
        error_log("Payment settings fetch error: " . $e->getMessage());
        sendError(500, 'Failed to fetch payment settings');
    }
}

if ($method === 'POST' || $method === 'PUT') {
    // Update payment settings
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!$input) {
        sendError(400, 'Invalid JSON input');
    }
    
    try {
        // Build update query dynamically based on input
        $allowedFields = [
            'active_provider', 'yookassa_enabled', 'yookassa_shop_id', 'yookassa_secret_key',
            'yookassa_base_return_url', 'yookassa_capture', 'robokassa_enabled',
            'robokassa_merchant_login', 'robokassa_password1', 'robokassa_password2',
            'robokassa_success_url', 'robokassa_fail_url', 'robokassa_culture',
            'robokassa_test_mode', 'cloudpayments_enabled', 'cloudpayments_public_id',
            'cloudpayments_api_secret', 'cloudpayments_success_url', 'cloudpayments_fail_url',
            'alfabank_enabled', 'alfabank_token', 'alfabank_gateway', 'alfabank_stages',
            'alfabank_language', 'alfabank_return_url', 'alfabank_fail_url', 'alfabank_amount_format'
        ];
        
        $updateFields = [];
        $updateValues = [];
        
        foreach ($input as $field => $value) {
            if (in_array($field, $allowedFields)) {
                $updateFields[] = "$field = ?";
                $updateValues[] = $value;
            }
        }
        
        if (empty($updateFields)) {
            sendError(400, 'No valid fields to update');
        }
        
        $sql = "UPDATE payment_settings SET " . implode(', ', $updateFields) . " WHERE id = 1";
        $stmt = $pdo->prepare($sql);
        $stmt->execute($updateValues);
        
        // Fetch updated settings and transform
        $stmt = $pdo->prepare("SELECT * FROM payment_settings WHERE id = 1");
        $stmt->execute();
        $settings = $stmt->fetch();
        
        $transformed = [
            'active_provider' => $settings['active_provider'] ?? 'yookassa',
            'providers' => [
                'yookassa' => [
                    'enabled' => (bool)($settings['yookassa_enabled'] ?? false),
                    'shop_id' => $settings['yookassa_shop_id'] ?? '',
                    'secret_key' => $settings['yookassa_secret_key'] ?? '',
                    'base_return_url' => $settings['yookassa_base_return_url'] ?? '',
                    'capture' => (bool)($settings['yookassa_capture'] ?? true)
                ],
                'robokassa' => [
                    'enabled' => (bool)($settings['robokassa_enabled'] ?? false),
                    'merchant_login' => $settings['robokassa_merchant_login'] ?? '',
                    'password1' => $settings['robokassa_password1'] ?? '',
                    'password2' => $settings['robokassa_password2'] ?? '',
                    'test_mode' => (bool)($settings['robokassa_test_mode'] ?? true),
                    'culture' => $settings['robokassa_culture'] ?? 'ru',
                    'success_url' => $settings['robokassa_success_url'] ?? '',
                    'fail_url' => $settings['robokassa_fail_url'] ?? ''
                ],
                'cloudpayments' => [
                    'enabled' => (bool)($settings['cloudpayments_enabled'] ?? false),
                    'public_id' => $settings['cloudpayments_public_id'] ?? '',
                    'api_secret' => $settings['cloudpayments_api_secret'] ?? '',
                    'success_url' => $settings['cloudpayments_success_url'] ?? '',
                    'fail_url' => $settings['cloudpayments_fail_url'] ?? ''
                ],
                'alfabank' => [
                    'enabled' => (bool)($settings['alfabank_enabled'] ?? false),
                    'token' => $settings['alfabank_token'] ?? '',
                    'gateway' => $settings['alfabank_gateway'] ?? 'test',
                    'stages' => (int)($settings['alfabank_stages'] ?? 1),
                    'language' => $settings['alfabank_language'] ?? 'ru',
                    'return_url' => $settings['alfabank_return_url'] ?? '',
                    'fail_url' => $settings['alfabank_fail_url'] ?? '',
                    'amount_format' => $settings['alfabank_amount_format'] ?? 'kopeyki'
                ]
            ]
        ];
        
        sendSuccess($transformed, 'Payment settings updated successfully');
        
    } catch (Exception $e) {
        error_log("Payment settings update error: " . $e->getMessage());
        sendError(500, 'Failed to update payment settings');
    }
}

sendError(405, 'Method not allowed');
?>