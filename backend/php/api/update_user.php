<?php
// Use the centralized bootstrap for database connection and error handling
require_once __DIR__ . '/../includes/bootstrap.php';
// Use the centralized CORS configuration
require_once __DIR__ . '/../config/cors.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405); // Method Not Allowed
    echo json_encode(['success' => false, 'message' => 'Method not allowed. Please use POST.']);
    exit();
}

try {
    // Get the singleton database connection
    $conn = Database::getInstance()->getConnection();

    // Get the raw POST data
    $data = json_decode(file_get_contents("php://input"));

    // Validate that the mandatory fields are present
    if (
        !empty($data->id) &&
        !empty($data->name) &&
        !empty($data->email)
    ) {
        // Sanitize the mandatory fields
        $id = filter_var($data->id, FILTER_VALIDATE_INT);
        $name = htmlspecialchars(strip_tags($data->name));
        $email = filter_var($data->email, FILTER_VALIDATE_EMAIL);

        if (!$id || !$email) {
            throw new InvalidArgumentException('Invalid user ID or email format provided.');
        }

        // Sanitize the optional fields, defaulting to an empty string if they are not provided
        $phone = isset($data->phone) ? htmlspecialchars(strip_tags($data->phone)) : '';
        $address = isset($data->address) ? htmlspecialchars(strip_tags($data->address)) : '';
        $department = isset($data->department) ? htmlspecialchars(strip_tags($data->department)) : '';
        $bio = isset($data->bio) ? htmlspecialchars(strip_tags($data->bio)) : '';

        // Prepare the comprehensive update statement for all profile fields
        $stmt = $conn->prepare(
            "UPDATE users SET 
                name = ?, 
                email = ?, 
                phone = ?, 
                address = ?, 
                department = ?, 
                bio = ? 
             WHERE id = ?"
        );
        
        // An array of all parameters to be passed to the execute function
        $params = [$name, $email, $phone, $address, $department, $bio, $id];

        // Execute the query with all parameters
        if ($stmt->execute($params)) {
             if ($stmt->rowCount() > 0) {
                http_response_code(200); // OK
                echo json_encode(['success' => true, 'message' => 'Profile was successfully updated.']);
            } else {
                http_response_code(200); // OK, but nothing changed
                echo json_encode(['success' => true, 'message' => 'No changes were made to the profile.']);
            }
        } else {
            http_response_code(503); // Service Unavailable
            echo json_encode(['success' => false, 'message' => 'Unable to update profile in the database.']);
        }
    } else {
        // This error now only triggers if ID, Name, or Email is missing.
        http_response_code(400); // Bad Request
        echo json_encode(['success' => false, 'message' => 'Unable to update profile. ID, Name, and Email are required.']);
    }
} catch (InvalidArgumentException $e) {
    http_response_code(400); // Bad Request
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
} catch (Throwable $e) {
    // Catch any other exceptions and return a generic server error
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'A server error occurred while updating the profile.',
        'error' => $e->getMessage() // For development debugging
    ]);
}
?>
