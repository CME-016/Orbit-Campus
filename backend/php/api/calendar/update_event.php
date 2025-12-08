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

if (
    !empty($data->id) &&
    !empty($data->title) &&
    !empty($data->start) &&
    !empty($data->end) &&
    !empty($data->type)
) {
    $query = "UPDATE calendar_events SET title = ?, start = ?, end = ?, type = ?, description = ? WHERE id = ?";

    $stmt = $db->prepare($query);

    // sanitize
    $id = htmlspecialchars(strip_tags($data->id));
    $title = htmlspecialchars(strip_tags($data->title));
    $start = htmlspecialchars(strip_tags($data->start));
    $end = htmlspecialchars(strip_tags($data->end));
    $type = htmlspecialchars(strip_tags($data->type));
    $description = htmlspecialchars(strip_tags($data->description));

    // bind values
    $stmt->bind_param("sssssi", $title, $start, $end, $type, $description, $id);

    if($stmt->execute()){
        http_response_code(200);
        echo json_encode(array("success" => true, "message" => "Event was updated."));
    } else {
        http_response_code(503);
        echo json_encode(array("success" => false, "message" => "Unable to update event.", "error" => $stmt->error));
    }
} else {
    http_response_code(400);
    echo json_encode(array("success" => false, "message" => "Unable to update event. Data is incomplete."));
}
?>