<?php
header('Content-Type: application/json');
require_once '../config.php';
require_once '../includes/db.php';
require_once '../includes/auth.php';

if (!isset($_SESSION['role_id']) || ($_SESSION['role_id'] != 1 && $_SESSION['role_id'] != 3)) {
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['error' => 'Invalid request method']);
    exit;
}

$item_name = trim($_POST['item_name'] ?? '');
$category = $_POST['category'] ?? '';
$unit = trim($_POST['unit'] ?? '');
$low_stock_threshold = (float)($_POST['low_stock_threshold'] ?? 10);
$quantity = (float)($_POST['quantity'] ?? 0);

if (empty($item_name) || empty($category) || empty($unit)) {
    echo json_encode(['success' => false, 'error' => 'Please fill all required fields.']);
    exit;
}

try {
    // Insert new item
    $stmt = $pdo->prepare("INSERT INTO inventory_items (item_name, category, quantity, unit, low_stock_threshold) VALUES (?, ?, ?, ?, ?)");
    $stmt->execute([$item_name, $category, $quantity, $unit, $low_stock_threshold]);
    
    // If there is an initial quantity, we should log it as a Restock transaction
    if ($quantity > 0) {
        $item_id = $pdo->lastInsertId();
        $logStmt = $pdo->prepare("INSERT INTO inventory_transactions (item_id, user_id, action_type, quantity_changed, notes) VALUES (?, ?, 'Restock', ?, 'Initial Stock')");
        $logStmt->execute([$item_id, $_SESSION['user_id'], $quantity]);
    }
    
    echo json_encode(['success' => true, 'message' => 'Inventory item added successfully!']);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
