<?php
class Document {
    private $conn;
    private $table_name = "documents";

    public $id;
    public $student_id;
    public $document_type;
    public $status;
    public $request_date;
    public $file_url;

    public function __construct($db) {
        $this->conn = $db;
    }

    // Get documents for a specific student
    function getByStudent($student_id) {
        $query = "SELECT * FROM " . $this->table_name . " WHERE student_id = ? ORDER BY request_date DESC";

        $stmt = $this->conn->prepare($query);
        
        // sanitize
        $student_id = htmlspecialchars(strip_tags($student_id));

        $stmt->bindParam(1, $student_id);
        $stmt->execute();

        return $stmt;
    }
}
?>