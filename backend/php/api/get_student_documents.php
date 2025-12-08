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

    $student_id = isset($_GET['student_id']) ? filter_var($_GET['student_id'], FILTER_VALIDATE_INT) : 0;

    if ($student_id <= 0) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Student ID is required.']);
        exit();
    }

    $stmt = $db->prepare("SELECT id, document_type, status, created_at as request_date, file_path as file_url FROM document_requests WHERE user_id = ? ORDER BY created_at DESC");
    $stmt->execute([$student_id]);
    $documents = $stmt->fetchAll(PDO::FETCH_ASSOC);

    http_response_code(200);
    echo json_encode(['success' => true, 'message' => 'Student documents fetched successfully.', 'data' => $documents]);

} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'An error occurred: ' . $e->getMessage()]);
}

?>