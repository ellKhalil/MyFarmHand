<?php
require_once 'config.php';
require_once 'includes/db.php';
require_once 'includes/auth.php';

if (isLoggedIn()) {
    try {
        logActivity($pdo, $_SESSION['user_id'], 'LOGOUT', 'User logged out of the system.');
    } catch (Exception $e) { /* ignore if DB fails */ }
    
    $_SESSION = [];
    session_destroy();
}

header('Location: ' . BASE_URL . '/login.php');
exit;
