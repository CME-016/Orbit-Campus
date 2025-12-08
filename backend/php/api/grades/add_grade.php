<?php
require_once '../includes/bootstrap.php';

header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

$required_fields = ['student_id', 'course_id', 'semester'];

foreach ($required_fields as $field) {
    if (empty($data[$field])) {
        http_response_code(400);
        echo json_encode(['message' => "$field is required"]);
        exit;
    }
}

$student_id = $data['student_id'];
$course_id = $data['course_id'];
$semester = $data['semester'];
$unit1_marks = $data['unit1_marks'] ?? null;
$unit2_marks = $data['unit2_marks'] ?? null;
$unit3_marks = $data['unit3_marks'] ?? null;
$lab_internal1_marks = $data['lab_internal1_marks'] ?? null;
$lab_internal2_marks = $data['lab_internal2_marks'] ?? null;
$external_lab_marks = $data['external_lab_marks'] ?? null;
$semester_exam_marks = $data['semester_exam_marks'] ?? null;

$total_marks = ($unit1_marks ?? 0) + ($unit2_marks ?? 0) + ($unit3_marks ?? 0) + ($lab_internal1_marks ?? 0) + ($lab_internal2_marks ?? 0) + ($external_lab_marks ?? 0) + ($semester_exam_marks ?? 0);

// Calculate Grade (example logic)
if ($total_marks >= 90) {
    $grade = 'A';
} elseif ($total_marks >= 80) {
    $grade = 'B';
} elseif ($total_marks >= 70) {
    $grade = 'C';
} elseif ($total_marks >= 60) {
    $grade = 'D';
} else {
    $grade = 'F';
}

$sql = "INSERT INTO grades (student_id, course_id, semester, unit1_marks, unit2_marks, unit3_marks, lab_internal1_marks, lab_internal2_marks, external_lab_marks, semester_exam_marks, total_marks, grade) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

$stmt = $pdo->prepare($sql);

if ($stmt->execute([$student_id, $course_id, $semester, $unit1_marks, $unit2_marks, $unit3_marks, $lab_internal1_marks, $lab_internal2_marks, $external_lab_marks, $semester_exam_marks, $total_marks, $grade])) {
    http_response_code(201);
    echo json_encode(['message' => 'Grade added successfully']);
} else {
    http_response_code(500);
    echo json_encode(['message' => 'Failed to add grade']);
}
