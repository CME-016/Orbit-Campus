<?php
require_once '../includes/bootstrap.php';

header('Content-Type: application/json');

$student_id = $_GET['student_id'] ?? null;

if (!$student_id) {
    http_response_code(400);
    echo json_encode(['message' => 'student_id is required']);
    exit;
}

$sql = "SELECT * FROM grades WHERE student_id = ?";
$stmt = $pdo->prepare($sql);
$stmt->execute([$student_id]);

$grades = $stmt->fetchAll(PDO::FETCH_ASSOC);

if ($grades) {
    echo json_encode($grades);
} else {
    http_response_code(404);
    echo json_encode(['message' => 'No grades found for this student']);
}
