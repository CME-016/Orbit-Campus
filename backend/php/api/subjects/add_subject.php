<?php
require_once '../includes/bootstrap.php';

header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

$subject_name = $data['subject_name'] ?? null;
$course_id = $data['course_id'] ?? null;
$semester_id = $data['semester_id'] ?? null;

if (!$subject_name || !$course_id || !$semester_id) {
    http_response_code(400);
    echo json_encode(['message' => 'Subject name, course ID, and semester ID are required']);
    exit;
}

$sql = "INSERT INTO subjects (subject_name, course_id, semester_id) VALUES (?, ?, ?)";
$stmt = $pdo->prepare($sql);

if ($stmt->execute([$subject_name, $course_id, $semester_id])) {
    http_response_code(201);
    echo json_encode(['message' => 'Subject added successfully']);
} else {
    http_response_code(500);
    echo json_encode(['message' => 'Failed to add subject']);
}
