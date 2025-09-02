<?php
require_once '../../../includes/auth.php';

// Require authentication
$session = $auth->requireAuth();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendError(405, 'Method not allowed');
}

try {
    // Get telegram settings
    $stmt = $pdo->prepare("SELECT bot_token, chat_id, enabled FROM telegram_settings WHERE id = 1");
    $stmt->execute();
    $settings = $stmt->fetch();
    
    if (!$settings || !$settings['enabled']) {
        sendError(400, 'Telegram integration is not enabled');
    }
    
    if (!$settings['bot_token'] || !$settings['chat_id']) {
        sendError(400, 'Telegram bot token or chat ID not configured');
    }
    
    // Send test message
    $message = "🔧 Test message from WorksTab Admin Panel\n\nTime: " . date('Y-m-d H:i:s');
    
    $result = sendTelegramMessage($settings['bot_token'], $settings['chat_id'], $message);
    
    if ($result['success']) {
        sendSuccess([
            'message_sent' => true,
            'telegram_response' => $result['response']
        ], 'Test message sent successfully');
    } else {
        sendError(400, 'Failed to send test message: ' . $result['error']);
    }
    
} catch (Exception $e) {
    error_log("Telegram test error: " . $e->getMessage());
    sendError(500, 'Telegram test failed');
}

function sendTelegramMessage($botToken, $chatId, $message) {
    $url = "https://api.telegram.org/bot{$botToken}/sendMessage";
    
    $data = [
        'chat_id' => $chatId,
        'text' => $message,
        'parse_mode' => 'HTML'
    ];
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/x-www-form-urlencoded'
    ]);
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = curl_error($ch);
    curl_close($ch);
    
    if ($error) {
        return [
            'success' => false,
            'error' => 'CURL error: ' . $error
        ];
    }
    
    $responseData = json_decode($response, true);
    
    if ($httpCode === 200 && $responseData['ok']) {
        return [
            'success' => true,
            'response' => $responseData
        ];
    } else {
        return [
            'success' => false,
            'error' => 'HTTP ' . $httpCode . ': ' . ($responseData['description'] ?? 'Unknown error'),
            'response' => $responseData
        ];
    }
}
?>