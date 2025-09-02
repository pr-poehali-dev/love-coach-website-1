<?php
/**
 * Telegram Settings API v2
 * Production Ready Telegram Integration Management
 */

require_once __DIR__ . '/../../classes/Auth.php';

class TelegramSettingsAPI extends Auth {
    
    public function get() {
        $user = $this->requireAuth();
        
        try {
            $stmt = $this->pdo->prepare("SELECT * FROM telegram_settings WHERE id = 1");
            $stmt->execute();
            $settings = $stmt->fetch();
            
            if (!$settings) {
                // Create default settings
                $stmt = $this->pdo->prepare("
                    INSERT INTO telegram_settings (id, enabled) VALUES (1, 0)
                ");
                $stmt->execute();
                
                $stmt = $this->pdo->prepare("SELECT * FROM telegram_settings WHERE id = 1");
                $stmt->execute();
                $settings = $stmt->fetch();
            }
            
            // Transform to expected frontend structure
            $data = [
                'enabled' => (bool)$settings['enabled'],
                'bot_token' => $settings['bot_token'] ? '***' : '', // Hide sensitive data
                'chat_id' => $settings['chat_id'] ?? '',
                'notify_on_payment' => (bool)$settings['notify_on_payment'],
                'notify_on_contact' => (bool)$settings['notify_on_contact']
            ];
            
            $this->logActivity($user['user_id'], 'settings_view', 'telegram_settings');
            
            $this->sendSuccess($data, 'Telegram settings retrieved successfully');
            
        } catch (Exception $e) {
            error_log("Telegram settings get error: " . $e->getMessage());
            $this->sendError(500, 'Failed to retrieve Telegram settings');
        }
    }
    
    public function put() {
        $user = $this->requireAuth();
        
        // Validate input
        $data = $this->validate([
            'enabled' => [
                'required' => false,
                'type' => 'bool'
            ],
            'bot_token' => [
                'required' => false,
                'type' => 'string',
                'max_length' => 255,
                'pattern' => '/^(\*{3}|[0-9]+:[A-Za-z0-9_-]{35}|)$/',
                'pattern_message' => 'Invalid bot token format'
            ],
            'chat_id' => [
                'required' => false,
                'type' => 'string',
                'max_length' => 255,
                'pattern' => '/^(-?[0-9]+|@[a-zA-Z0-9_]{5,}|)$/',
                'pattern_message' => 'Invalid chat ID format'
            ],
            'notify_on_payment' => [
                'required' => false,
                'type' => 'bool'
            ],
            'notify_on_contact' => [
                'required' => false,
                'type' => 'bool'
            ]
        ]);
        
        try {
            $this->pdo->beginTransaction();
            
            $updateFields = [];
            $updateValues = [];
            
            $allowedFields = [
                'enabled' => 'enabled',
                'bot_token' => 'bot_token',
                'chat_id' => 'chat_id',
                'notify_on_payment' => 'notify_on_payment',
                'notify_on_contact' => 'notify_on_contact'
            ];
            
            foreach ($data as $field => $value) {
                if (isset($allowedFields[$field])) {
                    $dbField = $allowedFields[$field];
                    
                    // Don't update if bot token is masked
                    if ($field === 'bot_token' && $value === '***') {
                        continue;
                    }
                    
                    // Convert boolean fields
                    if (in_array($field, ['enabled', 'notify_on_payment', 'notify_on_contact'])) {
                        $value = (bool)$value ? 1 : 0;
                    }
                    
                    $updateFields[] = "{$dbField} = ?";
                    $updateValues[] = $value;
                }
            }
            
            if (empty($updateFields)) {
                $this->sendError(400, 'No valid fields to update');
            }
            
            // Update settings
            $sql = "UPDATE telegram_settings SET " . implode(', ', $updateFields) . " WHERE id = 1";
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute($updateValues);
            
            $this->pdo->commit();
            
            $this->logActivity($user['user_id'], 'settings_update', 'telegram_settings', '1', $data);
            
            // Return updated settings
            $this->get();
            
        } catch (Exception $e) {
            $this->pdo->rollBack();
            error_log("Telegram settings update error: " . $e->getMessage());
            $this->sendError(500, 'Failed to update Telegram settings');
        }
    }
    
    /**
     * Test Telegram connection
     */
    public function post() {
        $user = $this->requireAuth();
        
        // Validate input
        $data = $this->validate([
            'action' => [
                'required' => true,
                'enum' => ['test_connection']
            ]
        ]);
        
        if ($data['action'] === 'test_connection') {
            try {
                // Get current settings
                $stmt = $this->pdo->prepare("SELECT bot_token, chat_id FROM telegram_settings WHERE id = 1");
                $stmt->execute();
                $settings = $stmt->fetch();
                
                if (!$settings || !$settings['bot_token'] || !$settings['chat_id']) {
                    $this->sendError(400, 'Bot token and chat ID are required for testing');
                }
                
                // Test Telegram API
                $testResult = $this->testTelegramConnection($settings['bot_token'], $settings['chat_id']);
                
                $this->logActivity($user['user_id'], 'telegram_test', 'telegram_settings', null, $testResult);
                
                if ($testResult['success']) {
                    $this->sendSuccess($testResult, 'Telegram connection test successful');
                } else {
                    $this->sendError(400, 'Telegram connection test failed', $testResult);
                }
                
            } catch (Exception $e) {
                error_log("Telegram test error: " . $e->getMessage());
                $this->sendError(500, 'Failed to test Telegram connection');
            }
        }
    }
    
    private function testTelegramConnection(string $botToken, string $chatId): array {
        try {
            $url = "https://api.telegram.org/bot{$botToken}/sendMessage";
            
            $data = [
                'chat_id' => $chatId,
                'text' => '✅ WorkTab Admin Panel - Connection Test Successful!',
                'parse_mode' => 'Markdown'
            ];
            
            $options = [
                'http' => [
                    'header' => "Content-Type: application/x-www-form-urlencoded\r\n",
                    'method' => 'POST',
                    'content' => http_build_query($data),
                    'timeout' => 10
                ]
            ];
            
            $context = stream_context_create($options);
            $result = file_get_contents($url, false, $context);
            
            if ($result === false) {
                return [
                    'success' => false,
                    'error' => 'Failed to connect to Telegram API'
                ];
            }
            
            $response = json_decode($result, true);
            
            if (!$response || !$response['ok']) {
                return [
                    'success' => false,
                    'error' => $response['description'] ?? 'Unknown Telegram API error'
                ];
            }
            
            return [
                'success' => true,
                'message' => 'Test message sent successfully'
            ];
            
        } catch (Exception $e) {
            return [
                'success' => false,
                'error' => 'Connection test failed: ' . $e->getMessage()
            ];
        }
    }
}

// Initialize and handle request
try {
    $api = new TelegramSettingsAPI();
    $api->handleRequest();
} catch (Exception $e) {
    http_response_code(500);
    header('Content-Type: application/json');
    echo json_encode([
        'success' => false,
        'message' => 'Internal server error'
    ]);
}