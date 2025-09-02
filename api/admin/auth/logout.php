<?php
require_once '../../includes/auth.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendError(405, 'Method not allowed');
}

// Get session ID from Authorization header or cookie
$sessionId = null;
$headers = getallheaders();

if (isset($headers['Authorization'])) {
    if (preg_match('/Bearer\s+(.*)$/i', $headers['Authorization'], $matches)) {
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

sendSuccess(null, 'Logged out successfully');
?>