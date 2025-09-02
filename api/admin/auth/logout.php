<?php
require_once '../../includes/auth.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
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

if ($sessionId) {
    $auth->deleteSession($sessionId);
}

// Clear session cookie
setcookie('session_id', '', time() - 3600, '/', '', true, true);

echo json_encode(['success' => true, 'message' => 'Logged out successfully']);
?>