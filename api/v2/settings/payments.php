<?php
/**
 * Payment Settings API v2
 * Production Ready Payment Configuration Management
 */

require_once __DIR__ . '/../../classes/Auth.php';

class PaymentSettingsAPI extends Auth {
    
    public function get() {
        $user = $this->requireAuth();
        
        try {
            $stmt = $this->pdo->prepare("SELECT * FROM payment_settings WHERE id = 1");
            $stmt->execute();
            $settings = $stmt->fetch();
            
            if (!$settings) {
                // Create default settings
                $stmt = $this->pdo->prepare("
                    INSERT INTO payment_settings (id, active_provider) VALUES (1, 'yookassa')
                ");
                $stmt->execute();
                
                $stmt = $this->pdo->prepare("SELECT * FROM payment_settings WHERE id = 1");
                $stmt->execute();
                $settings = $stmt->fetch();
            }
            
            // Transform to expected frontend structure
            $data = [
                'active_provider' => $settings['active_provider'],
                'providers' => [
                    'yookassa' => [
                        'enabled' => (bool)$settings['yookassa_enabled'],
                        'shop_id' => $settings['yookassa_shop_id'] ?? '',
                        'secret_key' => $settings['yookassa_secret_key'] ? '***' : '', // Hide sensitive data
                        'base_return_url' => $settings['yookassa_base_return_url'] ?? '',
                        'capture' => (bool)$settings['yookassa_capture']
                    ],
                    'robokassa' => [
                        'enabled' => (bool)$settings['robokassa_enabled'],
                        'merchant_login' => $settings['robokassa_merchant_login'] ?? '',
                        'password1' => $settings['robokassa_password1'] ? '***' : '',
                        'password2' => $settings['robokassa_password2'] ? '***' : '',
                        'test_mode' => (bool)$settings['robokassa_test_mode'],
                        'culture' => $settings['robokassa_culture'] ?? 'ru',
                        'success_url' => $settings['robokassa_success_url'] ?? '',
                        'fail_url' => $settings['robokassa_fail_url'] ?? ''
                    ],
                    'cloudpayments' => [
                        'enabled' => (bool)$settings['cloudpayments_enabled'],
                        'public_id' => $settings['cloudpayments_public_id'] ?? '',
                        'api_secret' => $settings['cloudpayments_api_secret'] ? '***' : '',
                        'success_url' => $settings['cloudpayments_success_url'] ?? '',
                        'fail_url' => $settings['cloudpayments_fail_url'] ?? ''
                    ],
                    'alfabank' => [
                        'enabled' => (bool)$settings['alfabank_enabled'],
                        'token' => $settings['alfabank_token'] ? '***' : '',
                        'gateway' => $settings['alfabank_gateway'] ?? 'test',
                        'stages' => (int)($settings['alfabank_stages'] ?? 1),
                        'language' => $settings['alfabank_language'] ?? 'ru',
                        'return_url' => $settings['alfabank_return_url'] ?? '',
                        'fail_url' => $settings['alfabank_fail_url'] ?? '',
                        'amount_format' => $settings['alfabank_amount_format'] ?? 'kopeyki'
                    ]
                ]
            ];
            
            $this->logActivity($user['user_id'], 'settings_view', 'payment_settings');
            
            $this->sendSuccess($data, 'Payment settings retrieved successfully');
            
        } catch (Exception $e) {
            error_log("Payment settings get error: " . $e->getMessage());
            $this->sendError(500, 'Failed to retrieve payment settings');
        }
    }
    
    public function put() {
        $user = $this->requireAuth();
        
        // Validate input structure
        $data = $this->validate([
            'active_provider' => [
                'required' => false,
                'enum' => ['yookassa', 'robokassa', 'cloudpayments', 'alfabank']
            ],
            'providers' => [
                'required' => false,
                'type' => 'array'
            ]
        ]);
        
        try {
            $this->pdo->beginTransaction();
            
            $updateFields = [];
            $updateValues = [];
            
            // Handle active provider
            if (isset($data['active_provider'])) {
                $updateFields[] = "active_provider = ?";
                $updateValues[] = $data['active_provider'];
            }
            
            // Handle provider settings
            if (isset($data['providers']) && is_array($data['providers'])) {
                foreach ($data['providers'] as $provider => $settings) {
                    if (!in_array($provider, ['yookassa', 'robokassa', 'cloudpayments', 'alfabank'])) {
                        continue;
                    }
                    
                    $this->updateProviderSettings($provider, $settings, $updateFields, $updateValues);
                }
            }
            
            if (empty($updateFields)) {
                $this->sendError(400, 'No valid fields to update');
            }
            
            // Update settings
            $sql = "UPDATE payment_settings SET " . implode(', ', $updateFields) . " WHERE id = 1";
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute($updateValues);
            
            $this->pdo->commit();
            
            $this->logActivity($user['user_id'], 'settings_update', 'payment_settings', '1', $data);
            
            // Return updated settings
            $this->get();
            
        } catch (Exception $e) {
            $this->pdo->rollBack();
            error_log("Payment settings update error: " . $e->getMessage());
            $this->sendError(500, 'Failed to update payment settings');
        }
    }
    
    private function updateProviderSettings(string $provider, array $settings, array &$updateFields, array &$updateValues): void {
        $fieldMappings = [
            'yookassa' => [
                'enabled' => 'yookassa_enabled',
                'shop_id' => 'yookassa_shop_id',
                'secret_key' => 'yookassa_secret_key',
                'base_return_url' => 'yookassa_base_return_url',
                'capture' => 'yookassa_capture'
            ],
            'robokassa' => [
                'enabled' => 'robokassa_enabled',
                'merchant_login' => 'robokassa_merchant_login',
                'password1' => 'robokassa_password1',
                'password2' => 'robokassa_password2',
                'test_mode' => 'robokassa_test_mode',
                'culture' => 'robokassa_culture',
                'success_url' => 'robokassa_success_url',
                'fail_url' => 'robokassa_fail_url'
            ],
            'cloudpayments' => [
                'enabled' => 'cloudpayments_enabled',
                'public_id' => 'cloudpayments_public_id',
                'api_secret' => 'cloudpayments_api_secret',
                'success_url' => 'cloudpayments_success_url',
                'fail_url' => 'cloudpayments_fail_url'
            ],
            'alfabank' => [
                'enabled' => 'alfabank_enabled',
                'token' => 'alfabank_token',
                'gateway' => 'alfabank_gateway',
                'stages' => 'alfabank_stages',
                'language' => 'alfabank_language',
                'return_url' => 'alfabank_return_url',
                'fail_url' => 'alfabank_fail_url',
                'amount_format' => 'alfabank_amount_format'
            ]
        ];
        
        if (!isset($fieldMappings[$provider])) {
            return;
        }
        
        foreach ($settings as $key => $value) {
            if (isset($fieldMappings[$provider][$key])) {
                $dbField = $fieldMappings[$provider][$key];
                
                // Don't update if value is masked (***)
                if ($value === '***') {
                    continue;
                }
                
                // Convert boolean fields
                if (in_array($key, ['enabled', 'capture', 'test_mode'])) {
                    $value = (bool)$value ? 1 : 0;
                }
                
                $updateFields[] = "{$dbField} = ?";
                $updateValues[] = $value;
            }
        }
    }
}

// Initialize and handle request
try {
    $api = new PaymentSettingsAPI();
    $api->handleRequest();
} catch (Exception $e) {
    http_response_code(500);
    header('Content-Type: application/json');
    echo json_encode([
        'success' => false,
        'message' => 'Internal server error'
    ]);
}