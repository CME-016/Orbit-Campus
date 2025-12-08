<?php
// Enable detailed error reporting
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Handle CORS headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Include necessary files
include_once '../config/database.php';

// Database connection
$database = new Database();
$db = $database->getConnection();

// User details
$email_to_update = 'bindhu@gmail.com';
$new_password = 'password123';

// Hash the new password
$password_hash = password_hash($new_password, PASSWORD_BCRYPT);

// Prepare the update query
$query = "UPDATE users SET password = :password WHERE email = :email";
$stmt = $db->prepare($query);

// Bind parameters
$stmt->bindParam(':password', $password_hash);
$stmt->bindParam(':email', $email_to_update);

// Execute the query and check the result
if ($stmt->execute()) {
    if ($stmt->rowCount() > 0) {
        http_response_code(200);
        echo json_encode(array("message" => "Password for '" . $email_to_update . "' has been reset to 'password123'."));
    } else {
        http_response_code(404);
        echo json_encode(array("message" => "User not found."));
    }
} else {
    http_response_code(500);
    echo json_encode(array("message" => "Failed to reset password."));
}
?>
