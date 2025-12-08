<?php
// Use the centralized bootstrap for database connection and error handling
require_once __DIR__ . '/../includes/bootstrap.php';
// Use the centralized CORS configuration
require_once __DIR__ . '/../config/cors.php';

header('Content-Type: application/json; charset=UTF-8');

// This script is for a specific administrative action, so we'll restrict it to POST.
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405); // Method Not Allowed
    echo json_encode(['success' => false, 'message' => 'Method not allowed. Please use POST.']);
    exit();
}

// --- Configuration for the Fee Generation ---
// This description will be used to check for existing records and to create new ones.
$description = 'Annual Fee 2023-2024';
$total_amount = 4800.00; // The standard total fee amount
$due_date = '2024-08-31';   // The standard due date

$db = null; // Ensure $db is in scope for the catch block

try {
    // Get the singleton database connection instance
    $db = Database::getInstance()->getConnection();

    // Start transaction for atomic operation
    $db->beginTransaction();

    // 1. Get all users who are registered as 'student'
    $student_query = "SELECT id FROM users WHERE role = 'student'";
    $student_stmt = $db->query($student_query); // query() is fine for a query with no params
    $students = $student_stmt->fetchAll(PDO::FETCH_ASSOC);

    $records_created = 0;
    $records_skipped = 0;

    // 2. Prepare statements for reuse inside the loop for efficiency
    $check_query = "SELECT id FROM fee_details WHERE student_id = ? AND description = ?";
    $check_stmt = $db->prepare($check_query);

    $insert_query = "INSERT INTO fee_details (student_id, description, total_amount, paid_amount, due_date, status) VALUES (?, ?, ?, 0.00, ?, 'Unpaid')";
    $insert_stmt = $db->prepare($insert_query);

    // 3. Loop through each student to generate fee records
    foreach ($students as $student) {
        $student_id = $student['id'];

        // Check if a fee record with the same description already exists for this student
        $check_stmt->execute([$student_id, $description]);
        
        if ($check_stmt->fetch() === false) {
            // If no record exists, create a new one
            $insert_stmt->execute([$student_id, $description, $total_amount, $due_date]);
            $records_created++;
        } else {
            // If a record already exists, skip it to prevent duplicates
            $records_skipped++;
        }
    }

    // If the loop completes without errors, commit the transaction
    $db->commit();

    http_response_code(200); // OK
    echo json_encode([
        "success" => true,
        "message" => "Fee record generation process completed.",
        "data" => [
            "new_records_created" => $records_created,
            "records_skipped_as_existing" => $records_skipped
        ]
    ]);

} catch (Throwable $e) {
    // If an error occurs, roll back the entire transaction
    if ($db && $db->inTransaction()) {
        $db->rollBack();
    }
    http_response_code(500); // Internal Server Error
    echo json_encode([
        "success" => false,
        "message" => "An error occurred while generating fee records.",
        "error" => $e->getMessage()
    ]);
}
?>