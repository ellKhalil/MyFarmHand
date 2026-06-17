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

$user_id = $_POST['user_id'] ?? null;
$phone_number = $_POST['phone_number'] ?? null;
$department = $_POST['department'] ?? null;
$base_salary = $_POST['base_salary'] ?? null;
$transport_allowance = $_POST['transport_allowance'] ?? 0;
$tax_percentage = $_POST['tax_percentage'] ?? 0;

if (!$user_id) {
    echo json_encode(['error' => 'User ID is required']);
    exit;
}

try {
    $stmt = $pdo->prepare("UPDATE users SET phone_number = ?, department = ?, base_salary = ?, transport_allowance = ?, tax_percentage = ? WHERE id = ?");
    $stmt->execute([$phone_number, $department, $base_salary, $transport_allowance, $tax_percentage, $user_id]);
    echo json_encode(['success' => true, 'message' => 'Staff details updated successfully']);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
