<?php
// Use the centralized bootstrap and CORS configuration
require_once __DIR__ . '/../includes/bootstrap.php';
require_once __DIR__ . '/../config/cors.php';

// Set content type to JSON
header('Content-Type: application/json');

// Check for POST request method
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405); // Method Not Allowed
    echo json_encode(['success' => false, 'message' => 'Method not allowed. Please use POST.']);
    exit();
}

try {
    $conn = Database::getInstance()->getConnection();

    $data = json_decode(file_get_contents("php://input"));

    if (empty($data->email) || empty($data->password)) {
        http_response_code(400); // Bad Request
        echo json_encode(['success' => false, 'message' => 'Incomplete data. Please provide both email and password.']);
        exit();
    }

    $stmt = $conn->prepare("SELECT id, name, email, role, password FROM users WHERE email = :email");
    $stmt->bindParam(':email', $data->email);
    $stmt->execute();

    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($data->password, $user['password'])) {
        // Password is correct, login successful
        unset($user['password']); // Do not send password hash to client

        http_response_code(200);
        echo json_encode([
            'success' => true,
            'message' => 'Login successful.',
            'data' => $user
        ]);
    } else {
        // Invalid credentials
        http_response_code(401); // Unauthorized
        echo json_encode(['success' => false, 'message' => 'Invalid email or password.']);
    }
} catch (Throwable $e) {
    // Catch any other errors and return a generic server error response
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'message' => 'A server error occurred during login.',
        'error' => $e->getMessage() // Included for development debugging
    ]);
}
?>