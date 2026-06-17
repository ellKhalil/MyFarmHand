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

$item_id = $_POST['item_id'] ?? null;
$action_type = $_POST['action_type'] ?? null; // Restock, Usage, Mortality/Loss
$quantity_changed = (float)($_POST['quantity_changed'] ?? 0);
$notes = $_POST['notes'] ?? '';

if (!$item_id || !$action_type || $quantity_changed <= 0) {
    echo json_encode(['error' => 'Missing required fields or invalid quantity']);
    exit;
}

try {
    $pdo->beginTransaction();

    // 1. Insert Transaction Log
    $stmt = $pdo->prepare("INSERT INTO inventory_transactions (item_id, user_id, action_type, quantity_changed, notes) VALUES (?, ?, ?, ?, ?)");
    $stmt->execute([$item_id, $_SESSION['user_id'], $action_type, $quantity_changed, $notes]);

    // 2. Update Inventory Quantity
    if ($action_type === 'Restock') {
        $updateStmt = $pdo->prepare("UPDATE inventory_items SET quantity = quantity + ? WHERE id = ?");
    } else {
        // Usage or Mortality/Loss reduces quantity
        $updateStmt = $pdo->prepare("UPDATE inventory_items SET quantity = quantity - ? WHERE id = ?");
    }
    $updateStmt->execute([$quantity_changed, $item_id]);

    $pdo->commit();
    echo json_encode(['success' => true, 'message' => 'Transaction logged successfully']);
} catch (Exception $e) {
    $pdo->rollBack();
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
