<?php
require_once '../../includes/auth.php';
session_start();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit();
}

$input = json_decode(file_get_contents('php://input'), true);

if (empty($input['code'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'TOTP code is required']);
    exit();
}

// Check if we have temporary user data from login
if (empty($_SESSION['temp_user_id']) || empty($_SESSION['temp_login_time'])) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'No pending login found']);
    exit();
}

// Check if temp session is still valid (5 minutes)
if (time() - $_SESSION['temp_login_time'] > 300) {
    unset($_SESSION['temp_user_id'], $_SESSION['temp_login_time']);
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Login session expired']);
    exit();
}

// Get user data
$stmt = $pdo->prepare("SELECT id, username, totp_secret FROM admin_users WHERE id = ? AND is_active = 1");
$stmt->execute([$_SESSION['temp_user_id']]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$user || empty($user['totp_secret'])) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Invalid user or TOTP not configured']);
    exit();
}

// Verify TOTP code
if (!$auth->verifyTotp($user['totp_secret'], $input['code'])) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Invalid TOTP code']);
    exit();
}

// TOTP verified, create session
$sessionId = $auth->createSession($user['id']);

// Clear temporary data
unset($_SESSION['temp_user_id'], $_SESSION['temp_login_time']);

echo json_encode([
    'success' => true,
    'session_id' => $sessionId,
    'user' => [
        'id' => $user['id'],
        'username' => $user['username']
    ]
]);
?>