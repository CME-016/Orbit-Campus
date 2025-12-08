<?php
// Use the centralized bootstrap and CORS configuration
require_once __DIR__ . '/../../includes/bootstrap.php';
require_once __DIR__ . '/../../config/cors.php';

header('Content-Type: application/json');

try {
    // Use the singleton Database class to get the PDO connection
    $conn = Database::getInstance()->getConnection();

    // Prepare and execute the SQL statement using PDO
    $stmt = $conn->prepare("SELECT id, title, start, end, type, description FROM calendar_events ORDER BY start ASC");
    $stmt->execute();

    // Fetch all results
    $events = $stmt->fetchAll(PDO::FETCH_ASSOC);

    http_response_code(200);
    // Return events, which might be an empty array
    echo json_encode(['success' => true, 'events' => $events]);

} catch (PDOException $e) {
    // Handle database exceptions
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'A database error occurred while fetching calendar events.',
        'error' => $e->getMessage() // For development debugging
    ]);
} catch (Throwable $e) {
    // Handle other errors
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'A server error occurred.',
        'error' => $e->getMessage() // For development debugging
    ]);
}
?>