<?php
header('Content-Type: application/json');
require_once '../config.php';
require_once '../includes/db.php';
require_once '../includes/auth.php';

if (!isset($_SESSION['role_id'])) {
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

try {
    $stmt = $pdo->query("SELECT * FROM inventory_items WHERE quantity <= low_stock_threshold ORDER BY category, item_name");
    $alerts = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode(['success' => true, 'data' => $alerts]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
