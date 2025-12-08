<?php
// Use the centralized bootstrap and CORS configuration
require_once __DIR__ . '/../includes/bootstrap.php';
require_once __DIR__ . '/../config/cors.php';

// Set content type to JSON
header('Content-Type: application/json');

// Check for POST request method
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405); // Method Not Allowed
    echo json_encode(['success' => false, 'message' => 'Method not allowed. Please use POST.']);
    exit();
}

try {
    $conn = Database::getInstance()->getConnection();

    $data = json_decode(file_get_contents("php://input"));

    if (empty($data->id) || empty($data->status)) {
        http_response_code(400); // Bad Request
        echo json_encode(['success' => false, 'message' => 'Incomplete data. Please provide id and status.']);
        exit();
    }

    $query = "UPDATE document_requests SET status = :status WHERE id = :id";

    $stmt = $conn->prepare($query);

    $stmt->bindParam(':id', $data->id);
    $stmt->bindParam(':status', $data->status);

    if ($stmt->execute()) {
        http_response_code(200);
        echo json_encode(['success' => true, 'message' => 'Document status was successfully updated.']);
    } else {
        http_response_code(500); // Internal Server Error
        echo json_encode(['success' => false, 'message' => 'Unable to update document status.']);
    }

} catch (Throwable $e) {
    // Catch any other errors and return a generic server error response
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'message' => 'A server error occurred during document status update.',
        'error' => $e->getMessage() // Included for development debugging
    ]);
}
?>