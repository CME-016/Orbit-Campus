
<?php
// Includes the database connection and CORS headers
require_once __DIR__ . '/../includes/bootstrap.php';

// Set the content type for the response
header('Content-Type: application/json; charset=UTF-8');

// --- Request Method Validation ---
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405); // Method Not Allowed
    echo json_encode(["message" => "Invalid request method. Only POST is allowed."]);
    exit;
}

// --- Get and Decode the Input ---
$data = json_decode(file_get_contents("php://input"));

// --- Input Validation ---
if (empty($data->id)) {
    http_response_code(400); // Bad Request
    echo json_encode(["message" => "Teacher ID is required."]);
    exit;
}

if (empty($data->name) && empty($data->email) && !isset($data->bio)) {
    http_response_code(400); // Bad Request
    echo json_encode(["message" => "At least one field (name, email, or bio) must be provided to update."]);
    exit;
}

try {
    // --- Get PDO Database Connection ---
    $db = Database::getInstance()->getConnection();

    // --- Dynamically Build the SQL Query ---
    $query_parts = [];
    $params = [];

    if (!empty($data->name)) {
        $query_parts[] = "name = :name";
        $params[':name'] = htmlspecialchars(strip_tags($data->name));
    }

    if (!empty($data->email)) {
        if (filter_var($data->email, FILTER_VALIDATE_EMAIL)) {
            $query_parts[] = "email = :email";
            $params[':email'] = $data->email;
        } else {
            http_response_code(400);
            echo json_encode(["message" => "Invalid email format."]);
            exit;
        }
    }

    if (isset($data->bio)) {
        $query_parts[] = "bio = :bio";
        $params[':bio'] = htmlspecialchars(strip_tags($data->bio));
    }

    $sql = "UPDATE users SET " . implode(", ", $query_parts) . " WHERE id = :id";
    $params[':id'] = $data->id;

    // --- Prepare and Execute the Statement ---
    $stmt = $db->prepare($sql);
    if ($stmt->execute($params)) {
        // Check if any row was actually updated
        if ($stmt->rowCount() > 0) {
            http_response_code(200); // OK
            echo json_encode(["message" => "Teacher updated successfully."]);
        } else {
            http_response_code(200); // OK
            echo json_encode(["message" => "No changes were made to the teacher record."]);
        }
    } else {
        throw new Exception("Unable to execute the update statement.");
    }

} catch (PDOException $e) {
    http_response_code(503); // Service Unavailable (Database Error)
    error_log("Database error in update_teacher.php: " . $e->getMessage());
    echo json_encode(["message" => "Database error occurred during the update."]);
} catch (Exception $e) {
    http_response_code(500); // Internal Server Error
    error_log("General error in update_teacher.php: " . $e->getMessage());
    echo json_encode(["message" => $e->getMessage()]);
}
?>
