<?php
// Use the centralized bootstrap for database connection and error handling
require_once __DIR__ . '/../includes/bootstrap.php';
// Use the centralized CORS configuration
require_once __DIR__ . '/../config/cors.php';

header('Content-Type: application/json; charset=UTF-8');

// This endpoint should only respond to GET requests.
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405); // Method Not Allowed
    echo json_encode(['success' => false, 'message' => 'Method not allowed. Please use GET.']);
    exit();
}

try {
    // Get the student ID from the query string
    $student_id = isset($_GET['student_id']) ? filter_var($_GET['student_id'], FILTER_VALIDATE_INT) : null;

    if ($student_id === null || $student_id === false) {
        http_response_code(400); // Bad Request
        echo json_encode(['success' => false, 'message' => 'A valid student_id is required.']);
        exit();
    }

    // Get the singleton database connection instance
    $db = Database::getInstance()->getConnection();
    
    // Fetch the academic records for the specified student
    $stmt = $db->prepare("SELECT id, semester, subject_name, grade, cgpa FROM academic_records WHERE student_id = ? ORDER BY semester ASC");
    $stmt->execute([$student_id]);
    $records = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    http_response_code(200); // OK
    echo json_encode([
        'success' => true,
        'message' => 'Academic records fetched successfully.',
        'data' => $records
    ]);

} catch (Throwable $e) {
    // Catch any exceptions and return a generic server error
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'A server error occurred while fetching academic records.',
        'error' => $e->getMessage() // For development debugging
    ]);
}
?>