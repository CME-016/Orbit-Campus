<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

$db_host = 'localhost';
$db_user = 'root';
$db_pass = '';
$db_name = 'campus_sphere';

$conn = new mysqli($db_host, $db_user, $db_pass, $db_name);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$stmt = $conn->prepare("SELECT id, title, description, eligibility, amount, deadline FROM scholarships ORDER BY deadline DESC");
$stmt->execute();
$result = $stmt->get_result();

$scholarships = array();
while($row = $result->fetch_assoc()) {
    $scholarships[] = $row;
}

echo json_encode($scholarships);

$stmt->close();
$conn->close();
?>