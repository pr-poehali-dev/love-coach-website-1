<?php
require_once '../../includes/auth.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    sendError(405, 'Method not allowed');
}

$session = $auth->requireAuth();

sendSuccess([
    'user' => [
        'id' => $session['user_id'],
        'username' => $session['username']
    ]
]);
?>