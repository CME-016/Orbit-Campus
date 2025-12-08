<?php
require_once __DIR__ . '/../../includes/bootstrap.php';
require_once __DIR__ . '/../../config/cors.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed.']);
    exit();
}

$input = json_decode(file_get_contents('php://input'), true);

// Basic validation
if (!isset($input['teacher_id'], $input['student_id'], $input['semester_id'], $input['marks'], $input['feedback'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Missing required fields.']);
    exit();
}

try {
    $db = Database::getInstance()->getConnection();

    $teacher_id = $input['teacher_id'];
    $student_id = $input['student_id'];
    $semester_id = $input['semester_id'];
    $marks = $input['marks'];
    $feedback = $input['feedback'];

    // UPSERT Logic: Check if a grade already exists
    // A more specific key would be student_id + subject_id, but we use semester_id for this simplified model.
    $sql_check = "SELECT id FROM student_grades WHERE student_id = :student_id AND semester_id = :semester_id";
    $stmt_check = $db->prepare($sql_check);
    $stmt_check->bindParam(':student_id', $student_id, PDO::PARAM_INT);
    $stmt_check->bindParam(':semester_id', $semester_id, PDO::PARAM_INT);
    $stmt_check->execute();

    if ($stmt_check->fetch()) {
        // Update existing record
        $sql = "UPDATE student_grades SET marks = :marks, feedback = :feedback, teacher_id = :teacher_id, updated_at = NOW() WHERE student_id = :student_id AND semester_id = :semester_id";
        $message = 'Grades updated successfully.';
    } else {
        // Insert new record
        $sql = "INSERT INTO student_grades (student_id, semester_id, teacher_id, marks, feedback) VALUES (:student_id, :semester_id, :teacher_id, :marks, :feedback)";
        $message = 'Grades submitted successfully.';
    }

    $stmt = $db->prepare($sql);
    $stmt->bindParam(':student_id', $student_id, PDO::PARAM_INT);
    $stmt->bindParam(':semester_id', $semester_id, PDO::PARAM_INT);
    $stmt->bindParam(':teacher_id', $teacher_id, PDO::PARAM_INT);
    $stmt->bindParam(':marks', $marks);
    $stmt->bindParam(':feedback', $feedback);
    $stmt->execute();

    http_response_code(200);
    echo json_encode(['success' => true, 'message' => $message]);

} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'message' => 'An error occurred while submitting grades.',
        'error' => $e->getMessage()
    ]);
}
?>
