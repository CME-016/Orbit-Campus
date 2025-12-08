<?php
// Use the centralized bootstrap for database connection, error handling, and class autoloading.
require_once __DIR__ . '/../includes/bootstrap.php';
// Use the centralized CORS configuration.
require_once __DIR__ . '/../config/cors.php';

// Set the content type for the response.
header("Content-Type: application/json; charset=UTF-8");

// The endpoint should only respond to POST requests.
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405); // Method Not Allowed
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
    exit();
}

// Get the request data.
$data = json_decode(file_get_contents("php://input"));

// Basic validation of the incoming data.
if (!isset($data->id) || !isset($data->status)) {
    http_response_code(400); // Bad Request
    echo json_encode(['success' => false, 'message' => 'Missing required fields: id and status.']);
    exit();
}

try {
    // Get the database connection from our Singleton Database class.
    $db = Database::getInstance()->getConnection();

    // Prepare the SQL statement to update the document request.
    $stmt = $db->prepare(
        "UPDATE document_requests SET status = :status, admin_notes = :admin_notes WHERE id = :id"
    );

    // Bind the parameters to the statement.
    $stmt->bindParam(':status', $data->status);
    $stmt->bindParam(':admin_notes', $data->admin_notes);
    $stmt->bindParam(':id', $data->id, PDO::PARAM_INT);

    // Execute the update.
    if ($stmt->execute()) {
        http_response_code(200);
        echo json_encode(['success' => true, 'message' => 'Document request updated successfully.']);
    } else {
        http_response_code(500); // Internal Server Error
        echo json_encode(['success' => false, 'message' => 'Failed to update document request.']);
    }
} catch (Throwable $e) {
    // Centralized error handling.
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'A server error occurred.',
        'error' => $e->getMessage()
    ]);
}
?>