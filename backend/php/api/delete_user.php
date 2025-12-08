<?php
// Use the centralized bootstrap for database connection and error handling
require_once __DIR__ . '/../includes/bootstrap.php';
// Use the centralized CORS configuration
require_once __DIR__ . '/../config/cors.php';

header('Content-Type: application/json');

// The original script used POST, so we will stick to that. A DELETE verb would be more RESTful.
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405); // Method Not Allowed
    echo json_encode(['success' => false, 'message' => 'Method not allowed. Please use POST.']);
    exit();
}

try {
    // Get the singleton database connection
    $conn = Database::getInstance()->getConnection();

    // Get the raw POST data
    $data = json_decode(file_get_contents("php://input"));

    // Validate the input
    if (!empty($data->id)) {
        // Sanitize the ID
        $user_id = filter_var($data->id, FILTER_VALIDATE_INT);

        if (!$user_id) {
            throw new InvalidArgumentException('Invalid user ID provided.');
        }

        // Prepare and execute the delete statement
        $stmt = $conn->prepare("DELETE FROM users WHERE id = ?");
        
        if ($stmt->execute([$user_id])) {
            // Check if any rows were actually deleted
            if ($stmt->rowCount() > 0) {
                http_response_code(200); // OK
                echo json_encode(['success' => true, 'message' => 'User was successfully deleted.']);
            } else {
                // No rows were deleted, meaning the user was not found
                http_response_code(404); // Not Found
                echo json_encode(['success' => false, 'message' => 'Unable to delete user. User not found.']);
            }
        } else {
            http_response_code(503); // Service Unavailable
            echo json_encode(['success' => false, 'message' => 'Unable to delete user.']);
        }
    } else {
        // Data is incomplete
        http_response_code(400); // Bad Request
        echo json_encode(['success' => false, 'message' => 'Unable to delete user. User ID is missing.']);
    }
} catch (InvalidArgumentException $e) {
    http_response_code(400); // Bad Request
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'A database error occurred while deleting the user.',
        'error' => $e->getMessage() // For development debugging
    ]);
} catch (Throwable $e) {
    // Catch any other exceptions and return a generic server error
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'A server error occurred while deleting the user.',
        'error' => $e->getMessage() // For development debugging
    ]);
}
?>