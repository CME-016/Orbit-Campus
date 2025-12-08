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

if (!isset($input['student_id']) || !isset($input['semester_id'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Student ID and Semester ID are required.']);
    exit();
}

try {
    $db = Database::getInstance()->getConnection();

    $student_id = filter_var($input['student_id'], FILTER_VALIDATE_INT);
    $semester_id = filter_var($input['semester_id'], FILTER_VALIDATE_INT);

    if (!$student_id || !$semester_id) {
        throw new InvalidArgumentException('Invalid Student ID or Semester ID format.');
    }

    $sql = "UPDATE users SET semester_id = :semester_id WHERE id = :student_id AND role = 'student'";
    $stmt = $db->prepare($sql);
    $stmt->bindParam(':semester_id', $semester_id, PDO::PARAM_INT);
    $stmt->bindParam(':student_id', $student_id, PDO::PARAM_INT);
    
    if ($stmt->execute()) {
        http_response_code(200);
        echo json_encode(['success' => true, 'message' => 'Student semester updated successfully.']);
    } else {
        throw new Exception('Failed to update student semester.');
    }

} catch (InvalidArgumentException $e) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'An error occurred during the update.',
        'error' => $e->getMessage()
    ]);
}
?>
