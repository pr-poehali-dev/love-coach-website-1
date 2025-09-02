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
    $returnUrl = $input['return_url'] ?? '';
    $provider = $settings['active_provider'];
    
    // Create payment based on active provider
    switch ($provider) {
        case 'yookassa':
            $result = createYooKassaPayment($settings, $amount, $description, $returnUrl);
            break;
            
        case 'robokassa':
            $result = createRobokassaPayment($settings, $amount, $description, $returnUrl);
            break;
            
        case 'cloudpayments':
            $result = createCloudPaymentsPayment($settings, $amount, $description, $returnUrl);
            break;
            
        case 'alfabank':
            $result = createAlfabankPayment($settings, $amount, $description, $returnUrl);
            break;
            
        default:
            sendError(500, 'Unsupported payment provider');
    }
    
    if ($result['success']) {
        // Log new payment
        $telegram->notifyNewPayment($result['payment_id'], $amount);
        sendSuccess($result);
    } else {
        sendError(400, $result['message']);
    }
    
} catch (Exception $e) {
    error_log("Payment creation error: " . $e->getMessage());
    sendError(500, 'Payment creation failed');
}

function createYooKassaPayment($settings, $amount, $description, $returnUrl) {
    if (!$settings['yookassa_enabled']) {
        return ['success' => false, 'message' => 'YooKassa is not enabled'];
    }
    
    $shopId = $settings['yookassa_shop_id'];
    $secretKey = $settings['yookassa_secret_key'];
    $baseReturnUrl = $settings['yookassa_base_return_url'] ?: $returnUrl;
    
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
            'type' => 'redirect',
            'return_url' => $baseReturnUrl
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
            'payment_url' => $responseData['confirmation']['confirmation_url'],
            'status' => $responseData['status'],
            'provider' => 'yookassa'
        ];
    } else {
        return [
            'success' => false,
            'message' => 'YooKassa API error: ' . $response
        ];
    }
}

function createRobokassaPayment($settings, $amount, $description, $returnUrl) {
    if (!$settings['robokassa_enabled']) {
        return ['success' => false, 'message' => 'Robokassa is not enabled'];
    }
    
    $merchantLogin = $settings['robokassa_merchant_login'];
    $password1 = $settings['robokassa_password1'];
    
    if (!$merchantLogin || !$password1) {
        return ['success' => false, 'message' => 'Robokassa credentials not configured'];
    }
    
    $invId = time();
    $crc = md5($merchantLogin . ':' . $amount . ':' . $invId . ':' . $password1);
    
    $baseUrl = $settings['robokassa_test_mode'] ? 'https://auth.robokassa.ru/Merchant/Index.aspx' : 'https://auth.robokassa.ru/Merchant/Index.aspx';
    
    $paymentUrl = $baseUrl . '?' . http_build_query([
        'MerchantLogin' => $merchantLogin,
        'OutSum' => $amount,
        'InvId' => $invId,
        'Description' => $description,
        'SignatureValue' => $crc,
        'Culture' => $settings['robokassa_culture'],
        'IsTest' => $settings['robokassa_test_mode']
    ]);
    
    return [
        'success' => true,
        'payment_id' => $invId,
        'payment_url' => $paymentUrl,
        'status' => 'pending',
        'provider' => 'robokassa'
    ];
}

function createCloudPaymentsPayment($settings, $amount, $description, $returnUrl) {
    if (!$settings['cloudpayments_enabled']) {
        return ['success' => false, 'message' => 'CloudPayments is not enabled'];
    }
    
    return [
        'success' => true,
        'payment_id' => uniqid('cp_'),
        'public_id' => $settings['cloudpayments_public_id'],
        'amount' => $amount,
        'description' => $description,
        'status' => 'pending',
        'provider' => 'cloudpayments'
    ];
}

function createAlfabankPayment($settings, $amount, $description, $returnUrl) {
    if (!$settings['alfabank_enabled']) {
        return ['success' => false, 'message' => 'Alfabank is not enabled'];
    }
    
    return [
        'success' => true,
        'payment_id' => uniqid('alfa_'),
        'status' => 'pending',
        'provider' => 'alfabank',
        'gateway' => $settings['alfabank_gateway'],
        'amount' => $amount,
        'description' => $description
    ];
}
?>