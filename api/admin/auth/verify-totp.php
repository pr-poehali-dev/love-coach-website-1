<?php
require_once '../../includes/auth.php';
session_start();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendError(405, 'Method not allowed');
}

$input = json_decode(file_get_contents('php://input'), true);

if (empty($input['code']) || empty($input['mfa_token'])) {
    sendError(400, 'TOTP code and MFA token are required');
}

// Check if we have temporary user data from login
if (empty($_SESSION['temp_user_id']) || empty($_SESSION['temp_login_time']) || empty($_SESSION['mfa_token'])) {
    sendError(401, 'No pending login found');
}

// Verify MFA token
if ($_SESSION['mfa_token'] !== $input['mfa_token']) {
    sendError(401, 'Invalid MFA token');
}

// Check if temp session is still valid (5 minutes)
if (time() - $_SESSION['temp_login_time'] > 300) {
    unset($_SESSION['temp_user_id'], $_SESSION['temp_login_time'], $_SESSION['mfa_token']);
    sendError(401, 'Login session expired');
}

// Rate limiting - max 5 attempts
if (!isset($_SESSION['totp_attempts'])) {
    $_SESSION['totp_attempts'] = 0;
}
$_SESSION['totp_attempts']++;

if ($_SESSION['totp_attempts'] > 5) {
    unset($_SESSION['temp_user_id'], $_SESSION['temp_login_time'], $_SESSION['mfa_token'], $_SESSION['totp_attempts']);
    sendError(429, 'Too many attempts. Please login again.');
}

// Get user data
$stmt = $pdo->prepare("SELECT id, username, totp_secret FROM admin_users WHERE id = ? AND is_active = 1");
$stmt->execute([$_SESSION['temp_user_id']]);
$user = $stmt->fetch();

if (!$user || empty($user['totp_secret'])) {
    sendError(401, 'Invalid user or TOTP not configured');
}

// Verify TOTP code
if (!$auth->verifyTotp($user['totp_secret'], $input['code'])) {
    sendError(401, 'Invalid TOTP code');
}

// TOTP verified, create session
$sessionId = $auth->createSession($user['id']);

if (!$sessionId) {
    sendError(500, 'Failed to create session');
}

// Set cookie for session
setcookie('session_id', $sessionId, [
    'expires' => time() + 7200, // 2 hours
    'path' => '/',
    'domain' => '',
    'secure' => true,
    'httponly' => true,
    'samesite' => 'Lax'
]);

// Clear temporary data
unset($_SESSION['temp_user_id'], $_SESSION['temp_login_time'], $_SESSION['mfa_token'], $_SESSION['totp_attempts']);

sendSuccess([
    'token' => $sessionId,
    'user' => [
        'id' => $user['id'],
        'username' => $user['username']
    ]
]);
?>