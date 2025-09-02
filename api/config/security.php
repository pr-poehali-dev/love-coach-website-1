<?php
/**
 * Security Configuration
 * Production Ready Security Settings
 */

// Environment detection
$environment = $_ENV['APP_ENV'] ?? 'production';
$isDevelopment = $environment === 'development';

// Security configurations
$securityConfig = [
    // JWT Configuration
    'jwt' => [
        'secret' => $_ENV['JWT_SECRET'] ?? null,
        'algorithm' => 'HS256',
        'expiry' => [
            'access_token' => 2 * 60 * 60,    // 2 hours
            'temp_session' => 5 * 60,         // 5 minutes for MFA
            'remember_me' => 30 * 24 * 60 * 60 // 30 days
        ]
    ],
    
    // CORS Configuration
    'cors' => [
        'allowed_origins' => $isDevelopment 
            ? ['http://localhost:3000', 'http://localhost:5173', 'https://workstab.com']
            : explode(',', $_ENV['CORS_ALLOWED_ORIGINS'] ?? 'https://workstab.com'),
        'allowed_methods' => ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        'allowed_headers' => ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
        'max_age' => 86400 // 24 hours
    ],
    
    // Rate Limiting
    'rate_limit' => [
        'login_attempts' => [
            'max_attempts' => 5,
            'window_minutes' => 15,
            'lockout_minutes' => 30
        ],
        'totp_attempts' => [
            'max_attempts' => 5,
            'window_minutes' => 5
        ],
        'api_requests' => [
            'max_requests' => $isDevelopment ? 1000 : 100,
            'window_minutes' => 1
        ]
    ],
    
    // Password Policy
    'password' => [
        'min_length' => 8,
        'require_uppercase' => true,
        'require_lowercase' => true,
        'require_numbers' => true,
        'require_symbols' => false,
        'hash_cost' => 12
    ],
    
    // Session Security
    'session' => [
        'cookie_name' => 'workstab_session',
        'cookie_secure' => !$isDevelopment,
        'cookie_httponly' => true,
        'cookie_samesite' => 'Lax',
        'cookie_domain' => $isDevelopment ? '' : '.workstab.com'
    ],
    
    // Security Headers
    'headers' => [
        'X-Content-Type-Options' => 'nosniff',
        'X-Frame-Options' => 'DENY',
        'X-XSS-Protection' => '1; mode=block',
        'Referrer-Policy' => 'strict-origin-when-cross-origin',
        'Content-Security-Policy' => "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:;",
        'Strict-Transport-Security' => $isDevelopment ? null : 'max-age=31536000; includeSubDomains'
    ]
];

// Validate JWT secret in production
if ($environment === 'production' && empty($securityConfig['jwt']['secret'])) {
    throw new Exception('JWT_SECRET environment variable is required in production');
}

// Generate JWT secret for development if not set
if ($isDevelopment && empty($securityConfig['jwt']['secret'])) {
    $securityConfig['jwt']['secret'] = 'dev-secret-' . md5(__DIR__);
}

// Export configuration
return $securityConfig;