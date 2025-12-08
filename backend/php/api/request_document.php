<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once '../models/document_request.php';

$database = new Database();
$db = $database->getConnection();

$doc_request = new DocumentRequest($db);

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->user_id) && !empty($data->document_type)) {
    $doc_request->user_id = $data->user_id;
    $doc_request->document_type = $data->document_type;

    if ($doc_request->create()) {
        http_response_code(201);
        echo json_encode(array("success" => true, "message" => "Document request was created."));
    } else {
        http_response_code(503);
        echo json_encode(array("success" => false, "message" => "Unable to create document request."));
    }
} else {
    http_response_code(400);
    echo json_encode(array("success" => false, "message" => "Unable to create document request. Data is incomplete."));
}
?>