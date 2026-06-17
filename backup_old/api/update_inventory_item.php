<?php
header('Content-Type: application/json');
require_once '../config.php';
require_once '../includes/db.php';
require_once '../includes/auth.php';

// Storekeeper or Admin
if (!isset($_SESSION['role_id']) || ($_SESSION['role_id'] != 1 && $_SESSION['role_id'] != 3)) {
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['error' => 'Invalid request method']);
    exit;
}

$item_id = (int)($_POST['item_id'] ?? 0);
$item_name = trim($_POST['item_name'] ?? '');
$category = $_POST['category'] ?? '';
$unit = trim($_POST['unit'] ?? '');
$low_stock_threshold = (float)($_POST['low_stock_threshold'] ?? 10);

if (!$item_id || empty($item_name) || empty($category) || empty($unit)) {
    echo json_encode(['success' => false, 'error' => 'Please fill all required fields.']);
    exit;
}

try {
    $stmt = $pdo->prepare("UPDATE inventory_items SET item_name = ?, category = ?, unit = ?, low_stock_threshold = ? WHERE id = ?");
    $stmt->execute([$item_name, $category, $unit, $low_stock_threshold, $item_id]);
    echo json_encode(['success' => true, 'message' => 'Inventory item updated successfully!']);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
