<?php
require_once __DIR__ . '/../../includes/bootstrap.php';
require_once __DIR__ . '/../../config/cors.php';

header('Content-Type: application/json');

if (!isset($_GET['teacher_id'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Teacher ID is required.']);
    exit();
}

try {
    $db = Database::getInstance()->getConnection();
    $teacher_id = $_GET['teacher_id'];

    // Corrected SQL Query:
    // This query now correctly joins the 'users' table (where students' assigned semester is stored)
    // with the 'class_teacher_assignments' table to find students assigned to the teacher's semester.
    $sql = "
        SELECT 
            u.id, 
            u.name,
            u.semester_id
        FROM users u
        JOIN class_teacher_assignments cta ON u.semester_id = cta.semester_id
        WHERE cta.teacher_id = :teacher_id AND u.role = 'student'
        ORDER BY u.name ASC
    ";

    $stmt = $db->prepare($sql);
    $stmt->bindParam(':teacher_id', $teacher_id, PDO::PARAM_INT);
    $stmt->execute();

    $students = $stmt->fetchAll(PDO::FETCH_ASSOC);

    http_response_code(200);
    echo json_encode([
        'success' => true,
        'data' => $students
    ]);

} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'message' => 'An error occurred while fetching assigned students.',
        'error' => $e->getMessage()
    ]);
}
?>
