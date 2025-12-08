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
    $db = Database::getInstance()->getConnection();

    // SQL query to fetch users with the 'teacher' role
    $sql = "SELECT id, name, email, role FROM users WHERE role = :role";

    $stmt = $db->prepare($sql);

    // Bind the role parameter
    $role = 'teacher';
    $stmt->bindParam(':role', $role, PDO::PARAM_STR);

    // Execute the query
    $stmt->execute();

    $teachers = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Send the response
    http_response_code(200);
    echo json_encode(['success' => true, 'message' => 'Teachers fetched successfully.', 'data' => $teachers]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'A database error occurred while fetching teachers.',
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