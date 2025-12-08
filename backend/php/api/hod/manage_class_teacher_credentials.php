<?php
// This is the backend for the Manage Class Teacher Credentials page.

// --- DEBUGGING: Temporarily enable full error reporting ---
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// --- CORS HEADERS ---
if (isset($_SERVER['HTTP_ORIGIN']) && preg_match('/^https?:\/\/.*(cloudworkstations\.dev|localhost|127\.0\.0\.1)/i', $_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
}
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Private-Network: true');

// Handle preflight requests (OPTIONS)
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

// --- INCLUDES ---
// Corrected the path to go up one more directory level.
require_once __DIR__ . '/../../../includes/db_connection.php';
require_once __DIR__ . '/../../../includes/helpers.php';

// --- SCRIPT LOGIC ---
$status_code = 500;
$response_data = [];

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        $pdo = get_db_connection();

        $stmt = $pdo->query("
            SELECT DISTINCT u.id, u.name
            FROM users u
            JOIN class_teacher_assignments cta ON u.id = cta.teacher_id
            WHERE u.role = 'teacher'
            ORDER BY u.name ASC
        ");

        $teachers = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $status_code = 200;
        $response_data = [
            'success' => true, 
            'data' => $teachers ?: []
        ];
        if (!$teachers) {
            $response_data['message'] = 'No teachers have been assigned as class teachers yet.';
        }

    } catch (PDOException $e) {
        $status_code = 500;
        $response_data = ['success' => false, 'message' => 'Database Error: ' . $e->getMessage()];

    } catch (Throwable $e) {
        $status_code = 500;
        $response_data = ['success' => false, 'message' => 'General Error: ' . $e->getMessage()];
    }
}

send_json_response($response_data, $status_code);

?>
