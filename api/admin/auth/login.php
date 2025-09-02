<?php
require_once '../../includes/auth.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendError(405, 'Method not allowed');
}

$input = json_decode(file_get_contents('php://input'), true);

if (empty($input['username']) || empty($input['password'])) {
    sendError(400, 'Username and password are required');
}

$result = $auth->login($input['username'], $input['password']);

if (!$result['success']) {
    sendError(401, $result['message']);
}

// If TOTP is required, don't create session yet
if ($result['needs_totp']) {
    session_start();
    $_SESSION['temp_user_id'] = $result['user']['id'];
    $_SESSION['temp_login_time'] = time();
    
    // Generate temporary MFA token
    $mfaToken = bin2hex(random_bytes(16));
    $_SESSION['mfa_token'] = $mfaToken;
    
    sendSuccess([
        'mfa_required' => true,
        'mfa_token' => $mfaToken,
        'message' => 'Please enter your TOTP code'
    ]);
}

// Create session for users without TOTP
$sessionId = $auth->createSession($result['user']['id']);

if (!$sessionId) {
    sendError(500, 'Failed to create session');
}

sendSuccess([
    'token' => $sessionId
]);
?>