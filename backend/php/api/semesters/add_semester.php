<?php
require_once '../includes/bootstrap.php';

header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

$semester_name = $data['semester_name'] ?? null;

if (!$semester_name) {
    http_response_code(400);
    echo json_encode(['message' => 'Semester name is required']);
    exit;
}

$sql = "INSERT INTO semesters (semester_name) VALUES (?)";
$stmt = $pdo->prepare($sql);

if ($stmt->execute([$semester_name])) {
    http_response_code(201);
    echo json_encode(['message' => 'Semester added successfully']);
} else {
    http_response_code(500);
    echo json_encode(['message' => 'Failed to add semester']);
}
