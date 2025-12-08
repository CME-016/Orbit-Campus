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

    $user_id = isset($_GET['user_id']) ? filter_var($_GET['user_id'], FILTER_VALIDATE_INT) : 0;

    if ($user_id <= 0) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'User ID is required.']);
        exit();
    }

    // Mock data for demonstration
    $dashboard_data = [
        'cgpa' => '8.4',
        'pending_fees' => '₹25,000',
        'credits_earned' => '84/120',
        'attendance' => '92%'
    ];

    http_response_code(200);
    echo json_encode(['success' => true, 'message' => 'Student dashboard data fetched successfully.', 'data' => $dashboard_data]);

} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'An error occurred: ' . $e->getMessage()]);
}

?>