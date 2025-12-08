<?php
require_once __DIR__ . '/../../../includes/bootstrap.php';
require_once __DIR__ . '/../../../config/cors.php';

header('Content-Type: application/json');

$input = json_decode(file_get_contents('php://input'), true);

if (!isset($input['username'], $input['password'], $input['teacher_id'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Username, password, and teacher ID are required.']);
    exit();
}

try {
    $db = Database::getInstance()->getConnection();
    $username = $input['username'];
    $password = $input['password'];
    $teacher_id = $input['teacher_id'];

    // Fetch the stored credentials for the logged-in teacher
    $sql = "SELECT * FROM class_teacher_credentials WHERE teacher_id = :teacher_id AND username = :username";
    $stmt = $db->prepare($sql);
    $stmt->bindParam(':teacher_id', $teacher_id, PDO::PARAM_INT);
    $stmt->bindParam(':username', $username, PDO::PARAM_STR);
    $stmt->execute();

    $credential = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($credential && password_verify($password, $credential['password_hash'])) {
        // Password is correct, generate a secure token.
        // In a real application, this should be a JWT (JSON Web Token).
        // For simplicity, we'll use a strong random string.
        $token = bin2hex(random_bytes(32));

        // Here you might want to store the token in a server-side session store
        // to validate subsequent requests. For this example, we return it to the client.

        http_response_code(200);
        echo json_encode([
            'success' => true, 
            'message' => 'Class Teacher login successful.',
            'token' => $token
        ]);
    } else {
        http_response_code(401);
        echo json_encode(['success' => false, 'message' => 'Invalid credentials.']);
    }

} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'message' => 'An error occurred during login.',
        'error' => $e->getMessage()
    ]);
}
?>
