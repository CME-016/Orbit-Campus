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

if (!isset($input['teacher_id']) || !isset($input['semester_id'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Teacher ID and Semester ID are required.']);
    exit();
}

try {
    $db = Database::getInstance()->getConnection();

    $teacher_id = $input['teacher_id'];
    $semester_id = $input['semester_id'];

    // CORRECTED: Table name is now 'class_teacher_assignments' (plural)
    $sql_check = "SELECT * FROM class_teacher_assignments WHERE semester_id = :semester_id";
    $stmt_check = $db->prepare($sql_check);
    $stmt_check->bindParam(':semester_id', $semester_id, PDO::PARAM_INT);
    $stmt_check->execute();

    if ($stmt_check->fetch()) {
        // If a record exists, update it
        $sql_update = "UPDATE class_teacher_assignments SET teacher_id = :teacher_id WHERE semester_id = :semester_id";
        $stmt_update = $db->prepare($sql_update);
        $stmt_update->bindParam(':teacher_id', $teacher_id, PDO::PARAM_INT);
        $stmt_update->bindParam(':semester_id', $semester_id, PDO::PARAM_INT);
        $stmt_update->execute();
        $message = 'Class teacher assignment updated successfully.';
    } else {
        // If no record exists, insert a new one
        $sql_insert = "INSERT INTO class_teacher_assignments (teacher_id, semester_id) VALUES (:teacher_id, :semester_id)";
        $stmt_insert = $db->prepare($sql_insert);
        $stmt_insert->bindParam(':teacher_id', $teacher_id, PDO::PARAM_INT);
        $stmt_insert->bindParam(':semester_id', $semester_id, PDO::PARAM_INT);
        $stmt_insert->execute();
        $message = 'Class teacher assigned successfully.';
    }

    http_response_code(200);
    echo json_encode(['success' => true, 'message' => $message]);

} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'message' => 'An error occurred during the assignment.',
        'error' => $e->getMessage()
    ]);
}
?>
