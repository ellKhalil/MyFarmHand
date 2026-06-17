<?php
header('Content-Type: application/json');
require_once '../config.php';
require_once '../includes/db.php';
require_once '../includes/auth.php';

if (!isset($_SESSION['role_id']) || ($_SESSION['role_id'] != 1 && $_SESSION['role_id'] != 2)) {
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['error' => 'Invalid request method']);
    exit;
}

$batch_id = (int)($_POST['batch_id'] ?? 0);
$log_date = $_POST['log_date'] ?? date('Y-m-d');
$yield_amount = (float)($_POST['yield_amount'] ?? 0);
$yield_unit = $_POST['yield_unit'] ?? '';
$quality_rating = (int)($_POST['quality_rating'] ?? 5);
$notes = $_POST['notes'] ?? '';

if (!$batch_id || $yield_amount <= 0 || empty($yield_unit)) {
    echo json_encode(['error' => 'Missing required fields or invalid yield amount']);
    exit;
}

try {
    $stmt = $pdo->prepare("INSERT INTO production_logs (batch_id, user_id, log_date, yield_amount, yield_unit, quality_rating, notes) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->execute([$batch_id, $_SESSION['user_id'], $log_date, $yield_amount, $yield_unit, $quality_rating, $notes]);
    
    echo json_encode(['success' => true, 'message' => 'Production log recorded successfully']);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
