<?php
// Use the centralized bootstrap for database connection and error handling
require_once __DIR__ . '/../includes/bootstrap.php';
// Use the centralized CORS configuration
require_once __DIR__ . '/../config/cors.php';

header('Content-Type: application/json');

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405); // Method Not Allowed
    echo json_encode(['success' => false, 'message' => 'Method not allowed. Please use POST.']);
    exit();
}

try {
    // Get the singleton database connection instance
    $db = Database::getInstance()->getConnection();

    // Get the raw POST data
    $data = json_decode(file_get_contents("php://input"));

    // Validate that required data is present
    if (!empty($data->user_id) && !empty($data->document_type)) {
        // Sanitize and validate inputs
        $user_id = filter_var($data->user_id, FILTER_VALIDATE_INT);
        $document_type = htmlspecialchars(strip_tags($data->document_type));
        $notes = isset($data->notes) ? htmlspecialchars(strip_tags($data->notes)) : '';
        $status = 'Pending'; // Set a default status

        if (!$user_id) {
            throw new InvalidArgumentException('Invalid user ID provided.');
        }

        // Prepare and execute the insert statement
        $stmt = $db->prepare("INSERT INTO document_requests (user_id, document_type, notes, status) VALUES (?, ?, ?, ?)");
        
        if ($stmt->execute([$user_id, $document_type, $notes, $status])) {
            http_response_code(201); // Created
            echo json_encode(['success' => true, 'message' => 'Document request was created successfully.']);
        } else {
            http_response_code(503); // Service Unavailable
            echo json_encode(['success' => false, 'message' => 'Unable to create document request.']);
        }
    } else {
        // Data is incomplete
        http_response_code(400); // Bad Request
        echo json_encode(['success' => false, 'message' => 'Incomplete data. Both user_id and document_type are required.']);
    }
} catch (InvalidArgumentException $e) {
    http_response_code(400); // Bad Request
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'A database error occurred while creating the document request.',
        'error' => $e->getMessage() // For development debugging
    ]);
} catch (Throwable $e) {
    // Catch any other errors and return a generic server error response
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'message' => 'A server error occurred while creating the document request.',
        'error' => $e->getMessage() // For development debugging
    ]);
}
?>