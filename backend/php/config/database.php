<?php
class Database {
    private static $instance = null;
    private $conn;

    private $host = "localhost";
    private $db_name = "campus_sphere";
    private $username = "root";
    private $password = "";

    // The constructor is private so it can't be instantiated directly.
    private function __construct() {
        try {
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->conn->exec("set names utf8");
        } catch(PDOException $exception) {
            // Handle connection error gracefully
            http_response_code(500);
            header('Content-Type: application/json');
            echo json_encode([
                "message" => "Database connection failed.",
                "error" => $exception->getMessage()
            ]);
            exit();
        }
    }

    // The static method that controls the access to the single instance
    public static function getInstance() {
        if (self::$instance == null) {
            self::$instance = new Database();
        }
        return self::$instance;
    }

    // Get the database connection
    public function getConnection() {
        return $this->conn;
    }

    // Prevent cloning of the instance
    private function __clone() { }

    // Prevent unserialization of the instance
    public function __wakeup() { }
}
?>