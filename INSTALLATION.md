# 🚀 WorkTab Admin Panel - Production Installation Guide

## Production-Ready Installation & Deployment

### 📋 System Requirements

- **PHP**: 8.0+ (with extensions: pdo, pdo_mysql, openssl, json, mbstring)
- **MySQL**: 8.0+ or MariaDB 10.4+
- **Web Server**: Apache 2.4+ or Nginx 1.18+
- **Node.js**: 18+ (for frontend build)
- **SSL Certificate**: Required for production

---

## 🗄️ Database Setup

### 1. Create Database and User

```sql
-- Connect as MySQL root
mysql -u root -p

-- Create database
CREATE DATABASE workstab CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create dedicated user
CREATE USER 'workstab_user'@'localhost' IDENTIFIED BY 'your_secure_password_here';

-- Grant privileges
GRANT ALL PRIVILEGES ON workstab.* TO 'workstab_user'@'localhost';
FLUSH PRIVILEGES;

-- Exit MySQL
EXIT;
```

### 2. Import Database Schema

```bash
# Import the production-ready schema
mysql -u workstab_user -p workstab < sql/001_initial_schema.sql
```

### 3. Verify Installation

```sql
-- Connect to verify
mysql -u workstab_user -p workstab

-- Check tables
SHOW TABLES;

-- Verify admin user exists (default: admin/admin123)
SELECT id, username, created_at FROM admin_users;
```

---

## ⚙️ Backend Configuration

### 1. Configure Environment

```bash
# Copy production config
cp config/.env.production .env

# Edit configuration
nano .env
```

### 2. Required Environment Variables

```env
# CRITICAL: Change these values
JWT_SECRET=your_64_character_random_string_here
DB_PASS=your_secure_database_password

# Your domain
CORS_ALLOWED_ORIGINS=https://your-domain.com
COOKIE_DOMAIN=.your-domain.com
```

### 3. Generate Secure JWT Secret

```bash
# Option 1: OpenSSL
openssl rand -base64 64

# Option 2: PHP
php -r "echo bin2hex(random_bytes(32)) . PHP_EOL;"
```

### 4. Set File Permissions

```bash
# Make API executable
chmod -R 755 api/
chmod 600 .env

# Set proper ownership (replace www-data with your web server user)
chown -R www-data:www-data api/
```

---

## 🌐 Web Server Configuration

### Apache Configuration

Create `/etc/apache2/sites-available/workstab.conf`:

```apache
<VirtualHost *:443>
    ServerName your-domain.com
    DocumentRoot /var/www/workstab
    
    # SSL Configuration
    SSLEngine on
    SSLCertificateFile /path/to/your-cert.crt
    SSLCertificateKeyFile /path/to/your-private.key
    
    # Security Headers
    Header always set X-Frame-Options DENY
    Header always set X-Content-Type-Options nosniff
    Header always set X-XSS-Protection "1; mode=block"
    Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
    
    # API Routing
    <Directory "/var/www/workstab">
        AllowOverride All
        Require all granted
    </Directory>
    
    # API v2 routing
    RewriteEngine On
    RewriteRule ^api/v2/(.*)$ api/v2/$1 [L]
    
    # Frontend routing
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
    
    ErrorLog ${APACHE_LOG_DIR}/workstab-error.log
    CustomLog ${APACHE_LOG_DIR}/workstab-access.log combined
</VirtualHost>

# Redirect HTTP to HTTPS
<VirtualHost *:80>
    ServerName your-domain.com
    Redirect permanent / https://your-domain.com/
</VirtualHost>
```

### Nginx Configuration

Create `/etc/nginx/sites-available/workstab`:

```nginx
server {
    listen 443 ssl http2;
    server_name your-domain.com;
    root /var/www/workstab;
    index index.html;

    # SSL Configuration
    ssl_certificate /path/to/your-cert.crt;
    ssl_certificate_key /path/to/your-private.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    # Security Headers
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains";

    # API v2 routing
    location ^~ /api/v2/ {
        try_files $uri $uri/ @api;
    }

    location @api {
        rewrite ^/api/v2/(.*)$ /api/v2/$1.php last;
    }

    # PHP handling
    location ~ \.php$ {
        fastcgi_pass unix:/run/php/php8.1-fpm.sock;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
    }

    # Frontend routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Security
    location ~ /\. {
        deny all;
    }
}

# Redirect HTTP to HTTPS
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}
```

---

## 🎨 Frontend Build & Deployment

### 1. Install Dependencies

```bash
npm install
```

### 2. Build for Production

```bash
# Build optimized production bundle
npm run build

# Verify build
ls -la dist/
```

### 3. Deploy Frontend Files

```bash
# Copy built files to web root
cp -r dist/* /var/www/workstab/

# Set permissions
chown -R www-data:www-data /var/www/workstab/
chmod -R 644 /var/www/workstab/*
chmod 755 /var/www/workstab/
```

---

## 🔐 Security Hardening

### 1. Change Default Admin Password

```sql
-- Connect to database
mysql -u workstab_user -p workstab

-- Generate new password hash (replace 'your_new_password')
-- Use: php -r "echo password_hash('your_new_password', PASSWORD_ARGON2ID);"

UPDATE admin_users 
SET password_hash = '$argon2id$v=19$m=65536,t=4,p=3$hash_here' 
WHERE username = 'admin';
```

### 2. Enable TOTP (Optional)

```sql
-- Generate TOTP secret for admin user
UPDATE admin_users 
SET totp_secret = 'JBSWY3DPEHPK3PXP' 
WHERE username = 'admin';

-- Use Google Authenticator or similar app with this secret
```

### 3. Database Security

```sql
-- Remove test database
DROP DATABASE IF EXISTS test;

-- Remove anonymous users
DELETE FROM mysql.user WHERE User='';

-- Remove remote root login
DELETE FROM mysql.user WHERE User='root' AND Host NOT IN ('localhost', '127.0.0.1', '::1');

-- Reload privileges
FLUSH PRIVILEGES;
```

### 4. File System Security

```bash
# Hide sensitive files
chmod 600 .env config/database.php config/security.php

# Disable directory browsing in API folder
echo "Options -Indexes" > api/.htaccess
```

---

## 🔧 Testing Installation

### 1. Test Database Connection

```bash
# Test PHP database connection
php -r "
require_once 'api/config/database.php';
echo 'Database connection: OK' . PHP_EOL;
"
```

### 2. Test API Endpoints

```bash
# Test login endpoint
curl -X POST https://your-domain.com/api/v2/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'

# Expected: {"success":true,"message":"Login successful",...}
```

### 3. Test Frontend

1. Open https://your-domain.com
2. Should display admin login page
3. Login with admin/admin123
4. Should redirect to admin dashboard

---

## 📊 Monitoring & Maintenance

### 1. Log Monitoring

```bash
# Apache logs
tail -f /var/log/apache2/workstab-error.log

# Nginx logs
tail -f /var/log/nginx/error.log

# PHP logs
tail -f /var/log/php8.1-fpm.log
```

### 2. Database Maintenance

```sql
-- Check expired sessions (cleaned automatically)
SELECT COUNT(*) FROM admin_sessions WHERE expires_at < NOW();

-- View activity logs
SELECT * FROM admin_activity_log 
ORDER BY created_at DESC LIMIT 10;
```

### 3. Backup Strategy

```bash
# Database backup
mysqldump -u workstab_user -p workstab > backup_$(date +%Y%m%d_%H%M%S).sql

# File backup
tar -czf workstab_backup_$(date +%Y%m%d_%H%M%S).tar.gz \
    /var/www/workstab/ \
    .env \
    api/ \
    --exclude=node_modules \
    --exclude=dist
```

---

## 🚨 Troubleshooting

### Common Issues

1. **500 Internal Server Error**
   - Check PHP error logs
   - Verify database connection
   - Check file permissions

2. **404 on API Calls**
   - Verify web server configuration
   - Check RewriteEngine is enabled
   - Ensure API files exist

3. **CORS Issues**
   - Verify CORS_ALLOWED_ORIGINS in .env
   - Check domain configuration
   - Test with browser dev tools

4. **Database Connection Failed**
   - Verify credentials in .env
   - Test MySQL connection manually
   - Check MySQL is running

### Performance Optimization

```bash
# Enable OPcache
echo "opcache.enable=1" >> /etc/php/8.1/fpm/conf.d/10-opcache.ini

# Optimize MySQL
echo "innodb_buffer_pool_size=256M" >> /etc/mysql/mysql.conf.d/mysqld.cnf

# Restart services
systemctl restart php8.1-fpm
systemctl restart mysql
systemctl restart apache2  # or nginx
```

---

## ✅ Installation Complete!

Your WorkTab Admin Panel is now ready for production use with:

- ✅ Secure JWT authentication
- ✅ TOTP 2FA support
- ✅ Rate limiting
- ✅ SQL injection protection
- ✅ CORS security
- ✅ Activity logging
- ✅ Production-ready database schema
- ✅ Automated session cleanup

**Default Login**: admin / admin123 (⚠️ Change immediately!)

**Next Steps**:
1. Change default admin password
2. Configure payment providers
3. Set up Telegram notifications
4. Enable monitoring
5. Set up automated backups

For support, check logs and verify configuration against this guide.