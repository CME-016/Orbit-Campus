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

    if (empty($data->student_id) || empty($data->document_type)) {
        http_response_code(400); // Bad Request
        echo json_encode(['success' => false, 'message' => 'Incomplete data. Please provide student_id and document_type.']);
        exit();
    }

    $query = "INSERT INTO document_requests (student_id, document_type, status, request_date) VALUES (:student_id, :document_type, :status, :request_date)";

    $stmt = $conn->prepare($query);

    $status = 'pending';
    $request_date = date('Y-m-d H:i:s');

    $stmt->bindParam(':student_id', $data->student_id);
    $stmt->bindParam(':document_type', $data->document_type);
    $stmt->bindParam(':status', $status);
    $stmt->bindParam(':request_date', $request_date);

    if ($stmt->execute()) {
        http_response_code(201); // Created
        echo json_encode(['success' => true, 'message' => 'Document request was successfully submitted.']);
    } else {
        http_response_code(500); // Internal Server Error
        echo json_encode(['success' => false, 'message' => 'Unable to submit document request.']);
    }

} catch (Throwable $e) {
    // Catch any other errors and return a generic server error response
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'message' => 'A server error occurred during document request submission.',
        'error' => $e->getMessage() // Included for development debugging
    ]);
}
?>