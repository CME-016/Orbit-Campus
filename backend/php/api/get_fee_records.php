<?php
// Use the centralized bootstrap for database connection and error handling
require_once __DIR__ . '/../includes/bootstrap.php';
// Use the centralized CORS configuration
require_once __DIR__ . '/../config/cors.php';

header("Content-Type: application/json; charset=UTF-8");

// This endpoint should only respond to GET requests.
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405); // Method Not Allowed
    echo json_encode(['success' => false, 'message' => 'Method not allowed. Please use GET.']);
    exit();
}

// Check if a specific student's fee records are being requested
$student_id = isset($_GET['student_id']) ? filter_var($_GET['student_id'], FILTER_VALIDATE_INT) : null;

try {
    // Get the singleton database connection instance
    $db = Database::getInstance()->getConnection();

    // Base query joins fee_records with users table to get student details
    $query = "SELECT f.id, f.student_id, u.name as student_name, f.academic_year, f.total_amount, f.paid_amount, f.due_date, f.status 
              FROM fee_records f
              JOIN users u ON f.student_id = u.id";

    $params = [];

    // If a student_id is provided, add a WHERE clause to filter
    if ($student_id) {
        $query .= " WHERE f.student_id = ?";
        $params[] = $student_id;
    }

    // Order by due date for consistent results
    $query .= " ORDER BY f.due_date DESC, u.name ASC";
    
    $stmt = $db->prepare($query);
    $stmt->execute($params);

    $records = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $records_with_due = [];

    // Calculate the due amount for each record
    foreach ($records as $record) {
        $record['due_amount'] = $record['total_amount'] - $record['paid_amount'];
        $records_with_due[] = $record;
    }

    // Send successful response
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Fee records fetched successfully.',
        'records' => $records_with_due
    ]);

} catch (Throwable $e) {
    // Send detailed error response
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'A server error occurred while fetching fee records.',
        'error' => $e->getMessage()
    ]);
}
?>