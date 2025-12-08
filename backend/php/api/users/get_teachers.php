<?php
require_once __DIR__ . '/../../includes/bootstrap.php';
require_once __DIR__ . '/../../config/cors.php';

header('Content-Type: application/json');

try {
    $db = Database::getInstance()->getConnection();

    $sql = "SELECT id, name FROM users WHERE role = 'teacher' ORDER BY name ASC";
    $stmt = $db->query($sql);
    $teachers = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        'success' => true,
        'data' => $teachers
    ]);

} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'An error occurred while fetching teachers.',
        'error' => $e->getMessage()
    ]);
}
?>
