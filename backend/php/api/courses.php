<?php
// Use the centralized bootstrap for database connection and error handling
require_once __DIR__ . '/../includes/bootstrap.php';
// Use the centralized CORS configuration
require_once __DIR__ . '/../config/cors.php';

header('Content-Type: application/json');

// Main try-catch block for overall error handling
try {
    // Get the singleton database connection instance
    $db = Database::getInstance()->getConnection();
    
    // Get the HTTP request method
    $request_method = $_SERVER["REQUEST_METHOD"];

    switch ($request_method) {
        case 'GET':
            // Fetch all courses
            $stmt = $db->query("SELECT * FROM courses ORDER BY course_name ASC");
            $courses = $stmt->fetchAll(PDO::FETCH_ASSOC);
            http_response_code(200);
            echo json_encode(['success' => true, 'data' => $courses]);
            break;

        case 'POST':
            // Create a new course
            $data = json_decode(file_get_contents("php://input"));

            // Validate input data
            if (empty($data->course_code) || empty($data->course_name)) {
                http_response_code(400); // Bad Request
                echo json_encode(['success' => false, 'message' => 'course_code and course_name are required.']);
                exit();
            }

            $sql = "INSERT INTO courses (course_code, course_name, department) VALUES (?, ?, ?)";
            $stmt = $db->prepare($sql);
            
            // Execute the statement with the provided data
            $stmt->execute([
                $data->course_code,
                $data->course_name,
                $data->department ?? null // Use null if department is not provided
            ]);

            http_response_code(201); // Created
            echo json_encode(['success' => true, 'message' => 'Course was successfully created.']);
            break;

        default:
            // Handle unsupported request methods
            http_response_code(405); // Method Not Allowed
            echo json_encode(['success' => false, 'message' => 'Method not allowed.']);
            break;
    }
} catch (PDOException $e) {
    // Specifically handle database-related errors
    http_response_code(500);
    // Check for a duplicate entry error (error code 1062)
    if ($e->errorInfo[1] == 1062) {
        http_response_code(409); // Conflict
        echo json_encode(['success' => false, 'message' => 'A course with this code already exists.']);
    } else {
        echo json_encode([
            'success' => false, 
            'message' => 'A database error occurred.',
            'error' => $e->getMessage() // For development debugging
        ]);
    }
} catch (Throwable $e) {
    // Catch any other general errors
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'message' => 'A server error occurred.',
        'error' => $e->getMessage() // For development debugging
    ]);
}
?>