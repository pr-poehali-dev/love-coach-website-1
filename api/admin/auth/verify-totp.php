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
    unset($_SESSION['temp_user_id'], $_SESSION['temp_login_time']);
    sendError(401, 'Login session expired');
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

// Clear temporary data
unset($_SESSION['temp_user_id'], $_SESSION['temp_login_time'], $_SESSION['mfa_token']);

sendSuccess([
    'token' => $sessionId,
    'user' => [
        'id' => $user['id'],
        'username' => $user['username']
    ]
]);
?>