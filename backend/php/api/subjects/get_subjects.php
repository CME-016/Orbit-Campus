<?php
require_once '../includes/bootstrap.php';

header('Content-Type: application/json');

$course_id = $_GET['course_id'] ?? null;
$semester_id = $_GET['semester_id'] ?? null;

$sql = "SELECT * FROM subjects";
$params = [];

if ($course_id && $semester_id) {
    $sql .= " WHERE course_id = ? AND semester_id = ?";
    $params[] = $course_id;
    $params[] = $semester_id;
} elseif ($course_id) {
    $sql .= " WHERE course_id = ?";
    $params[] = $course_id;
} elseif ($semester_id) {
    $sql .= " WHERE semester_id = ?";
    $params[] = $semester_id;
}

$stmt = $pdo->prepare($sql);
$stmt->execute($params);

$subjects = $stmt->fetchAll(PDO::FETCH_ASSOC);

if ($subjects) {
    echo json_encode($subjects);
} else {
    http_response_code(404);
    echo json_encode(['message' => 'No subjects found']);
}
