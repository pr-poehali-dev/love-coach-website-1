<?php
require_once '../../../includes/auth.php';

// Require authentication
$session = $auth->requireAuth();

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    // Get telegram settings
    try {
        $stmt = $pdo->prepare("SELECT * FROM telegram_settings WHERE id = 1");
        $stmt->execute();
        $settings = $stmt->fetch();
        
        if (!$settings) {
            // Create default settings if not exists
            $stmt = $pdo->prepare("
                INSERT INTO telegram_settings (id, enabled) 
                VALUES (1, 0)
            ");
            $stmt->execute();
            
            // Fetch the newly created record
            $stmt = $pdo->prepare("SELECT * FROM telegram_settings WHERE id = 1");
            $stmt->execute();
            $settings = $stmt->fetch();
        }
        
        // Don't expose bot token in response for security
        if ($settings['bot_token']) {
            $settings['bot_token'] = '***hidden***';
        }
        
        sendSuccess($settings);
        
    } catch (Exception $e) {
        error_log("Telegram settings fetch error: " . $e->getMessage());
        sendError(500, 'Failed to fetch telegram settings');
    }
}

if ($method === 'POST') {
    // Update telegram settings
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!$input) {
        sendError(400, 'Invalid JSON input');
    }
    
    try {
        $allowedFields = [
            'bot_token', 'chat_id', 'enabled', 
            'notifications_new_payments', 'notifications_failed_payments', 
            'notifications_system_alerts'
        ];
        
        $updateFields = [];
        $updateValues = [];
        
        foreach ($input as $field => $value) {
            if (in_array($field, $allowedFields)) {
                $updateFields[] = "$field = ?";
                $updateValues[] = $value;
            }
        }
        
        if (empty($updateFields)) {
            sendError(400, 'No valid fields to update');
        }
        
        $sql = "UPDATE telegram_settings SET " . implode(', ', $updateFields) . " WHERE id = 1";
        $stmt = $pdo->prepare($sql);
        $stmt->execute($updateValues);
        
        // Fetch updated settings
        $stmt = $pdo->prepare("SELECT * FROM telegram_settings WHERE id = 1");
        $stmt->execute();
        $settings = $stmt->fetch();
        
        // Hide bot token in response
        if ($settings['bot_token']) {
            $settings['bot_token'] = '***hidden***';
        }
        
        sendSuccess($settings, 'Telegram settings updated successfully');
        
    } catch (Exception $e) {
        error_log("Telegram settings update error: " . $e->getMessage());
        sendError(500, 'Failed to update telegram settings');
    }
}

sendError(405, 'Method not allowed');
?>