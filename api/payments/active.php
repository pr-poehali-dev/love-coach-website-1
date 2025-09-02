<?php
/**
 * Public Active Payment Provider API
 * Returns current active payment provider configuration for frontend
 */

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../config/security.php';

// Set CORS headers for public API
$security = require __DIR__ . '/../config/security.php';
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

if (in_array($origin, $security['cors']['allowed_origins'])) {
    header("Access-Control-Allow-Origin: {$origin}");
}

header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// Only allow GET requests
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

try {
    global $pdo;
    
    // Get payment settings
    $stmt = $pdo->prepare("SELECT * FROM payment_settings WHERE id = 1");
    $stmt->execute();
    $settings = $stmt->fetch();
    
    if (!$settings) {
        http_response_code(404);
        echo json_encode(['success' => false, 'message' => 'Payment settings not found']);
        exit;
    }
    
    $activeProvider = $settings['active_provider'];
    
    // Prepare response based on active provider
    $response = [
        'success' => true,
        'data' => [
            'provider' => $activeProvider
        ]
    ];
    
    // Add provider-specific configuration (only public fields)
    switch ($activeProvider) {
        case 'yookassa':
            if ($settings['yookassa_enabled']) {
                $response['data']['yookassa'] = new stdClass(); // Empty object for YooKassa
            }
            break;
            
        case 'alfabank':
            if ($settings['alfabank_enabled']) {
                $response['data']['alfabank'] = [
                    'token' => $settings['alfabank_token'] ?? '',
                    'gateway' => $settings['alfabank_gateway'] ?? 'test',
                    'stages' => (int)($settings['alfabank_stages'] ?? 1),
                    'language' => $settings['alfabank_language'] ?? 'ru',
                    'return_url' => $settings['alfabank_return_url'] ?? '',
                    'fail_url' => $settings['alfabank_fail_url'] ?? '',
                    'amount_format' => $settings['alfabank_amount_format'] ?? 'kopeyki'
                ];
            }
            break;
            
        case 'robokassa':
            if ($settings['robokassa_enabled']) {
                $response['data']['robokassa'] = new stdClass(); // Configuration handled server-side
            }
            break;
            
        case 'cloudpayments':
            if ($settings['cloudpayments_enabled']) {
                $response['data']['cloudpayments'] = [
                    'public_id' => $settings['cloudpayments_public_id'] ?? '',
                    'success_url' => $settings['cloudpayments_success_url'] ?? '',
                    'fail_url' => $settings['cloudpayments_fail_url'] ?? ''
                ];
            }
            break;
    }
    
    // Check if active provider is actually enabled
    $providerEnabled = false;
    switch ($activeProvider) {
        case 'yookassa':
            $providerEnabled = (bool)$settings['yookassa_enabled'];
            break;
        case 'alfabank':
            $providerEnabled = (bool)$settings['alfabank_enabled'];
            break;
        case 'robokassa':
            $providerEnabled = (bool)$settings['robokassa_enabled'];
            break;
        case 'cloudpayments':
            $providerEnabled = (bool)$settings['cloudpayments_enabled'];
            break;
    }
    
    if (!$providerEnabled) {
        http_response_code(503);
        echo json_encode([
            'success' => false, 
            'message' => 'Payment system temporarily unavailable'
        ]);
        exit;
    }
    
    echo json_encode($response);
    
} catch (Exception $e) {
    error_log("Active payment API error: " . $e->getMessage());
    
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Internal server error'
    ]);
}
?>