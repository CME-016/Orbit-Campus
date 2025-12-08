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
    $course_id = isset($_GET['course_id']) ? filter_var($_GET['course_id'], FILTER_VALIDATE_INT) : null;

    if ($course_id === null || $course_id === false) {
        http_response_code(400); // Bad Request
        echo json_encode(['success' => false, 'message' => 'A valid course_id is required.']);
        exit;
    }

    $db = Database::getInstance()->getConnection();

    // Fetch the students enrolled in the course, along with their marks.
    // This query is based on the logic of the original script, assuming a `course_id` on the `users` table
    // for students and a `marks` table.
    $query = "
        SELECT
            u.id AS student_id,
            u.name AS student_name,
            m.unit1,
            m.unit2,
            m.mid_term,
            m.final_exam
        FROM users u
        LEFT JOIN marks m ON u.id = m.student_id AND m.course_id = :course_id
        WHERE u.role = 'student' AND u.course_id = :course_id
    ";

    $stmt = $db->prepare($query);
    $stmt->bindParam(':course_id', $course_id, PDO::PARAM_INT);
    
    $stmt->execute();
    
    $students = $stmt->fetchAll(PDO::FETCH_ASSOC);

    http_response_code(200);
    echo json_encode([
        'success' => true, 
        'message' => 'Students for the course fetched successfully.',
        'data' => $students
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'A database error occurred.',
        'error' => $e->getMessage() // For development
    ]);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'A server error occurred.',
        'error' => $e->getMessage() // For development
    ]);
}
?>