<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

include_once '../../config/database.php';

$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->id)) {
    $query = "DELETE FROM calendar_events WHERE id = ?";

    $stmt = $db->prepare($query);

    $id = htmlspecialchars(strip_tags($data->id));

    $stmt->bind_param("i", $id);

    if($stmt->execute()){
        http_response_code(200);
        echo json_encode(array("success" => true, "message" => "Event was deleted."));
    } else {
        http_response_code(503);
        echo json_encode(array("success" => false, "message" => "Unable to delete event.", "error" => $stmt->error));
    }
} else {
    http_response_code(400);
    echo json_encode(array("success" => false, "message" => "Unable to delete event. No ID provided."));
}
?>