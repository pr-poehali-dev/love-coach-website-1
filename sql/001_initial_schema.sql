-- WorkTab Admin Panel Database Schema
-- Production Ready SQL Structure

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ==================================================
-- ADMIN USERS AND AUTHENTICATION
-- ==================================================

CREATE TABLE `admin_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL UNIQUE,
  `email` varchar(255) DEFAULT NULL,
  `password_hash` varchar(255) NOT NULL,
  `totp_secret` varchar(32) DEFAULT NULL COMMENT 'Base32 encoded TOTP secret',
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `failed_login_attempts` int(11) NOT NULL DEFAULT 0,
  `locked_until` timestamp NULL DEFAULT NULL,
  `last_login_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_username` (`username`),
  KEY `idx_active` (`is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `admin_sessions` (
  `id` varchar(64) NOT NULL COMMENT 'Session token',
  `user_id` int(11) NOT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` varchar(500) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `expires_at` timestamp NOT NULL,
  `last_activity` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_sessions_user` (`user_id`),
  KEY `idx_expires_at` (`expires_at`),
  CONSTRAINT `fk_sessions_user` FOREIGN KEY (`user_id`) REFERENCES `admin_users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `admin_temp_sessions` (
  `id` varchar(64) NOT NULL COMMENT 'Temporary MFA session token',
  `user_id` int(11) NOT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `attempts` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `expires_at` timestamp NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_temp_sessions_user` (`user_id`),
  KEY `idx_expires_at` (`expires_at`),
  CONSTRAINT `fk_temp_sessions_user` FOREIGN KEY (`user_id`) REFERENCES `admin_users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ==================================================
-- SETTINGS TABLES
-- ==================================================

CREATE TABLE `payment_settings` (
  `id` int(11) NOT NULL DEFAULT 1,
  `active_provider` enum('yookassa','robokassa','cloudpayments','alfabank') NOT NULL DEFAULT 'yookassa',
  
  -- YooKassa settings
  `yookassa_enabled` tinyint(1) NOT NULL DEFAULT 0,
  `yookassa_shop_id` varchar(255) DEFAULT NULL,
  `yookassa_secret_key` varchar(255) DEFAULT NULL,
  `yookassa_base_return_url` varchar(500) DEFAULT NULL,
  `yookassa_capture` tinyint(1) NOT NULL DEFAULT 1,
  
  -- Robokassa settings
  `robokassa_enabled` tinyint(1) NOT NULL DEFAULT 0,
  `robokassa_merchant_login` varchar(255) DEFAULT NULL,
  `robokassa_password1` varchar(255) DEFAULT NULL,
  `robokassa_password2` varchar(255) DEFAULT NULL,
  `robokassa_test_mode` tinyint(1) NOT NULL DEFAULT 1,
  `robokassa_culture` enum('ru','en') NOT NULL DEFAULT 'ru',
  `robokassa_success_url` varchar(500) DEFAULT NULL,
  `robokassa_fail_url` varchar(500) DEFAULT NULL,
  
  -- CloudPayments settings
  `cloudpayments_enabled` tinyint(1) NOT NULL DEFAULT 0,
  `cloudpayments_public_id` varchar(255) DEFAULT NULL,
  `cloudpayments_api_secret` varchar(255) DEFAULT NULL,
  `cloudpayments_success_url` varchar(500) DEFAULT NULL,
  `cloudpayments_fail_url` varchar(500) DEFAULT NULL,
  
  -- AlfaBank settings
  `alfabank_enabled` tinyint(1) NOT NULL DEFAULT 0,
  `alfabank_token` varchar(255) DEFAULT NULL,
  `alfabank_gateway` enum('test','payment') NOT NULL DEFAULT 'test',
  `alfabank_stages` tinyint(1) NOT NULL DEFAULT 1,
  `alfabank_language` varchar(5) NOT NULL DEFAULT 'ru',
  `alfabank_return_url` varchar(500) DEFAULT NULL,
  `alfabank_fail_url` varchar(500) DEFAULT NULL,
  `alfabank_amount_format` enum('rubli','kopeyki') NOT NULL DEFAULT 'kopeyki',
  
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `telegram_settings` (
  `id` int(11) NOT NULL DEFAULT 1,
  `enabled` tinyint(1) NOT NULL DEFAULT 0,
  `bot_token` varchar(255) DEFAULT NULL,
  `chat_id` varchar(255) DEFAULT NULL,
  `notify_on_payment` tinyint(1) NOT NULL DEFAULT 0,
  `notify_on_contact` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ==================================================
-- AUDIT AND LOGGING
-- ==================================================

CREATE TABLE `admin_activity_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `action` varchar(100) NOT NULL,
  `resource` varchar(100) DEFAULT NULL,
  `resource_id` varchar(50) DEFAULT NULL,
  `details` json DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` varchar(500) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_activity_user` (`user_id`),
  KEY `idx_action` (`action`),
  KEY `idx_created_at` (`created_at`),
  CONSTRAINT `fk_activity_user` FOREIGN KEY (`user_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ==================================================
-- INSERT INITIAL DATA
-- ==================================================

-- Default admin user (password: admin123)
INSERT INTO `admin_users` (`id`, `username`, `email`, `password_hash`, `is_active`) VALUES
(1, 'admin', 'admin@workstab.com', '$2y$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 1);

-- Default payment settings
INSERT INTO `payment_settings` (`id`, `active_provider`) VALUES (1, 'yookassa');

-- Default telegram settings
INSERT INTO `telegram_settings` (`id`, `enabled`) VALUES (1, 0);

-- ==================================================
-- CLEANUP OLD SESSIONS (Event Scheduler)
-- ==================================================

SET GLOBAL event_scheduler = ON;

CREATE EVENT IF NOT EXISTS `cleanup_expired_sessions`
ON SCHEDULE EVERY 1 HOUR
STARTS CURRENT_TIMESTAMP
DO
BEGIN
  DELETE FROM `admin_sessions` WHERE `expires_at` < NOW();
  DELETE FROM `admin_temp_sessions` WHERE `expires_at` < NOW();
  DELETE FROM `admin_activity_log` WHERE `created_at` < DATE_SUB(NOW(), INTERVAL 90 DAY);
END;

SET FOREIGN_KEY_CHECKS = 1;

-- ==================================================
-- INDEXES FOR PERFORMANCE
-- ==================================================

-- Activity log performance indexes
ALTER TABLE `admin_activity_log` 
  ADD INDEX `idx_user_action` (`user_id`, `action`),
  ADD INDEX `idx_resource` (`resource`, `resource_id`);

-- Session performance indexes
ALTER TABLE `admin_sessions`
  ADD INDEX `idx_user_activity` (`user_id`, `last_activity`);

COMMIT;