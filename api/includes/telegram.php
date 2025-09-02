<?php
require_once 'config.php';

class TelegramNotifier {
    private $pdo;
    
    public function __construct($pdo) {
        $this->pdo = $pdo;
    }
    
    public function sendNotification($message, $type = 'system') {
        try {
            // Get telegram settings
            $stmt = $this->pdo->prepare("SELECT * FROM telegram_settings WHERE id = 1");
            $stmt->execute();
            $settings = $stmt->fetch();
            
            if (!$settings || !$settings['enabled'] || !$settings['bot_token'] || !$settings['chat_id']) {
                return false;
            }
            
            // Check if this type of notification is enabled
            switch ($type) {
                case 'new_payment':
                    if (!$settings['notifications_new_payments']) return false;
                    break;
                case 'failed_payment':
                    if (!$settings['notifications_failed_payments']) return false;
                    break;
                case 'system_alert':
                    if (!$settings['notifications_system_alerts']) return false;
                    break;
            }
            
            return $this->sendMessage($settings['bot_token'], $settings['chat_id'], $message);
            
        } catch (Exception $e) {
            error_log("Telegram notification error: " . $e->getMessage());
            return false;
        }
    }
    
    private function sendMessage($botToken, $chatId, $message) {
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
        curl_setopt($ch, CURLOPT_TIMEOUT, 5);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Content-Type: application/x-www-form-urlencoded'
        ]);
        
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        
        if ($httpCode === 200) {
            $responseData = json_decode($response, true);
            return $responseData['ok'] ?? false;
        }
        
        return false;
    }
    
    public function notifyNewPayment($paymentId, $amount, $currency = 'RUB') {
        $message = "💰 <b>Новый платеж</b>\n\n";
        $message .= "ID: <code>{$paymentId}</code>\n";
        $message .= "Сумма: <b>{$amount} {$currency}</b>\n";
        $message .= "Время: " . date('Y-m-d H:i:s');
        
        return $this->sendNotification($message, 'new_payment');
    }
    
    public function notifyFailedPayment($paymentId, $error) {
        $message = "❌ <b>Ошибка платежа</b>\n\n";
        $message .= "ID: <code>{$paymentId}</code>\n";
        $message .= "Ошибка: {$error}\n";
        $message .= "Время: " . date('Y-m-d H:i:s');
        
        return $this->sendNotification($message, 'failed_payment');
    }
    
    public function notifySystemAlert($message) {
        $alertMessage = "🚨 <b>Системное оповещение</b>\n\n";
        $alertMessage .= $message . "\n";
        $alertMessage .= "Время: " . date('Y-m-d H:i:s');
        
        return $this->sendNotification($alertMessage, 'system_alert');
    }
}

$telegram = new TelegramNotifier($pdo);
?>