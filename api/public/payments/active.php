<?php
require_once '../../includes/config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    sendError(405, 'Method not allowed');
}

try {
    // Get active payment provider and basic info
    $stmt = $pdo->prepare("SELECT active_provider FROM payment_settings WHERE id = 1");
    $stmt->execute();
    $settings = $stmt->fetch();
    
    if (!$settings) {
        sendError(404, 'Payment settings not found');
    }
    
    $activeProvider = $settings['active_provider'];
    $providerInfo = getProviderInfo($activeProvider);
    
    sendSuccess([
        'active_provider' => $activeProvider,
        'provider_info' => $providerInfo,
        'payment_enabled' => true
    ]);
    
} catch (Exception $e) {
    error_log("Active payment provider fetch error: " . $e->getMessage());
    sendError(500, 'Failed to fetch active payment provider');
}

function getProviderInfo($provider) {
    $providers = [
        'yookassa' => [
            'name' => 'YooKassa',
            'description' => 'Универсальный сервис приема платежей',
            'supports_redirect' => true,
            'supports_embedded' => true,
            'currencies' => ['RUB'],
            'payment_methods' => ['card', 'yandex_money', 'qiwi', 'webmoney', 'sberbank']
        ],
        'robokassa' => [
            'name' => 'RoboKassa',
            'description' => 'Прием платежей в интернете',
            'supports_redirect' => true,
            'supports_embedded' => false,
            'currencies' => ['RUB', 'USD', 'EUR'],
            'payment_methods' => ['card', 'yandex_money', 'qiwi', 'webmoney']
        ],
        'cloudpayments' => [
            'name' => 'CloudPayments',
            'description' => 'Прием платежей по банковским картам',
            'supports_redirect' => true,
            'supports_embedded' => true,
            'currencies' => ['RUB', 'USD', 'EUR'],
            'payment_methods' => ['card', 'apple_pay', 'google_pay']
        ],
        'alfabank' => [
            'name' => 'Альфа-Банк',
            'description' => 'Эквайринг от Альфа-Банка',
            'supports_redirect' => true,
            'supports_embedded' => false,
            'currencies' => ['RUB'],
            'payment_methods' => ['card']
        ]
    ];
    
    return $providers[$provider] ?? [
        'name' => 'Unknown Provider',
        'description' => 'Неизвестный платежный провайдер',
        'supports_redirect' => false,
        'supports_embedded' => false,
        'currencies' => [],
        'payment_methods' => []
    ];
}
?>