<?php
// Use the centralized bootstrap for database connection and error handling
require_once __DIR__ . '/../includes/bootstrap.php';
// Use the centralized CORS configuration
require_once __DIR__ . '/../config/cors.php';

// Set the content type to application/json
header('Content-Type: application/json');

// This endpoint should only respond to GET requests.
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405); // Method Not Allowed
    echo json_encode(['success' => false, 'message' => 'Method not allowed. Please use GET.']);
    exit();
}

try {
    // Get the singleton database connection instance
    $db = Database::getInstance()->getConnection();

    // Check if a specific user's documents are being requested
    $user_id = isset($_GET['user_id']) ? filter_var($_GET['user_id'], FILTER_VALIDATE_INT) : null;

    // Base query to fetch document requests and join with user details
    $query = "SELECT r.id, r.user_id, u.name, u.email, r.document_type, r.notes, r.admin_notes, r.status, r.file_path, r.created_at 
              FROM document_requests r 
              JOIN users u ON r.user_id = u.id";

    // Parameters array for the prepared statement
    $params = [];

    // If a specific user_id is provided, add a WHERE clause
    if ($user_id) {
        $query .= " WHERE r.user_id = ?";
        $params[] = $user_id;
    }

    // Always order by the most recent requests first
    $query .= " ORDER BY r.created_at DESC";
    
    $stmt = $db->prepare($query);
    $stmt->execute($params);

    // Fetch all records
    $records = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Send the response
    http_response_code(200);
    echo json_encode([
        'success' => true, 
        'message' => 'Document requests fetched successfully.', 
        'records' => $records
    ]);

} catch (Throwable $e) {
    // Catch any errors and return a generic server error response
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'An error occurred while fetching document requests.',
        'error' => $e->getMessage() // Included for development debugging
    ]);
}
?>