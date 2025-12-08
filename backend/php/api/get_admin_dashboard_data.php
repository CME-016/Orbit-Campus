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
    // Get the singleton database connection instance
    $db = Database::getInstance()->getConnection();

    // 1. Get user counts grouped by role
    $query_users = "SELECT IFNULL(NULLIF(role, ''), 'unknown') as role, COUNT(*) as count FROM users GROUP BY role";
    $stmt_users = $db->query($query_users); // query() is safe as there are no parameters
    $user_counts = $stmt_users->fetchAll(PDO::FETCH_KEY_PAIR);

    // Ensure all roles are present, even if with a zero count
    $expected_roles = ['admin', 'teacher', 'student', 'parent', 'unknown'];
    foreach ($expected_roles as $role) {
        if (!isset($user_counts[$role])) {
            $user_counts[$role] = 0;
        }
    }

    // 2. Get document request counts grouped by status
    $query_docs = "SELECT status, COUNT(*) as count FROM document_requests GROUP BY status";
    $stmt_docs = $db->query($query_docs);
    $document_counts = $stmt_docs->fetchAll(PDO::FETCH_KEY_PAIR);

    // Ensure expected statuses are present
    $expected_statuses = ['Pending', 'Approved', 'Rejected', 'Completed'];
    foreach ($expected_statuses as $status) {
        if (!isset($document_counts[$status])) {
            $document_counts[$status] = 0;
        }
    }
    
    http_response_code(200); // OK
    echo json_encode([
        'success' => true,
        'message' => 'Admin dashboard data fetched successfully.',
        'data' => [
            'user_counts' => $user_counts,
            'document_counts' => $document_counts
        ]
    ]);

} catch (Throwable $e) {
    // Catch any exceptions and return a generic server error
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'A server error occurred while fetching admin dashboard data.',
        'error' => $e->getMessage() // For development debugging
    ]);
}
?>