<?php
// Use the centralized bootstrap and CORS configuration
require_once __DIR__ . '/../includes/bootstrap.php';
require_once __DIR__ . '/../config/cors.php';

header('Content-Type: application/json');

try {
    // Use the singleton Database class to get the PDO connection
    $conn = Database::getInstance()->getConnection();

    // Check if user_id is provided in the query string
    $user_id = isset($_GET['user_id']) ? (int)$_GET['user_id'] : 0;

    if ($user_id <= 0) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'User ID is required.']);
        exit();
    }

    // Prepare and execute the SQL statement using PDO
    $stmt = $conn->prepare("SELECT id, title, message, type, read_status, timestamp FROM notifications WHERE user_id = :user_id ORDER BY timestamp DESC");
    $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
    $stmt->execute();

    // Fetch all results
    $notifications = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Format the notifications
    $formatted_notifications = [];
    foreach ($notifications as $notification) {
        $notification['read'] = (bool)$notification['read_status'];
        unset($notification['read_status']); // Remove the original read_status field
        $formatted_notifications[] = $notification;
    }
    
    http_response_code(200);
    // Return notifications, which might be an empty array
    echo json_encode(['success' => true, 'data' => $formatted_notifications]);

} catch (PDOException $e) {
    // Handle database exceptions
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'A database error occurred while fetching notifications.',
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