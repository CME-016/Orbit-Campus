<?php
// --- CORS HEADERS (Permission Slip for the Browser) ---
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
} else {
    header("Access-Control-Allow-Origin: *");
}
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

// Exit early for the browser's pre-flight OPTIONS request.
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}
// --- END CORS HEADERS ---


// Base files for database connection and error logging.
require_once __DIR__ . '/../includes/bootstrap.php';
// NOTE: The reference to 'document_request.php' has been removed as it does not exist.

// Check for required data from the frontend.
if (!isset($_FILES['file']) || !isset($_POST['id'])) {
    http_response_code(400); // Bad Request
    echo json_encode(['success' => false, 'message' => 'Incomplete data. Please provide both file and ID.']);
    exit;
}

try {
    // --- File Upload Logic ---
    $upload_dir = __DIR__ . '/../uploads/';

    // Ensure the uploads directory exists.
    if (!is_dir($upload_dir)) {
        if (!mkdir($upload_dir, 0777, true)) {
            throw new Exception("Failed to create upload directory. Check permissions.");
        }
    }
    
    // Check for any errors during the file upload.
    if ($_FILES['file']['error'] !== UPLOAD_ERR_OK) {
        throw new Exception('File upload error code: ' . $_FILES['file']['error']);
    }

    // Create a safe and unique filename to prevent overwrites and security issues.
    $original_name = basename($_FILES["file"]["name"]);
    $safe_filename = preg_replace('/[^a-zA-Z0-9._-]/', '', $original_name);
    $file_name = uniqid() . '-' . $safe_filename;
    
    // This is the physical path on the server where the file will be stored.
    $target_file_path = $upload_dir . $file_name;
    
    // This is the public URL that will be stored in the database.
    $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? "https" : "http";
    $host = $_SERVER['HTTP_HOST'];
    $base_path = '/php/uploads/'; 
    $db_file_url = $protocol . '://' . $host . $base_path . $file_name;

    // Move the temporary uploaded file to its final destination.
    if (!move_uploaded_file($_FILES["file"]["tmp_name"], $target_file_path)) {
        throw new Exception("Failed to move uploaded file. Check permissions for the 'uploads' directory.");
    }

    // --- Database Update Logic ---
    $db = Database::getInstance()->getConnection();
    $request_id = $_POST['id'];

    // Prepare the SQL statement to update the document request with the file URL.
    $stmt = $db->prepare(
        "UPDATE document_requests SET file_path = :file_path, status = 'Ready for Pickup' WHERE id = :id"
    );

    // Bind the parameters to the statement.
    $stmt->bindParam(':file_path', $db_file_url);
    $stmt->bindParam(':id', $request_id, PDO::PARAM_INT);

    // Execute the update.
    if ($stmt->execute()) {
        http_response_code(200); // OK
        echo json_encode([
            "success" => true, 
            "message" => "File uploaded successfully.", 
            "file_path" => $db_file_url
        ]);
    } else {
        // If the database update fails, delete the orphaned file.
        unlink($target_file_path); 
        throw new Exception("Unable to update the database with the file path.");
    }

} catch (Exception $e) {
    // Catch any error and return a proper JSON response.
    http_response_code(500); // Internal Server Error
    echo json_encode([
        "success" => false, 
        "message" => "Server Error: " . $e->getMessage()
    ]);
}
?>
