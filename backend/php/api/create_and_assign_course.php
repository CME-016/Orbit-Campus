<?php
// Use the centralized bootstrap for database connection and error handling
require_once __DIR__ . '/../includes/bootstrap.php';
// Use the centralized CORS configuration
require_once __DIR__ . '/../config/cors.php';

header('Content-Type: application/json');

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405); // Method Not Allowed
    echo json_encode(['success' => false, 'message' => 'Method not allowed. Please use POST.']);
    exit();
}

$db = null; // Initialize db to null to ensure it's available in catch blocks

try {
    // Get the singleton database connection instance
    $db = Database::getInstance()->getConnection();

    // Get the raw POST data
    $data = json_decode(file_get_contents("php://input"));

    // Validate incoming data
    if (!isset($data->teacherId) || !isset($data->courseCode) || !isset($data->courseName) || !isset($data->department)) {
        http_response_code(400); // Bad Request
        echo json_encode(['success' => false, 'message' => 'Incomplete data. Required fields: teacherId, courseCode, courseName, department.']);
        exit();
    }

    // Sanitize and assign variables
    $teacher_id = filter_var($data->teacherId, FILTER_VALIDATE_INT);
    $course_code = htmlspecialchars(strip_tags($data->courseCode));
    $course_name = htmlspecialchars(strip_tags($data->courseName));
    $department = htmlspecialchars(strip_tags($data->department));

    if (!$teacher_id || empty($course_code) || empty($course_name)) {
        http_response_code(400); // Bad Request
        echo json_encode(['success' => false, 'message' => 'Invalid or empty data provided.']);
        exit();
    }

    // Begin transaction for this atomic operation
    $db->beginTransaction();

    // 1. Verify the user is a teacher
    $stmt_check_teacher = $db->prepare("SELECT id FROM users WHERE id = ? AND role = 'teacher'");
    $stmt_check_teacher->execute([$teacher_id]);
    if ($stmt_check_teacher->rowCount() == 0) {
        throw new Exception("Invalid teacher ID or the specified user is not a teacher.");
    }

    // 2. Create the new course
    $stmt_create_course = $db->prepare("INSERT INTO courses (course_code, course_name, department) VALUES (?, ?, ?)");
    $stmt_create_course->execute([$course_code, $course_name, $department]);
    $course_id = $db->lastInsertId();

    // 3. Assign the course to the teacher
    $stmt_assign_course = $db->prepare("INSERT INTO teacher_courses (teacher_id, course_id) VALUES (?, ?)");
    $stmt_assign_course->execute([$teacher_id, $course_id]);
    
    // If all steps are successful, commit the transaction
    $db->commit();
    
    http_response_code(201); // Created
    echo json_encode([
        'success' => true,
        'message' => 'Course created and assigned successfully.',
        'course_id' => $course_id
    ]);

} catch (PDOException $e) {
    if ($db && $db->inTransaction()) {
        $db->rollBack();
    }
    if ($e->getCode() == '23000') { // SQLSTATE for duplicate entry
        http_response_code(409); // Conflict
        echo json_encode(['success' => false, 'message' => "A course with the code '{$course_code}' already exists."]);
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Database error during transaction.', 'error' => $e->getMessage()]);
    }

} catch (Throwable $e) {
    if ($db && $db->inTransaction()) {
        $db->rollBack();
    }
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'A server error occurred.', 'error' => $e->getMessage()]);
}
?>