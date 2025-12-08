<?php
// Use the centralized bootstrap for database and error handling
require_once __DIR__ . '/../includes/bootstrap.php';
// Use the centralized CORS configuration
require_once __DIR__ . '/../config/cors.php';

// Set headers for JSON response
header("Content-Type: application/json; charset=UTF-8");

try {
    // Ensure the request method is POST and a file is uploaded
    if ($_SERVER['REQUEST_METHOD'] !== 'POST' || !isset($_FILES['avatar'])) {
        throw new Exception('Invalid request: Must be a POST request with a file upload.');
    }

    // Validate the user ID
    if (!isset($_POST['user_id']) || !filter_var($_POST['user_id'], FILTER_VALIDATE_INT)) {
        throw new Exception('Invalid or missing user ID.');
    }
    $userId = (int)$_POST['user_id'];

    $file = $_FILES['avatar'];

    // Check for upload errors
    if ($file['error'] !== UPLOAD_ERR_OK) {
        throw new Exception('File upload failed with error code: ' . $file['error']);
    }

    // Validate file type
    $allowed = ['jpg', 'jpeg', 'png'];
    $fileExt = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
    if (!in_array($fileExt, $allowed)) {
        throw new Exception('Invalid file type. Only JPG, JPEG, and PNG are permitted.');
    }

    // Validate file size
    if ($file['size'] > 5000000) { // 5MB limit
        throw new Exception('File is too large. The maximum size is 5MB.');
    }

    // Construct a unique and safe filename
    $fileNameNew = "profile_" . $userId . "_" . uniqid('', true) . "." . $fileExt;
    $fileDestination = dirname(__DIR__) . '/uploads/' . $fileNameNew;

    // Move the uploaded file
    if (!move_uploaded_file($file['tmp_name'], $fileDestination)) {
        throw new Exception('Failed to save uploaded file. Please check server permissions for the uploads directory.');
    }

    // Get database connection from our new Singleton Database class
    $db = Database::getInstance()->getConnection();

    // The URL that will be stored in the database. 
    // Note: This should be a relative path or a full URL from a config file in a real application.
    $avatarUrl = 'http://localhost/php/uploads/' . $fileNameNew;
    
    // Update the user's avatar URL in the database using PDO
    $sql = "UPDATE users SET avatar_url = ? WHERE id = ?";
    $stmt = $db->prepare($sql);
    
    if (!$stmt->execute([$avatarUrl, $userId])) {
        throw new Exception('Failed to update user record in the database.');
    }

    // Send a success response
    echo json_encode([
        'success' => true, 
        'avatar_url' => $avatarUrl,
        'message' => 'Profile photo uploaded successfully.'
    ]);

} catch (Throwable $e) {
    // Centralized error handling
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'message' => $e->getMessage()
    ]);
}
?>