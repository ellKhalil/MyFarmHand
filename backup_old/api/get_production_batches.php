<?php
header('Content-Type: application/json');
require_once '../config.php';
require_once '../includes/db.php';
require_once '../includes/auth.php';

if (!isset($_SESSION['role_id']) || ($_SESSION['role_id'] != 1 && $_SESSION['role_id'] != 2)) {
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

try {
    // Get batches with total yields
    $stmt = $pdo->query("SELECT b.*, 
                                COALESCE(SUM(l.yield_amount), 0) as total_yield,
                                MAX(l.log_date) as last_log_date
                         FROM production_batches b
                         LEFT JOIN production_logs l ON b.id = l.batch_id
                         GROUP BY b.id
                         ORDER BY b.status ASC, b.start_date DESC");
    
    $batches = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode(['success' => true, 'data' => $batches]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
