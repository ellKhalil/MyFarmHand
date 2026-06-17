<?php require_once __DIR__ . '/../config.php'; ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MyFarmHand - Premium Farm Management</title>
    <!-- Modern Typography -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="<?= BASE_URL ?>/assets/css/style.css">
</head>
<body>
    <nav class="navbar glass-nav">
        <div class="container nav-content">
            <a href="<?= BASE_URL ?>/" class="logo">
                <span class="logo-icon">🌿</span> MyFarmHand
            </a>
            <div class="nav-links">
                <?php if(isset($_SESSION['user_id'])): ?>
                    <span class="nav-greeting">Welcome, <?= htmlspecialchars($_SESSION['full_name']) ?></span>
                    <?php if($_SESSION['role_id'] == 1): ?>
                        <a href="<?= BASE_URL ?>/admin/" class="nav-link">Admin Dashboard</a>
                    <?php elseif($_SESSION['role_id'] == 2): ?>
                        <a href="<?= BASE_URL ?>/director/" class="nav-link">Director Dashboard</a>
                    <?php elseif($_SESSION['role_id'] == 3): ?>
                        <a href="<?= BASE_URL ?>/storekeeper/" class="nav-link">Store Dashboard</a>
                    <?php elseif($_SESSION['role_id'] == 4): ?>
                        <a href="<?= BASE_URL ?>/accountant/" class="nav-link">Accountant Dashboard</a>
                    <?php endif; ?>
                    <a href="<?= BASE_URL ?>/logout.php" class="btn btn-logout btn-sm">Logout</a>
                <?php else: ?>
                    <a href="<?= BASE_URL ?>/login.php" class="btn btn-primary btn-sm">Login to Portal</a>
                <?php endif; ?>
            </div>
        </div>
    </nav>
    <main class="main-content">
