<?php
// Disable display of errors to prevent breaking JSON responses
ini_set('display_errors', 0);
ini_set('display_startup_errors', 0);

// Report all errors
error_reporting(E_ALL);

// Log errors to a file instead of displaying them
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/../../logs/php_errors.log'); // Ensure this path is writable

// --- CORS HEADERS ---
// This is the frontend URL. It is allowed to make requests to this backend.
// We get the origin of the request dynamically.
if (isset($_SERVER['HTTP_ORIGIN'])) {
    // You can add a whitelist of allowed origins here for better security
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
} else {
    // Allow all origins if HTTP_ORIGIN is not set
    header("Access-Control-Allow-Origin: *");
}

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE, PUT");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");


// The browser sends an OPTIONS request first to see what methods are allowed.
// We need to respond to this pre-flight request with a 200 OK status.
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}
// --- END CORS HEADERS ---


// Include the correct database configuration
require_once __DIR__ . '/../config/database.php';

?>
