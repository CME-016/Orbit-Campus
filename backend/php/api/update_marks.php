<?php
require_once __DIR__ . '/../includes/bootstrap.php';
require_once __DIR__ . '/../config/cors.php';

header('Content-Type: application/json');

// 1. Decode the incoming JSON data from the request body
$input = json_decode(file_get_contents('php://input'), true);

if (!isset($input['course_id']) || !isset($input['marks'])) {
    http_response_code(400); // Bad Request
    echo json_encode(['success' => false, 'message' => 'Course ID and marks are required.']);
    exit;
}

$courseId = $input['course_id'];
$marksData = $input['marks'];

try {
    $conn = Database::getInstance()->getConnection();
    $conn->beginTransaction();

    // 2. Prepare the SQL statement for inserting or updating marks.
    // This uses an ON DUPLICATE KEY UPDATE clause, which requires a UNIQUE key 
    // on the (student_id, course_id) columns in your 'marks' table.
    $stmt = $conn->prepare("
        INSERT INTO marks (student_id, course_id, unit1, unit2, mid_term, final_exam)
        VALUES (:student_id, :course_id, :unit1, :unit2, :mid_term, :final_exam)
        ON DUPLICATE KEY UPDATE
            unit1 = VALUES(unit1),
            unit2 = VALUES(unit2),
            mid_term = VALUES(mid_term),
            final_exam = VALUES(final_exam)
    ");

    // 3. Loop through each student's marks and execute the prepared statement.
    foreach ($marksData as $mark) {
        $stmt->execute([
            ':student_id' => $mark['student_id'],
            ':course_id' => $courseId,
            // Use null coalescing operator to default to null if a value isn't set
            ':unit1' => $mark['unit1'] ?? null,
            ':unit2' => $mark['unit2'] ?? null,
            ':mid_term' => $mark['mid_term'] ?? null,
            ':final_exam' => $mark['final_exam'] ?? null,
        ]);
    }

    // 4. If everything is successful, commit the transaction.
    $conn->commit();

    http_response_code(200); // OK
    echo json_encode(['success' => true, 'message' => 'Marks updated successfully.']);

} catch (Exception $e) {
    // 5. If any error occurs, roll back the transaction.
    if ($conn->inTransaction()) {
        $conn->rollBack();
    }
    
    http_response_code(500); // Internal Server Error
    echo json_encode([
        'success' => false, 
        'message' => 'An error occurred while saving marks.',
        'error' => $e->getMessage()
    ]);
}
?>