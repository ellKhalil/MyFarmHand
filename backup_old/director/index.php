<?php
require_once '../config.php';
require_once '../includes/db.php';
require_once '../includes/auth.php';

requireRole(2); // 2 = Director

// Fetch high-level metrics
$metrics = [];

// 1. Total salaries paid this month
$month_year = date('F Y');
$stmt = $pdo->prepare("SELECT SUM(amount_paid) as total_salary FROM salaries WHERE month_year = ?");
$stmt->execute([$month_year]);
$metrics['monthly_salary'] = $stmt->fetch()['total_salary'] ?? 0;

// 2. Active Staff
$stmt = $pdo->query("SELECT COUNT(*) as active_staff FROM staff WHERE status = 'Active'");
$metrics['active_staff'] = $stmt->fetch()['active_staff'];

// 3. Low Inventory Alerts
$stmt = $pdo->query("SELECT COUNT(*) as low_stock FROM inventory WHERE quantity < 20");
$metrics['low_stock'] = $stmt->fetch()['low_stock'];

// 4. Total Inventory Items
$stmt = $pdo->query("SELECT COUNT(*) as total_items FROM inventory");
$metrics['total_items'] = $stmt->fetch()['total_items'];

require_once '../includes/header.php';
?>
<div class="card glass-card" style="animation: fadeIn 0.5s ease-out; margin-bottom: 2rem;">
    <div style="display: flex; justify-content: space-between; align-items: flex-start;">
        <div>
            <h2>📊 Managing Director Portal</h2>
            <p class="text-muted">High-level overview of farm productivity and financial metrics.</p>
        </div>
        <div>
            <a href="production.php" class="btn btn-primary btn-sm">📈 Production Tracking</a>
        </div>
    </div>
    
    <div class="grid grid-cols-2" style="margin-top: 2rem; gap: 2rem;">
        <div style="background: white; border-radius: var(--radius-sm); padding: 2rem; border: 1px solid rgba(0,0,0,0.05); box-shadow: var(--shadow-sm);">
            <h3 style="border-bottom: 2px solid rgba(16,185,129,0.2); padding-bottom: 0.5rem; margin-bottom: 1.5rem; color: var(--primary-dark);">Financial & HR Overview</h3>
            <p style="font-size: 1.1rem; margin-bottom: 0.5rem;"><strong>Active Employees:</strong> <span style="color: var(--primary-color); font-weight: bold;"><?= number_format($metrics['active_staff']) ?></span></p>
            <p style="font-size: 1.1rem; margin-bottom: 0.5rem;"><strong>Total Salaries (<?= $month_year ?>):</strong> <span style="color: var(--danger); font-weight: bold;">GMD <?= number_format($metrics['monthly_salary'], 2) ?></span></p>
            <p style="margin-top: 1rem; color: var(--text-muted); font-size: 0.9rem;">Cost management is currently within acceptable parameters.</p>
        </div>
        <div style="background: white; border-radius: var(--radius-sm); padding: 2rem; border: 1px solid rgba(0,0,0,0.05); box-shadow: var(--shadow-sm);">
            <h3 style="border-bottom: 2px solid rgba(245,158,11,0.2); padding-bottom: 0.5rem; margin-bottom: 1.5rem; color: #D97706;">Inventory Health</h3>
            <p style="font-size: 1.1rem; margin-bottom: 0.5rem;"><strong>Total Stock Items:</strong> <?= number_format($metrics['total_items']) ?></p>
            <p style="font-size: 1.1rem; margin-bottom: 0.5rem;"><strong>Critical/Low Stock:</strong> <span style="<?= $metrics['low_stock'] > 0 ? 'color: var(--danger); font-weight: bold;' : 'color: var(--primary-color); font-weight: bold;' ?>"><?= number_format($metrics['low_stock']) ?></span></p>
            
            <?php if($metrics['low_stock'] > 0): ?>
                <p style="margin-top: 1rem; color: var(--danger); font-size: 0.9rem; font-weight: 500;">Attention required: Several items are running dangerously low.</p>
            <?php else: ?>
                <p style="margin-top: 1rem; color: var(--primary-color); font-size: 0.9rem;">Most critical stock items are well provisioned.</p>
            <?php endif; ?>
        </div>
    </div>
</div>
<?php require_once '../includes/footer.php'; ?>
