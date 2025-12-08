<?php
// Include centralized CORS handling and bootstrap
require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../includes/bootstrap.php';

header("Content-Type: application/json; charset=UTF-8");

// Get posted data
$data = json_decode(file_get_contents("php://input"));

// Basic validation
if (!isset($data->fee_record_id) || !isset($data->amount) || !is_numeric($data->amount)) {
    http_response_code(400);
    echo json_encode(array("message" => "Invalid input. Please provide fee_record_id and a numeric amount."));
    exit();
}

$fee_record_id = (int)$data->fee_record_id;
$payment_amount = (float)$data->amount;

if ($payment_amount <= 0) {
    http_response_code(400);
    echo json_encode(array("message" => "Payment amount must be positive."));
    exit();
}

$db_obj = new Db();
$db = $db_obj->getConnection();

// Start transaction
$db->autocommit(FALSE);

try {
    // 1. Fetch the current fee record and lock the row for update
    $query = "SELECT total_amount, paid_amount FROM fee_records WHERE id = ? FOR UPDATE";
    $stmt = $db->prepare($query);
    $stmt->bind_param('i', $fee_record_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $record = $result->fetch_assoc();

    if (!$record) {
        http_response_code(404);
        echo json_encode(array("message" => "Fee record not found."));
        $db->rollback();
        $db->autocommit(TRUE);
        exit();
    }

    $total_amount = (float)$record['total_amount'];
    $current_paid_amount = (float)$record['paid_amount'];
    
    $new_paid_amount = $current_paid_amount + $payment_amount;

    // Do not allow overpayment
    if ($new_paid_amount > $total_amount) {
        http_response_code(400);
        echo json_encode(array("message" => "Payment exceeds the total amount due."));
        $db->rollback();
        $db->autocommit(TRUE);
        exit();
    }

    // 2. Determine the new status
    $new_status = 'Partially Paid';
    if ($new_paid_amount >= $total_amount) {
        $new_status = 'Paid';
    }

    // 3. Update the fee record
    $update_query = "UPDATE fee_records SET paid_amount = ?, status = ? WHERE id = ?";
    $update_stmt = $db->prepare($update_query);
    $update_stmt->bind_param('dsi', $new_paid_amount, $new_status, $fee_record_id);

    if ($update_stmt->execute()) {
        // Commit the transaction
        $db->commit();
        http_response_code(200);
        echo json_encode(array(
            "success" => true,
            "message" => "Payment processed successfully.",
            "new_paid_amount" => $new_paid_amount,
            "new_status" => $new_status
        ));
    } else {
        $db->rollback();
        http_response_code(503);
        echo json_encode(array("message" => "Unable to process payment."));
    }

} catch (Exception $e) {
    // Rollback on any exception
    $db->rollback();
    http_response_code(500);
    echo json_encode(array(
        "message" => "A server error occurred.",
        "error" => $e->getMessage()
    ));
} finally {
    // Restore autocommit mode
    if (isset($db)) {
        $db->autocommit(TRUE);
    }
}
?>