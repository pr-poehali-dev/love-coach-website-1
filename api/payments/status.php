<?php
require_once '../includes/config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    sendError(405, 'Method not allowed');
}

if (!isset($_GET['payment_id'])) {
    sendError(400, 'Payment ID is required');
}

$paymentId = $_GET['payment_id'];

try {
    // Get payment settings to determine provider
    $stmt = $pdo->prepare("SELECT * FROM payment_settings WHERE id = 1");
    $stmt->execute();
    $settings = $stmt->fetch();
    
    if (!$settings) {
        sendError(500, 'Payment settings not configured');
    }
    
    $provider = $settings['active_provider'];
    
    // Check payment status based on provider
    switch ($provider) {
        case 'yookassa':
            $result = getYooKassaStatus($settings, $paymentId);
            break;
            
        case 'robokassa':
            $result = getRobokassaStatus($settings, $paymentId);
            break;
            
        case 'cloudpayments':
            $result = getCloudPaymentsStatus($settings, $paymentId);
            break;
            
        case 'alfabank':
            $result = getAlfabankStatus($settings, $paymentId);
            break;
            
        default:
            sendError(500, 'Unsupported payment provider');
    }
    
    sendSuccess($result);
    
} catch (Exception $e) {
    error_log("Payment status check error: " . $e->getMessage());
    sendError(500, 'Payment status check failed');
}

function getYooKassaStatus($settings, $paymentId) {
    $shopId = $settings['yookassa_shop_id'];
    $secretKey = $settings['yookassa_secret_key'];
    
    if (!$shopId || !$secretKey) {
        return [
            'payment_id' => $paymentId,
            'status' => 'unknown',
            'error' => 'YooKassa credentials not configured'
        ];
    }
    
    $url = "https://api.yookassa.ru/v3/payments/{$paymentId}";
    $auth = base64_encode($shopId . ':' . $secretKey);
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Authorization: Basic ' . $auth,
        'Content-Type: application/json'
    ]);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    if ($httpCode === 200) {
        $data = json_decode($response, true);
        return [
            'payment_id' => $paymentId,
            'status' => $data['status'],
            'paid' => $data['paid'],
            'amount' => $data['amount'],
            'created_at' => $data['created_at'],
            'provider' => 'yookassa'
        ];
    } else {
        return [
            'payment_id' => $paymentId,
            'status' => 'error',
            'error' => 'Failed to fetch payment status from YooKassa'
        ];
    }
}

function getRobokassaStatus($settings, $paymentId) {
    // Robokassa doesn't have a simple status API, usually status is updated via webhook
    return [
        'payment_id' => $paymentId,
        'status' => 'pending',
        'provider' => 'robokassa',
        'note' => 'Status is updated via webhook'
    ];
}

function getCloudPaymentsStatus($settings, $paymentId) {
    // CloudPayments status check would require their API
    return [
        'payment_id' => $paymentId,
        'status' => 'pending',
        'provider' => 'cloudpayments',
        'note' => 'Status is updated via webhook'
    ];
}

function getAlfabankStatus($settings, $paymentId) {
    // Alfabank status check would require their API
    return [
        'payment_id' => $paymentId,
        'status' => 'pending',
        'provider' => 'alfabank',
        'note' => 'Status is updated via webhook'
    ];
}
?>