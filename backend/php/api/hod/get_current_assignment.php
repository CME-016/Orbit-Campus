<?php
require_once __DIR__ . '/../../includes/bootstrap.php';
require_once __DIR__ . '/../../config/cors.php';

header('Content-Type: application/json');

if (!isset($_GET['semester_id'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Semester ID is required.']);
    exit();
}

$semester_id = $_GET['semester_id'];

try {
    $db = Database::getInstance()->getConnection();

    $sql = "
        SELECT u.name AS teacher_name
        FROM class_teacher_assignments cta
        JOIN users u ON cta.teacher_id = u.id
        WHERE cta.semester_id = :semester_id
    ";

    $stmt = $db->prepare($sql);
    $stmt->bindParam(':semester_id', $semester_id, PDO::PARAM_INT);
    $stmt->execute();

    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($result) {
        echo json_encode([
            'success' => true,
            'data' => $result
        ]);
    } else {
        echo json_encode([
            'success' => true,
            'data' => null // No assignment found
        ]);
    }

} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'message' => 'An error occurred while fetching the assignment.',
        'error' => $e->getMessage()
    ]);
}
?>
