<?php
header('Content-Type: application/json');
require_once '../config.php';
require_once '../includes/db.php';
require_once '../includes/auth.php';

if (!isset($_SESSION['role_id']) || ($_SESSION['role_id'] != 1 && $_SESSION['role_id'] != 4)) {
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['error' => 'Invalid request method']);
    exit;
}

$month = $_POST['month'] ?? date('F');
$year = $_POST['year'] ?? date('Y');

try {
    $pdo->beginTransaction();

    // Fetch all active staff with a base salary > 0
    $stmt = $pdo->query("SELECT id, base_salary, transport_allowance, tax_percentage FROM users WHERE base_salary > 0");
    $staff = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $processed = 0;
    foreach ($staff as $emp) {
        // Check if payroll already generated for this user this month
        $checkStmt = $pdo->prepare("SELECT id FROM payroll WHERE user_id = ? AND month = ? AND year = ?");
        $checkStmt->execute([$emp['id'], $month, $year]);
        if ($checkStmt->fetch()) continue; // Skip

        $base_pay = $emp['base_salary'];
        
        // Dynamic allowances and deductions based on Salary Structure
        $allowances = ['transport' => (float)$emp['transport_allowance']];
        $deductions = ['tax' => $base_pay * ($emp['tax_percentage'] / 100)];
        $bonuses = 0;

        $net_payable = $base_pay + array_sum($allowances) - array_sum($deductions) + $bonuses;

        $insertStmt = $pdo->prepare("INSERT INTO payroll (user_id, month, year, base_pay, allowances, deductions, bonuses, net_payable) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
        $insertStmt->execute([
            $emp['id'], $month, $year, $base_pay, json_encode($allowances), json_encode($deductions), $bonuses, $net_payable
        ]);
        $processed++;
    }

    $pdo->commit();
    echo json_encode(['success' => true, 'message' => "$processed payroll records generated for $month $year"]);
} catch (Exception $e) {
    $pdo->rollBack();
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
