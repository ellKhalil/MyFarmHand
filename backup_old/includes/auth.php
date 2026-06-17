<?php
// includes/auth.php
require_once __DIR__ . '/db.php';

function isLoggedIn() {
    return isset($_SESSION['user_id']);
}

function requireLogin() {
    if (!isLoggedIn()) {
        header('Location: ' . BASE_URL . '/login.php');
        exit;
    }
}

function requireRole($role_id) {
    if (!isLoggedIn()) {
        die("Access Denied: Insufficient permissions.");
    }
    // Admin (role 1) has access to everything
    if ($_SESSION['role_id'] != 1 && $_SESSION['role_id'] != $role_id) {
        die("Access Denied: Insufficient permissions.");
    }
}

function logActivity($pdo, $user_id, $action_type, $description) {
    $stmt = $pdo->prepare("INSERT INTO activities (user_id, action_type, description) VALUES (?, ?, ?)");
    $stmt->execute([$user_id, $action_type, $description]);
}
