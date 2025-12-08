
<?php
// Includes the database connection and CORS headers
require_once __DIR__ . '/../includes/bootstrap.php';

// Set the content type for the response
header('Content-Type: application/json; charset=UTF-8');

// --- Get Database Connection ---
try {
    $db = Database::getInstance()->getConnection();
} catch (Exception $e) {
    http_response_code(503); // Service Unavailable
    echo json_encode(["message" => "Database connection failed."]);
    exit;
}

// --- Handle the Request Method ---
$request_method = $_SERVER["REQUEST_METHOD"];

switch ($request_method) {
    case 'GET':
        handleGet($db);
        break;
    case 'POST':
        handlePost($db);
        break;
    case 'DELETE':
        handleDelete($db);
        break;
    default:
        http_response_code(405); // Method Not Allowed
        echo json_encode(["message" => "Invalid request method."]);
        break;
}

/**
 * Handles GET requests to fetch courses assigned to a teacher.
 */
function handleGet($db) {
    if (empty($_GET['teacher_id'])) {
        http_response_code(400);
        echo json_encode(["message" => "teacher_id parameter is required."]);
        return;
    }

    $teacher_id = filter_var($_GET['teacher_id'], FILTER_VALIDATE_INT);
    if ($teacher_id === false) {
        http_response_code(400);
        echo json_encode(["message" => "Invalid teacher_id format. It must be an integer."]);
        return;
    }

    try {
        $sql = "SELECT c.id, c.course_code, c.course_name FROM courses c JOIN teacher_courses tc ON c.id = tc.course_id WHERE tc.teacher_id = :teacher_id ORDER BY c.course_name";
        $stmt = $db->prepare($sql);
        $stmt->bindParam(':teacher_id', $teacher_id, PDO::PARAM_INT);
        $stmt->execute();
        
        $courses = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        http_response_code(200);
        echo json_encode($courses);

    } catch (PDOException $e) {
        http_response_code(500);
        error_log("DB error in teacher_assignments GET: " . $e->getMessage());
        echo json_encode(["message" => "A database error occurred while fetching assigned courses."]);
    }
}

/**
 * Handles POST requests to assign a course to a teacher.
 */
function handlePost($db) {
    $data = json_decode(file_get_contents("php://input"));

    if (empty($data->teacher_id) || empty($data->course_id)) {
        http_response_code(400);
        echo json_encode(["message" => "Both teacher_id and course_id are required."]);
        return;
    }

    try {
        $sql = "INSERT INTO teacher_courses (teacher_id, course_id) VALUES (:teacher_id, :course_id)";
        $stmt = $db->prepare($sql);
        $stmt->bindParam(':teacher_id', $data->teacher_id, PDO::PARAM_INT);
        $stmt->bindParam(':course_id', $data->course_id, PDO::PARAM_INT);

        if ($stmt->execute()) {
            http_response_code(201); // Created
            echo json_encode(["message" => "Course assigned successfully."]);
        } else {
            throw new Exception("Failed to execute the assignment query.");
        }
    } catch (PDOException $e) {
        http_response_code(500);
        // Check for duplicate entry error
        if ($e->getCode() == '23000') {
             echo json_encode(["message" => "This course is already assigned to the teacher."]);
        } else {
            error_log("DB error in teacher_assignments POST: " . $e->getMessage());
            echo json_encode(["message" => "A database error occurred while assigning the course."]);
        }
    }
}

/**
 * Handles DELETE requests to un-assign a course from a teacher.
 */
function handleDelete($db) {
    $data = json_decode(file_get_contents("php://input"));

    if (empty($data->teacher_id) || empty($data->course_id)) {
        http_response_code(400);
        echo json_encode(["message" => "Both teacher_id and course_id are required."]);
        return;
    }

    try {
        $sql = "DELETE FROM teacher_courses WHERE teacher_id = :teacher_id AND course_id = :course_id";
        $stmt = $db->prepare($sql);
        $stmt->bindParam(':teacher_id', $data->teacher_id, PDO::PARAM_INT);
        $stmt->bindParam(':course_id', $data->course_id, PDO::PARAM_INT);

        if ($stmt->execute()) {
            if ($stmt->rowCount() > 0) {
                http_response_code(200);
                echo json_encode(["message" => "Course un-assigned successfully."]);
            } else {
                http_response_code(404); // Not Found
                echo json_encode(["message" => "Assignment not found. No action was taken."]);
            }
        } else {
            throw new Exception("Failed to execute the un-assignment query.");
        }
    } catch (PDOException $e) {
        http_response_code(500);
        error_log("DB error in teacher_assignments DELETE: " . $e->getMessage());
        echo json_encode(["message" => "A database error occurred while un-assigning the course."]);
    }
}
?>
