<?php
require_once __DIR__ . '/../includes/bootstrap.php';
require_once __DIR__ . '/../config/cors.php';

header('Content-Type: application/json');

try {
    $conn = Database::getInstance()->getConnection();

    $query = "SELECT 
                psm.parent_id, 
                psm.student_id, 
                parent.name AS parent_name, 
                parent.email AS parent_email, 
                student.name AS student_name, 
                student.email AS student_email
              FROM 
                parent_student_mapping psm
              JOIN 
                users parent ON psm.parent_id = parent.id
              JOIN 
                users student ON psm.student_id = student.id
              WHERE 
                parent.role = 'parent' AND student.role = 'student'
              ORDER BY 
                parent.name, student.name";

    $stmt = $conn->prepare($query);
    $stmt->execute();

    $num = $stmt->rowCount();

    if ($num > 0) {
        $links_arr = array();
        $links_arr["records"] = array();

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            extract($row);
            $link_item = array(
                "parent_id" => $parent_id,
                "student_id" => $student_id,
                "parent_name" => $parent_name,
                "parent_email" => $parent_email,
                "student_name" => $student_name,
                "student_email" => $student_email
            );
            array_push($links_arr["records"], $link_item);
        }

        http_response_code(200);
        echo json_encode($links_arr);
    } else {
        http_response_code(200); // OK, but no records
        echo json_encode(array("records" => [])); // Return empty array
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(array("message" => "Internal Server Error: " . $e->getMessage()));
}
?>