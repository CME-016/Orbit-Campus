<?php
require_once __DIR__ . '/../includes/bootstrap.php';
require_once __DIR__ . '/../config/cors.php';

header('Content-Type: application/json');

if (!isset($_GET['parent_id'])) {
    http_response_code(400);
    echo json_encode(['message' => 'Parent ID is required.']);
    exit;
}

$parentId = $_GET['parent_id'];

try {
    $conn = Database::getInstance()->getConnection();

    // 1. Get linked student IDs for the given parent
    $stmt = $conn->prepare("
        SELECT s.id, s.name, s.email 
        FROM users s
        JOIN parent_student_mapping psm ON s.id = psm.student_id
        WHERE psm.parent_id = :parent_id AND s.role = 'student'
    ");
    $stmt->execute(['parent_id' => $parentId]);
    $students = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (empty($students)) {
        http_response_code(404);
        echo json_encode(['message' => 'No students linked to this parent.']);
        exit;
    }

    $dashboardData = [];

    // 2. For each student, fetch their performance data
    foreach ($students as $student) {
        $studentId = $student['id'];
        $studentData = [
            'id' => $student['id'],
            'name' => $student['name'],
            'email' => $student['email'],
            'performance' => [
                'grades' => [],
                'attendance' => [],
                'fees' => []
            ]
        ];

        // Fetch Grades/Marks from the correct 'marks' table
        $gradesStmt = $conn->prepare("
            SELECT 
                c.course_name,
                m.unit1,
                m.unit2,
                m.mid_term,
                m.final_exam
            FROM marks m
            JOIN courses c ON m.course_id = c.id
            WHERE m.student_id = :student_id
        ");
        $gradesStmt->execute(['student_id' => $studentId]);
        $studentData['performance']['grades'] = $gradesStmt->fetchAll(PDO::FETCH_ASSOC);

        // Fetch Attendance from the correct 'student_attendance' table
        $attendanceStmt = $conn->prepare("
            SELECT a.date, a.status, c.course_name
            FROM student_attendance a
            LEFT JOIN courses c ON a.course_id = c.id
            WHERE a.student_id = :student_id
            ORDER BY a.date DESC
        ");
        $attendanceStmt->execute(['student_id' => $studentId]);
        $studentData['performance']['attendance'] = $attendanceStmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Fetch Fee Records from the correct 'fee_details' table with the correct columns
        $feesStmt = $conn->prepare("
            SELECT fd.id, fd.description, fd.total_amount, fd.due_date, fd.status
            FROM fee_details fd
            WHERE fd.student_id = :student_id
            ORDER BY fd.due_date DESC
        ");
        $feesStmt->execute(['student_id' => $studentId]);
        $studentData['performance']['fees'] = $feesStmt->fetchAll(PDO::FETCH_ASSOC);
        
        $dashboardData[] = $studentData;
    }

    http_response_code(200);
    echo json_encode(['records' => $dashboardData]);

} catch (Exception $e) {
    http_response_code(500); // Internal Server Error
    echo json_encode([
        'message' => 'An error occurred while fetching dashboard data.',
        'error' => $e->getMessage()
    ]);
}
?>