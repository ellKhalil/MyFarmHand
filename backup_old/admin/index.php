<?php
require_once '../config.php';
require_once '../includes/db.php';
require_once '../includes/auth.php';

requireRole(1); // 1 = Admin

// Fetch metrics
$stmt = $pdo->query("SELECT COUNT(*) as user_count FROM users");
$user_count = $stmt->fetch()['user_count'];

$stmt = $pdo->query("SELECT COUNT(*) as log_count FROM activities WHERE DATE(created_at) = CURDATE()");
$log_count = $stmt->fetch()['log_count'];

// Inventory Metrics
$stmt = $pdo->query("SELECT COUNT(*) as total_items FROM inventory_items");
$total_inventory = $stmt->fetch()['total_items'];

$stmt = $pdo->query("SELECT COUNT(*) as low_stock FROM inventory_items WHERE quantity <= low_stock_threshold");
$low_stock = $stmt->fetch()['low_stock'];

// Production Metrics
$stmt = $pdo->query("SELECT COUNT(*) as active_batches FROM production_batches WHERE status = 'Active'");
$active_batches = $stmt->fetch()['active_batches'];

// Fetch all users for directory
$stmt = $pdo->query("SELECT u.*, r.role_name FROM users u JOIN roles r ON u.role_id = r.id ORDER BY u.created_at DESC");
$all_users = $stmt->fetchAll();

require_once '../includes/header.php';
?>
<div class="card glass-card" style="animation: fadeIn 0.5s ease-out; margin-bottom: 2rem;">
    <div style="display: flex; justify-content: space-between; align-items: flex-start;">
        <div>
            <h2>🛡️ System Administrator</h2>
            <p class="text-muted">Manage system users, view system logs, and configure global settings.</p>
        </div>
        <!-- RESTORED: Top Navigation Buttons -->
        <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
            <a href="staff_management.php" class="btn btn-secondary btn-sm">👥 HR & Staff</a>
            <a href="payroll_run.php" class="btn btn-secondary btn-sm">💸 Payroll</a>
            <a href="../storekeeper/inventory_list.php" class="btn btn-secondary btn-sm">📦 Inventory</a>
            <a href="../director/production.php" class="btn btn-accent btn-sm">📈 Production</a>
        </div>
    </div>

    <!-- Top KPI Cards -->
    <div class="grid grid-cols-3" style="margin-top: 2rem; gap: 1.5rem;">
        <div class="card text-center" style="background: rgba(47, 133, 90, 0.05); border-color: rgba(47, 133, 90, 0.2); box-shadow: var(--shadow-sm);">
            <h3 style="font-size: 2.5rem; color: var(--primary-color); margin-bottom: 0.5rem;"><?= number_format($user_count) ?></h3>
            <p style="font-weight: 600; color: var(--primary-dark);">Registered Users</p>
        </div>
        <div class="card text-center" style="background: rgba(214, 158, 46, 0.05); border-color: rgba(214, 158, 46, 0.2); box-shadow: var(--shadow-sm);">
            <h3 style="font-size: 2.5rem; color: var(--accent-color); margin-bottom: 0.5rem;"><?= number_format($log_count) ?></h3>
            <p style="font-weight: 600; color: #D97706;">System Logs Today</p>
        </div>
        <div class="card text-center" style="background: rgba(229, 62, 62, 0.05); border-color: rgba(229, 62, 62, 0.2); box-shadow: var(--shadow-sm);">
            <h3 style="font-size: 2.5rem; color: var(--danger); margin-bottom: 0.5rem;"><?= number_format($low_stock) ?></h3>
            <p style="font-weight: 600; color: #B91C1C;">Low Stock Alerts</p>
        </div>
    </div>

    <!-- Data Overview Section -->
    <div class="grid grid-cols-2" style="margin-top: 2rem; gap: 2rem;">
        <div style="background: white; border-radius: var(--radius-sm); padding: 2rem; border: 1px solid rgba(0,0,0,0.05); box-shadow: var(--shadow-sm);">
            <h3 style="border-bottom: 2px solid rgba(245,158,11,0.2); padding-bottom: 0.5rem; margin-bottom: 1.5rem; color: #D97706;">📦 Inventory Overview</h3>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                <span style="font-size: 1.1rem;">Total Items Cataloged:</span>
                <span style="font-size: 1.2rem; font-weight: bold;"><?= number_format($total_inventory) ?></span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 1.1rem;">Items Below Threshold:</span>
                <span style="<?= $low_stock > 0 ? 'color: var(--danger);' : 'color: var(--primary-color);' ?> font-size: 1.2rem; font-weight: bold;">
                    <?= number_format($low_stock) ?>
                </span>
            </div>
        </div>
        
        <div style="background: white; border-radius: var(--radius-sm); padding: 2rem; border: 1px solid rgba(0,0,0,0.05); box-shadow: var(--shadow-sm);">
            <h3 style="border-bottom: 2px solid rgba(139,92,246,0.2); padding-bottom: 0.5rem; margin-bottom: 1.5rem; color: #6D28D9;">📈 Production Overview</h3>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                <span style="font-size: 1.1rem;">Active Production Batches:</span>
                <span style="font-size: 1.2rem; font-weight: bold; color: var(--primary-dark);"><?= number_format($active_batches) ?></span>
            </div>
            <p style="margin-top: 1.5rem; color: var(--text-muted); font-size: 0.9rem;">Navigate to the Production module to view detailed yield logs.</p>
        </div>
    </div>

    <!-- System Users List -->
    <div style="margin-top: 2rem; background: white; border-radius: var(--radius-sm); padding: 2rem; border: 1px solid rgba(0,0,0,0.05); box-shadow: var(--shadow-sm);">
        <h3 style="margin-bottom: 1.5rem; border-bottom: 2px solid rgba(16,185,129,0.2); padding-bottom: 0.5rem; color: var(--primary-dark);">👥 System Directory</h3>
        <div class="table-responsive">
            <table style="width: 100%; border-collapse: collapse; text-align: left;">
                <thead>
                    <tr style="border-bottom: 2px solid rgba(0,0,0,0.1);">
                        <th style="padding: 1rem 0;">Name</th>
                        <th style="padding: 1rem 0;">Username</th>
                        <th style="padding: 1rem 0;">Role</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach($all_users as $u): ?>
                        <tr style="border-bottom: 1px solid rgba(0,0,0,0.05);">
                            <td style="padding: 1rem 0; font-weight: 500;"><?= htmlspecialchars($u['full_name'] ?: 'N/A') ?></td>
                            <td style="padding: 1rem 0; color: var(--text-muted);"><?= htmlspecialchars($u['username']) ?></td>
                            <td style="padding: 1rem 0;">
                                <span style="background: rgba(16,185,129,0.1); color: var(--primary-dark); padding: 0.25rem 0.5rem; border-radius: var(--radius-sm); font-size: 0.85rem; font-weight: 600;">
                                    <?= htmlspecialchars($u['role_name']) ?>
                                </span>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
    </div>

</div>
<?php require_once '../includes/footer.php'; ?>
