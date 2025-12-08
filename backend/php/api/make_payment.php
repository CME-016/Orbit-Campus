<?php
// Centralized bootstrap for database connection and error handling
require_once __DIR__ . '/../includes/bootstrap.php';
// Centralized CORS configuration
require_once __DIR__ . '/../config/cors.php';

header('Content-Type: application/json');

try {
    // Get the database connection from our Singleton class
    $db = Database::getInstance()->getConnection();

    // Get the posted data
    $data = json_decode(file_get_contents('php://input'), true);

    // Validate the input data
    if (empty($data['fee_id']) || empty($data['amount']) || empty($data['student_id'])) {
        throw new InvalidArgumentException('Missing required fields: fee_id, amount, and student_id.');
    }

    // Sanitize and validate data types
    $fee_id = filter_var($data['fee_id'], FILTER_VALIDATE_INT);
    $amount = filter_var($data['amount'], FILTER_VALIDATE_FLOAT);
    $student_id = filter_var($data['student_id'], FILTER_VALIDATE_INT);

    if ($fee_id === false || $amount === false || $student_id === false || $amount <= 0) {
        throw new InvalidArgumentException('Invalid data provided. Please check the values for fee_id, amount, and student_id.');
    }

    // Prepare the SQL statement to update the paid amount in the fee_records table
    $stmt = $db->prepare(
        "UPDATE fee_records SET paid_amount = paid_amount + ? WHERE id = ? AND student_id = ?"
    );
    
    // Execute the statement with the provided data
    $stmt->execute([$amount, $fee_id, $student_id]);

    // Check if the update was successful
    if ($stmt->rowCount() > 0) {
        echo json_encode(['success' => true, 'message' => 'Payment was successfully recorded.']);
    } else {
        http_response_code(404); // Not Found
        echo json_encode(['success' => false, 'message' => 'Payment failed. The specified fee record was not found for the student.']);
    }

} catch (InvalidArgumentException $e) {
    http_response_code(400); // Bad Request
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
} catch (Throwable $e) {
    http_response_code(500); // Internal Server Error
    echo json_encode([
        'success' => false, 
        'message' => 'A server error occurred while processing the payment.',
        'error' => $e->getMessage() // For development purposes
    ]);
}
?>