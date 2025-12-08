<?php
// Use the centralized bootstrap for database connection and error handling
require_once __DIR__ . '/../includes/bootstrap.php';
// Use the centralized CORS configuration
require_once __DIR__ . '/../config/cors.php';

header('Content-Type: application/json');

// This endpoint should only respond to GET requests.
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405); // Method Not Allowed
    echo json_encode(['success' => false, 'message' => 'Method not allowed. Please use GET.']);
    exit();
}

try {
    // Get the singleton database connection instance
    $db = Database::getInstance()->getConnection();

    // The query now joins `fee_details` with `users` to get student names.
    $query = "SELECT fd.*, u.name as studentName 
              FROM fee_details fd 
              JOIN users u ON fd.student_id = u.id 
              ORDER BY u.name, fd.due_date";
    
    $stmt = $db->query($query); // query() is safe as there are no parameters
    
    $fees = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    http_response_code(200); // OK
    echo json_encode([
        'success' => true,
        'message' => 'All fee records fetched successfully.',
        'data' => $fees
    ]);

} catch (Throwable $e) {
    // Catch any exceptions and return a generic server error
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'An error occurred while fetching fee records.',
        'error' => $e->getMessage() // For development debugging
    ]);
}
?>