<?php
require_once __DIR__ . '/../includes/bootstrap.php';
require_once __DIR__ . '/../config/cors.php';

header('Content-Type: application/json');

// Ensure the request method is GET
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed. Please use GET.']);
    exit();
}

// Ensure the teacher ID is provided in the URL
if (!isset($_GET['id'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Teacher ID is required.']);
    exit();
}

try {
    // Validate and sanitize the ID
    $id = filter_var($_GET['id'], FILTER_VALIDATE_INT);
    if (!$id) {
        throw new InvalidArgumentException('Invalid Teacher ID format provided.');
    }

    $db = Database::getInstance()->getConnection();
    
    // **FIXED**: The SQL query now selects all the relevant profile fields.
    $sql = "SELECT id, name, email, phone, address, department, bio 
            FROM users 
            WHERE id = :id AND role = 'teacher'";
    
    $stmt = $db->prepare($sql);
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->execute();
    
    $teacher = $stmt->fetch(PDO::FETCH_ASSOC);

    // Check if a teacher was found and return the data
    if ($teacher) {
        http_response_code(200);
        echo json_encode(['success' => true, 'data' => $teacher]);
    } else {
        http_response_code(404); // Not Found
        echo json_encode(['success' => false, 'message' => 'Teacher not found.']);
    }

} catch (InvalidArgumentException $e) {
    http_response_code(400); // Bad Request
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
} catch (Throwable $e) {
    http_response_code(500); // Internal Server Error
    echo json_encode([
        'success' => false,
        'message' => 'A server error occurred while fetching teacher details.',
        'error' => $e->getMessage() // For development debugging
    ]);
}
?>
