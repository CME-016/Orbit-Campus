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
    !empty($data->title) &&
    !empty($data->start) &&
    !empty($data->end) &&
    !empty($data->type)
) {
    $query = "INSERT INTO calendar_events (title, start, end, type, description) VALUES (?, ?, ?, ?, ?)";

    $stmt = $db->prepare($query);

    // sanitize
    $title = htmlspecialchars(strip_tags($data->title));
    $start = htmlspecialchars(strip_tags($data->start));
    $end = htmlspecialchars(strip_tags($data->end));
    $type = htmlspecialchars(strip_tags($data->type));
    $description = htmlspecialchars(strip_tags($data->description));

    // bind values
    $stmt->bind_param("sssss", $title, $start, $end, $type, $description);

    if($stmt->execute()){
        http_response_code(201);
        $id = $db->insert_id;
        echo json_encode(array("success" => true, "message" => "Event was created.", "id" => $id));
    } else {
        http_response_code(503);
        echo json_encode(array("success" => false, "message" => "Unable to create event.", "error" => $stmt->error));
    }
} else {
    http_response_code(400);
    echo json_encode(array("success" => false, "message" => "Unable to create event. Data is incomplete."));
}
?>