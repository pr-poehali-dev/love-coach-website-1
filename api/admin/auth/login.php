<?php
require_once '../../includes/auth.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit();
}

$input = json_decode(file_get_contents('php://input'), true);

if (empty($input['username']) || empty($input['password'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Username and password are required']);
    exit();
}

$result = $auth->login($input['username'], $input['password']);

if (!$result['success']) {
    http_response_code(401);
    echo json_encode($result);
    exit();
}

// If TOTP is required, don't create session yet
if ($result['needs_totp']) {
    // Store user data temporarily (you might want to use a more secure method)
    session_start();
    $_SESSION['temp_user_id'] = $result['user']['id'];
    $_SESSION['temp_login_time'] = time();
    
    echo json_encode([
        'success' => true,
        'needs_totp' => true,
        'message' => 'Please enter your TOTP code'
    ]);
    exit();
}

// Create session for users without TOTP
$sessionId = $auth->createSession($result['user']['id']);

echo json_encode([
    'success' => true,
    'needs_totp' => false,
    'session_id' => $sessionId,
    'user' => [
        'id' => $result['user']['id'],
        'username' => $result['user']['username']
    ]
]);
?>