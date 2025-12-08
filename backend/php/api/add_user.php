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

try {
    // Get the singleton database connection
    $conn = Database::getInstance()->getConnection();

    // Get the raw POST data
    $data = json_decode(file_get_contents("php://input"));

    // Basic validation for required fields
    if (
        !empty($data->name) &&
        !empty($data->email) &&
        !empty($data->password) &&
        !empty($data->role)
    ) {
        // Sanitize and validate inputs
        $name = htmlspecialchars(strip_tags($data->name));
        $email = filter_var($data->email, FILTER_VALIDATE_EMAIL);
        $password = $data->password; // No hashing here, see below
        $role = htmlspecialchars(strip_tags($data->role));

        if (!$email) {
            throw new InvalidArgumentException('Invalid email address provided.');
        }

        // Hash the password
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);

        // Prepare and execute the insert statement
        $stmt = $conn->prepare("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)");
        
        if ($stmt->execute([$name, $email, $hashed_password, $role])) {
            http_response_code(201); // Created
            echo json_encode(['success' => true, 'message' => 'User was successfully created.']);
        } else {
            http_response_code(503); // Service Unavailable
            echo json_encode(['success' => false, 'message' => 'Unable to create user.']);
        }
    } else {
        // Data is incomplete
        http_response_code(400); // Bad Request
        echo json_encode(['success' => false, 'message' => 'Unable to create user. Required data is incomplete.']);
    }
} catch (InvalidArgumentException $e) {
    http_response_code(400); // Bad Request
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
} catch (PDOException $e) {
    // Check for duplicate entry
    if ($e->errorInfo[1] == 1062) {
        http_response_code(409); // Conflict
        echo json_encode(['success' => false, 'message' => 'This email address is already registered.']);
    } else {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'A database error occurred while creating the user.',
            'error' => $e->getMessage() // For development debugging
        ]);
    }
} catch (Throwable $e) {
    // Catch any other exceptions and return a generic server error
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'A server error occurred while creating the user.',
        'error' => $e->getMessage() // For development debugging
    ]);
}
?>