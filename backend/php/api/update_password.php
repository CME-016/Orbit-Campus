<?php
// Enable detailed error reporting
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Handle CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Include necessary files
include_once '../config/database.php';
include_once '../models/user.php';

// Check for POST request
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405); // Method Not Allowed
    echo json_encode(array("message" => "Method not allowed. Please use POST."));
    exit();
}

// Get database connection
$database = new Database();
$db = $database->getConnection();

$user = new User($db);

$data = json_decode(file_get_contents("php://input"));

if (
    !empty($data->userId) &&
    !empty($data->currentPassword) &&
    !empty($data->newPassword)
) {
    $user->id = $data->userId;
    $stmt = $user->getById();
    $user_data = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user_data) {
        if (password_verify($data->currentPassword, $user_data['password'])) {
            $user->password = password_hash($data->newPassword, PASSWORD_DEFAULT);
            if ($user->updatePassword()) {
                http_response_code(200);
                echo json_encode(array("message" => "Password was updated."));
            } else {
                http_response_code(503);
                echo json_encode(array("message" => "Unable to update password."));
            }
        } else {
            http_response_code(401);
            echo json_encode(array("message" => "Incorrect current password."));
        }
    } else {
        http_response_code(404);
        echo json_encode(array("message" => "User not found."));
    }
} else {
    http_response_code(400);
    echo json_encode(array("message" => "Unable to update password. Data is incomplete."));
}
?>