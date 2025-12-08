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

    if (empty($data->name) || empty($data->email) || empty($data->password) || empty($data->role)) {
        http_response_code(400); // Bad Request
        echo json_encode(['success' => false, 'message' => 'Incomplete data. Please provide name, email, password, and role.']);
        exit();
    }

    // Check if the email already exists
    $stmt = $conn->prepare("SELECT id FROM users WHERE email = :email");
    $stmt->bindParam(':email', $data->email);
    $stmt->execute();

    if ($stmt->fetch(PDO::FETCH_ASSOC)) {
        http_response_code(409); // Conflict
        echo json_encode(['success' => false, 'message' => 'An account with this email already exists.']);
        exit();
    }

    // Hash the password for storage
    $hashed_password = password_hash($data->password, PASSWORD_DEFAULT);

    $query = "INSERT INTO users (name, email, password, role) VALUES (:name, :email, :password, :role)";

    $stmt = $conn->prepare($query);
    
    $stmt->bindParam(':name', $data->name);
    $stmt->bindParam(':email', $data->email);
    $stmt->bindParam(':password', $hashed_password);
    $stmt->bindParam(':role', $data->role);

    if ($stmt->execute()) {
        http_response_code(201); // Created
        echo json_encode(['success' => true, 'message' => 'User was successfully created.']);
    } else {
        http_response_code(500); // Internal Server Error
        echo json_encode(['success' => false, 'message' => 'Unable to create user.']);
    }

} catch (Throwable $e) {
    // Catch any other errors and return a generic server error response
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'message' => 'A server error occurred during registration.',
        'error' => $e->getMessage() // Included for development debugging
    ]);
}
?>