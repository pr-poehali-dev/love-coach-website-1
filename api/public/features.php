<?php
require_once '../includes/config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    sendError(405, 'Method not allowed');
}

try {
    // Get system features and capabilities
    $features = [
        'payment_processing' => true,
        'multi_provider_support' => true,
        'telegram_notifications' => true,
        'admin_panel' => true,
        'totp_authentication' => true,
        'api_access' => true,
        
        'supported_providers' => [
            'yookassa' => [
                'name' => 'YooKassa',
                'available' => true,
                'features' => ['redirect', 'embedded', 'webhooks']
            ],
            'robokassa' => [
                'name' => 'RoboKassa',
                'available' => true,
                'features' => ['redirect', 'webhooks']
            ],
            'cloudpayments' => [
                'name' => 'CloudPayments',
                'available' => true,
                'features' => ['redirect', 'embedded', 'webhooks']
            ],
            'alfabank' => [
                'name' => 'Альфа-Банк',
                'available' => true,
                'features' => ['redirect', 'webhooks']
            ]
        ],
        
        'api_endpoints' => [
            'public' => [
                '/api/public/payments/active' => 'Get active payment provider',
                '/api/public/features' => 'Get system features'
            ],
            'payments' => [
                '/api/payments/create' => 'Create payment',
                '/api/payments/create-embedded' => 'Create embedded payment',
                '/api/payments/status' => 'Get payment status',
                '/api/payments/capture' => 'Capture payment',
                '/api/payments/cancel' => 'Cancel payment'
            ],
            'admin' => [
                '/api/admin/auth/login' => 'Admin login',
                '/api/admin/auth/logout' => 'Admin logout',
                '/api/admin/auth/me' => 'Get current user',
                '/api/admin/settings/payments' => 'Payment settings',
                '/api/admin/settings/integrations/telegram' => 'Telegram settings',
                '/api/admin/test-payment' => 'Test payment provider',
                '/api/admin/integrations/telegram/test' => 'Test telegram integration'
            ]
        ],
        
        'system_info' => [
            'version' => '1.0.0',
            'build_date' => '2025-09-02',
            'php_version' => PHP_VERSION,
            'database' => 'MySQL',
            'timezone' => date_default_timezone_get()
        ]
    ];
    
    // Check actual provider availability
    $stmt = $pdo->prepare("SELECT * FROM payment_settings WHERE id = 1");
    $stmt->execute();
    $settings = $stmt->fetch();
    
    if ($settings) {
        $features['active_provider'] = $settings['active_provider'];
        $features['providers_configured'] = [];
        
        if ($settings['yookassa_enabled']) {
            $features['providers_configured'][] = 'yookassa';
        }
        if ($settings['robokassa_enabled']) {
            $features['providers_configured'][] = 'robokassa';
        }
        if ($settings['cloudpayments_enabled']) {
            $features['providers_configured'][] = 'cloudpayments';
        }
        if ($settings['alfabank_enabled']) {
            $features['providers_configured'][] = 'alfabank';
        }
    }
    
    // Check telegram integration
    $stmt = $pdo->prepare("SELECT enabled FROM telegram_settings WHERE id = 1");
    $stmt->execute();
    $telegram = $stmt->fetch();
    
    $features['telegram_enabled'] = $telegram ? (bool)$telegram['enabled'] : false;
    
    sendSuccess($features);
    
} catch (Exception $e) {
    error_log("Features fetch error: " . $e->getMessage());
    sendError(500, 'Failed to fetch system features');
}
?>