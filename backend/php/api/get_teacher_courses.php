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

try {
    // Get the teacher ID from the query string
    $teacher_id = isset($_GET['teacher_id']) ? filter_var($_GET['teacher_id'], FILTER_VALIDATE_INT) : null;

    if ($teacher_id === null || $teacher_id === false) {
        http_response_code(400); // Bad Request
        echo json_encode(['success' => false, 'message' => 'A valid teacher_id is required.']);
        exit;
    }

    $db = Database::getInstance()->getConnection();

    // Fetch the courses assigned to the teacher
    $query = "
        SELECT c.id, c.course_code, c.course_name
        FROM courses c
        JOIN teacher_courses tc ON c.id = tc.course_id
        JOIN users u ON tc.teacher_id = u.id
        WHERE tc.teacher_id = :teacher_id AND u.role = 'teacher'
    ";

    $stmt = $db->prepare($query);
    $stmt->bindParam(':teacher_id', $teacher_id, PDO::PARAM_INT);

    $stmt->execute();
    
    $courses = $stmt->fetchAll(PDO::FETCH_ASSOC);

    http_response_code(200);
    echo json_encode([
        'success' => true, 
        'message' => 'Teacher courses fetched successfully.',
        'data' => $courses
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'A database error occurred while fetching teacher courses.',
        'error' => $e->getMessage() // For development purposes
    ]);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'A server error occurred.',
        'error' => $e->getMessage() // For development purposes
    ]);
}
?>