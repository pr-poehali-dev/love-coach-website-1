<?php
// Debug endpoint for API testing
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

echo json_encode([
    'success' => true,
    'message' => 'API is working',
    'method' => $_SERVER['REQUEST_METHOD'],
    'path' => $_SERVER['REQUEST_URI'],
    'origin' => $_SERVER['HTTP_ORIGIN'] ?? 'none',
    'timestamp' => date('Y-m-d H:i:s')
]);
?>