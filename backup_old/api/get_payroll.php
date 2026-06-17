<?php
header('Content-Type: application/json');
require_once '../config.php';
require_once '../includes/db.php';
require_once '../includes/auth.php';

if (!isset($_SESSION['role_id']) || ($_SESSION['role_id'] != 1 && $_SESSION['role_id'] != 4 && $_SESSION['role_id'] != 2)) {
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

$month = $_GET['month'] ?? date('F');
$year = $_GET['year'] ?? date('Y');

try {
    $stmt = $pdo->prepare("SELECT p.*, u.full_name, u.department 
                           FROM payroll p 
                           JOIN users u ON p.user_id = u.id 
                           WHERE p.month = ? AND p.year = ? 
                           ORDER BY u.full_name");
    $stmt->execute([$month, $year]);
    $payroll = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Decode JSON fields for easier frontend parsing
    foreach ($payroll as &$record) {
        $record['allowances'] = json_decode($record['allowances'], true);
        $record['deductions'] = json_decode($record['deductions'], true);
    }
    
    echo json_encode(['success' => true, 'data' => $payroll]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
