<?php
require_once '../includes/config.php';
require_once '../includes/telegram.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendError(405, 'Method not allowed');
}

$input = json_decode(file_get_contents('php://input'), true);

if (!$input || !isset($input['amount']) || !isset($input['description'])) {
    sendError(400, 'Amount and description are required');
}

try {
    // Get active payment settings
    $stmt = $pdo->prepare("SELECT * FROM payment_settings WHERE id = 1");
    $stmt->execute();
    $settings = $stmt->fetch();
    
    if (!$settings) {
        sendError(500, 'Payment settings not configured');
    }
    
    $amount = floatval($input['amount']);
    $description = $input['description'];
    $provider = $settings['active_provider'];
    
    // Create embedded payment widget data
    switch ($provider) {
        case 'yookassa':
            $result = createYooKassaEmbedded($settings, $amount, $description);
            break;
            
        case 'cloudpayments':
            $result = createCloudPaymentsEmbedded($settings, $amount, $description);
            break;
            
        default:
            // For providers that don't support embedded, return regular payment
            $result = [
                'success' => false,
                'message' => 'Embedded payments not supported for ' . $provider,
                'fallback_to_redirect' => true
            ];
    }
    
    if ($result['success']) {
        sendSuccess($result);
    } else {
        sendError(400, $result['message']);
    }
    
} catch (Exception $e) {
    error_log("Embedded payment creation error: " . $e->getMessage());
    sendError(500, 'Embedded payment creation failed');
}

function createYooKassaEmbedded($settings, $amount, $description) {
    if (!$settings['yookassa_enabled']) {
        return ['success' => false, 'message' => 'YooKassa is not enabled'];
    }
    
    $shopId = $settings['yookassa_shop_id'];
    $secretKey = $settings['yookassa_secret_key'];
    
    if (!$shopId || !$secretKey) {
        return ['success' => false, 'message' => 'YooKassa credentials not configured'];
    }
    
    $url = 'https://api.yookassa.ru/v3/payments';
    $auth = base64_encode($shopId . ':' . $secretKey);
    
    $paymentData = [
        'amount' => [
            'value' => number_format($amount, 2, '.', ''),
            'currency' => 'RUB'
        ],
        'confirmation' => [
            'type' => 'embedded'
        ],
        'description' => $description,
        'capture' => $settings['yookassa_capture']
    ];
    
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
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($paymentData));
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    if ($httpCode === 200) {
        $responseData = json_decode($response, true);
        return [
            'success' => true,
            'payment_id' => $responseData['id'],
            'confirmation_token' => $responseData['confirmation']['confirmation_token'],
            'status' => $responseData['status'],
            'provider' => 'yookassa',
            'type' => 'embedded'
        ];
    } else {
        return [
            'success' => false,
            'message' => 'YooKassa API error: ' . $response
        ];
    }
}

function createCloudPaymentsEmbedded($settings, $amount, $description) {
    if (!$settings['cloudpayments_enabled']) {
        return ['success' => false, 'message' => 'CloudPayments is not enabled'];
    }
    
    return [
        'success' => true,
        'payment_id' => uniqid('cp_embed_'),
        'public_id' => $settings['cloudpayments_public_id'],
        'amount' => $amount,
        'description' => $description,
        'status' => 'pending',
        'provider' => 'cloudpayments',
        'type' => 'embedded'
    ];
}
?>