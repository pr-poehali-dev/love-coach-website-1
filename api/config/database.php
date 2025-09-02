<?php
/**
 * Database Configuration
 * Production Ready Database Connection
 */

// Environment detection
$environment = $_ENV['APP_ENV'] ?? 'production';

// Database configurations for different environments
$configs = [
    'development' => [
        'host' => $_ENV['DB_HOST'] ?? 'localhost',
        'name' => $_ENV['DB_NAME'] ?? 'workstab_dev',
        'user' => $_ENV['DB_USER'] ?? 'root',
        'pass' => $_ENV['DB_PASS'] ?? '',
        'charset' => 'utf8mb4',
        'options' => [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
            PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci"
        ]
    ],
    
    'production' => [
        'host' => $_ENV['DB_HOST'] ?? 'localhost',
        'name' => $_ENV['DB_NAME'] ?? 'workstab',
        'user' => $_ENV['DB_USER'] ?? 'workstab_user',
        'pass' => $_ENV['DB_PASS'] ?? '',
        'charset' => 'utf8mb4',
        'options' => [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
            PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci",
            PDO::ATTR_PERSISTENT => true,
            PDO::ATTR_TIMEOUT => 10
        ]
    ]
];

// Get current config
$config = $configs[$environment] ?? $configs['production'];

// Validate required settings
if (empty($config['pass']) && $environment === 'production') {
    throw new Exception('Database password is required in production environment');
}

// Create PDO connection with retry logic
function createDatabaseConnection($config, $maxRetries = 3) {
    $attempt = 0;
    
    while ($attempt < $maxRetries) {
        try {
            $dsn = "mysql:host={$config['host']};dbname={$config['name']};charset={$config['charset']}";
            $pdo = new PDO($dsn, $config['user'], $config['pass'], $config['options']);
            
            // Test connection
            $pdo->query('SELECT 1');
            
            return $pdo;
            
        } catch (PDOException $e) {
            $attempt++;
            
            if ($attempt >= $maxRetries) {
                error_log("Database connection failed after {$maxRetries} attempts: " . $e->getMessage());
                throw new Exception('Database connection failed. Please check your configuration.');
            }
            
            // Wait before retry
            sleep(1);
        }
    }
}

// Export global PDO instance
try {
    $pdo = createDatabaseConnection($config);
} catch (Exception $e) {
    // In production, don't expose database errors
    if ($environment === 'production') {
        http_response_code(503);
        exit('Service temporarily unavailable');
    } else {
        throw $e;
    }
}