<?php
require_once __DIR__ . '/../includes/bootstrap.php';
require_once __DIR__ . '/../config/cors.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(array("message" => "Method not allowed."));
    exit();
}

$data = json_decode(file_get_contents("php://input"));

if (empty($data->parent_id) || empty($data->student_id)) {
    http_response_code(400);
    echo json_encode(array("message" => "Parent ID and Student ID are required."));
    exit();
}

try {
    $conn = Database::getInstance()->getConnection();

    // Check if the link exists before trying to delete
    $query_check = "SELECT * FROM parent_student_mapping WHERE parent_id = :parent_id AND student_id = :student_id";
    $stmt_check = $conn->prepare($query_check);
    $stmt_check->bindParam(':parent_id', $data->parent_id);
    $stmt_check->bindParam(':student_id', $data->student_id);
    $stmt_check->execute();

    if ($stmt_check->rowCount() == 0) {
        http_response_code(404); // Not Found
        echo json_encode(array("message" => "This link does not exist."));
        exit();
    }

    // Delete the link
    $query = "DELETE FROM parent_student_mapping WHERE parent_id = :parent_id AND student_id = :student_id";
    $stmt = $conn->prepare($query);

    $stmt->bindParam(':parent_id', $data->parent_id);
    $stmt->bindParam(':student_id', $data->student_id);

    if ($stmt->execute()) {
        http_response_code(200); // OK
        echo json_encode(array("message" => "Parent-student link removed successfully."));
    } else {
        http_response_code(500);
        echo json_encode(array("message" => "Unable to remove link."));
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(array("message" => "Internal Server Error: " . $e->getMessage()));
}
?>