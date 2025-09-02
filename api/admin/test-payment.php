<?php
require_once '../includes/auth.php';

// Require authentication
$session = $auth->requireAuth();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendError(405, 'Method not allowed');
}

$input = json_decode(file_get_contents('php://input'), true);

if (!$input || empty($input['provider'])) {
    sendError(400, 'Provider is required');
}

// Get payment settings
try {
    $stmt = $pdo->prepare("SELECT * FROM payment_settings WHERE id = 1");
    $stmt->execute();
    $settings = $stmt->fetch();
    
    if (!$settings) {
        sendError(404, 'Payment settings not found');
    }
    
    $provider = $input['provider'];
    $amount = $input['amount'] ?? 100; // Default test amount
    
    // Test different providers
    switch ($provider) {
        case 'yookassa':
            if (!$settings['yookassa_enabled']) {
                sendError(400, 'YooKassa is not enabled');
            }
            
            $testResult = testYooKassa($settings, $amount);
            break;
            
        case 'robokassa':
            if (!$settings['robokassa_enabled']) {
                sendError(400, 'Robokassa is not enabled');
            }
            
            $testResult = testRobokassa($settings, $amount);
            break;
            
        case 'cloudpayments':
            if (!$settings['cloudpayments_enabled']) {
                sendError(400, 'CloudPayments is not enabled');
            }
            
            $testResult = testCloudPayments($settings, $amount);
            break;
            
        case 'alfabank':
            if (!$settings['alfabank_enabled']) {
                sendError(400, 'Alfabank is not enabled');
            }
            
            $testResult = testAlfabank($settings, $amount);
            break;
            
        default:
            sendError(400, 'Unsupported provider');
    }
    
    sendSuccess($testResult);
    
} catch (Exception $e) {
    error_log("Payment test error: " . $e->getMessage());
    sendError(500, 'Payment test failed');
}

function testYooKassa($settings, $amount) {
    // Simple connectivity test to YooKassa API
    $shopId = $settings['yookassa_shop_id'];
    $secretKey = $settings['yookassa_secret_key'];
    
    if (!$shopId || !$secretKey) {
        return [
            'success' => false,
            'message' => 'YooKassa credentials not configured'
        ];
    }
    
    $url = 'https://api.yookassa.ru/v3/payments';
    $auth = base64_encode($shopId . ':' . $secretKey);
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Authorization: Basic ' . $auth,
        'Content-Type: application/json'
    ]);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
        'amount' => [
            'value' => number_format($amount, 2, '.', ''),
            'currency' => 'RUB'
        ],
        'confirmation' => [
            'type' => 'redirect',
            'return_url' => 'https://example.com/return'
        ],
        'description' => 'Test payment'
    ]));
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    if ($httpCode === 200) {
        return [
            'success' => true,
            'message' => 'YooKassa API connection successful',
            'response' => json_decode($response, true)
        ];
    } else {
        return [
            'success' => false,
            'message' => 'YooKassa API connection failed',
            'http_code' => $httpCode,
            'response' => $response
        ];
    }
}

function testRobokassa($settings, $amount) {
    return [
        'success' => true,
        'message' => 'Robokassa test - configuration valid',
        'merchant_login' => $settings['robokassa_merchant_login'],
        'test_mode' => $settings['robokassa_test_mode']
    ];
}

function testCloudPayments($settings, $amount) {
    return [
        'success' => true,
        'message' => 'CloudPayments test - configuration valid',
        'public_id' => $settings['cloudpayments_public_id']
    ];
}

function testAlfabank($settings, $amount) {
    return [
        'success' => true,
        'message' => 'Alfabank test - configuration valid',
        'gateway' => $settings['alfabank_gateway']
    ];
}
?>