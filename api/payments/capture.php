<?php
require_once '../includes/config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendError(405, 'Method not allowed');
}

$input = json_decode(file_get_contents('php://input'), true);

if (!$input || !isset($input['payment_id'])) {
    sendError(400, 'Payment ID is required');
}

$paymentId = $input['payment_id'];
$amount = isset($input['amount']) ? floatval($input['amount']) : null;

try {
    // Get payment settings
    $stmt = $pdo->prepare("SELECT * FROM payment_settings WHERE id = 1");
    $stmt->execute();
    $settings = $stmt->fetch();
    
    if (!$settings) {
        sendError(500, 'Payment settings not configured');
    }
    
    $provider = $settings['active_provider'];
    
    // Capture payment based on provider
    switch ($provider) {
        case 'yookassa':
            $result = captureYooKassaPayment($settings, $paymentId, $amount);
            break;
            
        default:
            sendError(400, 'Payment capture not supported for ' . $provider);
    }
    
    if ($result['success']) {
        sendSuccess($result);
    } else {
        sendError(400, $result['message']);
    }
    
} catch (Exception $e) {
    error_log("Payment capture error: " . $e->getMessage());
    sendError(500, 'Payment capture failed');
}

function captureYooKassaPayment($settings, $paymentId, $amount = null) {
    $shopId = $settings['yookassa_shop_id'];
    $secretKey = $settings['yookassa_secret_key'];
    
    if (!$shopId || !$secretKey) {
        return ['success' => false, 'message' => 'YooKassa credentials not configured'];
    }
    
    $url = "https://api.yookassa.ru/v3/payments/{$paymentId}/capture";
    $auth = base64_encode($shopId . ':' . $secretKey);
    
    $captureData = [];
    if ($amount !== null) {
        $captureData['amount'] = [
            'value' => number_format($amount, 2, '.', ''),
            'currency' => 'RUB'
        ];
    }
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Authorization: Basic ' . $auth,
        'Content-Type: application/json',
        'Idempotence-Key: ' . uniqid()
    ]);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 30);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($captureData));
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    if ($httpCode === 200) {
        $responseData = json_decode($response, true);
        return [
            'success' => true,
            'payment_id' => $responseData['id'],
            'status' => $responseData['status'],
            'captured' => true,
            'provider' => 'yookassa'
        ];
    } else {
        return [
            'success' => false,
            'message' => 'YooKassa capture error: ' . $response
        ];
    }
}
?>