<?php
require_once '../../includes/auth.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit();
}

// Get session ID from Authorization header or cookie
$sessionId = null;
$headers = getallheaders();

if (isset($headers['Authorization'])) {
    $authHeader = $headers['Authorization'];
    if (preg_match('/Bearer\s+(.*)$/i', $authHeader, $matches)) {
        $sessionId = $matches[1];
    }
} elseif (isset($_COOKIE['session_id'])) {
    $sessionId = $_COOKIE['session_id'];
}

if (!$sessionId) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'No session found']);
    exit();
}

$session = $auth->verifySession($sessionId);

if (!$session) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Invalid or expired session']);
    exit();
}

echo json_encode([
    'success' => true,
    'user' => [
        'id' => $session['user_id'],
        'username' => $session['username']
    ]
]);
?>