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

    $student_id = isset($_GET['student_id']) ? filter_var($_GET['student_id'], FILTER_VALIDATE_INT) : null;

    if (!$student_id) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Student ID is required']);
        exit;
    }

    // Fetch all fee records for the student
    $stmt = $db->prepare("SELECT * FROM fee_details WHERE student_id = ? ORDER BY due_date DESC");
    $stmt->execute([$student_id]);
    $fee_records = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $formatted_records = [];
    if ($fee_records) {
        foreach ($fee_records as $record) {
            $paid_amount = (float)$record['paid_amount'];
            $total_amount = (float)$record['total_amount'];

            if ($paid_amount >= $total_amount) {
                $status = 'Paid';
            } elseif ($paid_amount > 0 && $paid_amount < $total_amount) {
                $status = 'Partial';
            } else {
                $status = 'Unpaid';
            }

            // The fee breakdown is static for the annual fee, but we can leave it empty for others
            $fee_breakdown = [];
            if (strpos($record['description'], 'Annual College Fee') !== false) {
                $fee_breakdown = [
                    ['name' => 'Admission Fee', 'amount' => 100.00],
                    ['name' => 'Tuition Fee 1', 'amount' => 500.00],
                    ['name' => 'Tuition Fee 2', 'amount' => 400.00],
                    ['name' => 'Tuition Fee 3', 'amount' => 100.00],
                    ['name' => 'Tuition Fee 4', 'amount' => 500.00],
                    ['name' => 'Tuition Fee 5', 'amount' => 500.00],
                    ['name' => 'GAMES', 'amount' => 100.00],
                    ['name' => 'ASSOCIATION', 'amount' => 100.00],
                    ['name' => 'COURSE WORK 1', 'amount' => 300.00],
                    ['name' => 'LABS', 'amount' => 900.00],
                    ['name' => 'LIBRARY', 'amount' => 400.00],
                    ['name' => 'SYLLABUS BOOK', 'amount' => 100.00],
                    ['name' => 'BOARD RECOGNITION FEE', 'amount' => 250.00],
                    ['name' => 'ALUMINI', 'amount' => 100.00],
                    ['name' => 'MIS 2', 'amount' => 300.00],
                    ['name' => 'TECH FEST 2', 'amount' => 50.00],
                ];
            }

            $formatted_records[] = [
                'id' => $record['id'],
                'description' => $record['description'],
                'totalAmount' => $total_amount,
                'paidAmount' => $paid_amount,
                'dueDate' => $record['due_date'],
                'status' => $status,
                'breakdown' => $fee_breakdown
            ];
        }
    }

    http_response_code(200);
    echo json_encode(['success' => true, 'message' => 'Student fees fetched successfully.', 'data' => $formatted_records]);

} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'An error occurred: ' . $e->getMessage()]);
}
?>