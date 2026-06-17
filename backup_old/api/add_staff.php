<?php
header('Content-Type: application/json');
require_once '../config.php';
require_once '../includes/db.php';
require_once '../includes/auth.php';

// Only Admin can add new staff
if (!isset($_SESSION['role_id']) || $_SESSION['role_id'] != 1) {
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['error' => 'Invalid request method']);
    exit;
}

$new_username = trim($_POST['username'] ?? '');
$new_password = $_POST['password'] ?? '';
$role_id = (int)($_POST['role_id'] ?? 0);
$full_name = trim($_POST['full_name'] ?? '');

if (empty($new_username) || empty($new_password) || empty($role_id)) {
    echo json_encode(['success' => false, 'error' => 'Please fill in all required fields.']);
    exit;
}

if ($role_id == 1) {
    echo json_encode(['success' => false, 'error' => 'Cannot create another Admin account.']);
    exit;
}

try {
    // Check if username exists
    $stmt = $pdo->prepare("SELECT id FROM users WHERE username = ?");
    $stmt->execute([$new_username]);
    if ($stmt->fetch()) {
        echo json_encode(['success' => false, 'error' => 'Username already exists. Please choose another.']);
        exit;
    }
    
    $hash = password_hash($new_password, PASSWORD_DEFAULT);
    
    $stmt = $pdo->prepare("INSERT INTO users (username, password_hash, role_id, full_name) VALUES (?, ?, ?, ?)");
    $stmt->execute([$new_username, $hash, $role_id, $full_name]);
    
    logActivity($pdo, $_SESSION['user_id'], 'ADD_USER', "Created new staff: $new_username (Role ID: $role_id)");
    
    echo json_encode(['success' => true, 'message' => "Staff '$new_username' created successfully!"]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
