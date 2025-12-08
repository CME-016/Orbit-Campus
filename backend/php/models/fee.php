<?php
class Fee {
    private $conn;
    private $table_name = "fee_details";

    public $id;
    public $student_id;
    public $description;
    public $total_amount;
    public $paid_amount;
    public $due_date;
    public $status;

    public function __construct($db) {
        $this->conn = $db;
    }

    // Get fee details for a specific student
    function getByStudent($student_id) {
        $query = "SELECT * FROM " . $this->table_name . " WHERE student_id = ? ORDER BY due_date DESC";

        $stmt = $this->conn->prepare($query);
        
        // sanitize
        $student_id = htmlspecialchars(strip_tags($student_id));

        $stmt->bindParam(1, $student_id);
        $stmt->execute();

        return $stmt;
    }
}
?>