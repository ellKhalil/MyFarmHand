<?php
require_once '../config.php';
require_once '../includes/db.php';
require_once '../includes/auth.php';

requireRole(3); // 3 = Store Keeper

$message = '';

// Handle Adding New Item
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['add_item'])) {
    $item_name = trim($_POST['item_name']);
    $category = trim($_POST['category']);
    $quantity = (float)$_POST['quantity'];
    $unit = trim($_POST['unit']);

    try {
        $stmt = $pdo->prepare("INSERT INTO inventory (item_name, category, quantity, unit) VALUES (?, ?, ?, ?)");
        $stmt->execute([$item_name, $category, $quantity, $unit]);
        
        $inventory_id = $pdo->lastInsertId();
        
        // Log activity
        $stmt_log = $pdo->prepare("INSERT INTO inventory_logs (inventory_id, user_id, change_amount, reason) VALUES (?, ?, ?, ?)");
        $stmt_log->execute([$inventory_id, $_SESSION['user_id'], $quantity, 'Initial Stock Entry']);
        
        logActivity($pdo, $_SESSION['user_id'], 'ADD_INVENTORY', "Added new item: $item_name ($quantity $unit)");
        
        $message = "Item added successfully!";
    } catch(Exception $e) {
        $message = "Error: " . $e->getMessage();
    }
}

// Fetch Inventory
$stmt = $pdo->query("SELECT * FROM inventory ORDER BY category, item_name");
$inventoryList = $stmt->fetchAll();

require_once '../includes/header.php';
?>
<div class="card glass-card" style="animation: fadeIn 0.5s ease-out; margin-bottom: 2rem;">
    <h2>📦 Inventory Management Workspace</h2>
    <p class="text-muted">Track daily stock usage, restock items, and monitor seed and fertilizer levels.</p>
    
    <?php if($message): ?>
        <div class="alert" style="background: rgba(16,185,129,0.1); border-left: 4px solid var(--primary-color); color: var(--primary-dark); padding: 1rem; margin-top: 1rem; margin-bottom: 1rem;">
            <?= htmlspecialchars($message) ?>
        </div>
    <?php endif; ?>

    <div class="grid grid-cols-2" style="margin-top: 2rem; align-items: start;">
        <!-- Add New Item Form -->
        <div style="background: white; border-radius: var(--radius-sm); padding: 2rem; border: 1px solid rgba(0,0,0,0.05);">
            <h3 style="margin-bottom: 1.5rem; border-bottom: 2px solid rgba(16,185,129,0.2); padding-bottom: 0.5rem; color: var(--primary-dark);">➕ Add New Item</h3>
            <form method="POST">
                <div class="form-group">
                    <label class="form-label">Item Name</label>
                    <input type="text" name="item_name" class="form-control" required>
                </div>
                <div class="form-group">
                    <label class="form-label">Category</label>
                    <select name="category" class="form-control" required>
                        <option value="Fertilizers">Fertilizers</option>
                        <option value="Seeds">Seeds</option>
                        <option value="Pesticides">Pesticides</option>
                        <option value="Tools">Tools</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div class="grid grid-cols-2" style="gap: 1rem;">
                    <div class="form-group">
                        <label class="form-label">Quantity</label>
                        <input type="number" step="0.01" name="quantity" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Unit</label>
                        <input type="text" name="unit" class="form-control" placeholder="e.g. Bags, Kg, L" required>
                    </div>
                </div>
                <button type="submit" name="add_item" class="btn btn-primary" style="width: 100%; margin-top: 1rem;">Add to Inventory</button>
            </form>
        </div>

        <!-- Inventory List -->
        <div style="background: white; border-radius: var(--radius-sm); padding: 2rem; border: 1px solid rgba(0,0,0,0.05);">
            <h3 style="margin-bottom: 1.5rem; color: var(--text-main);">Current Stock</h3>
            <div class="table-responsive">
                <table style="width: 100%; border-collapse: collapse; text-align: left; min-width: 400px;">
                    <thead>
                        <tr style="border-bottom: 2px solid rgba(0,0,0,0.1);">
                            <th style="padding: 1rem 0;">Item Name</th>
                            <th style="padding: 1rem 0;">Category</th>
                            <th style="padding: 1rem 0;">Stock</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php if(empty($inventoryList)): ?>
                            <tr><td colspan="3" style="padding: 1rem 0; text-align: center;" class="text-muted">No items in inventory.</td></tr>
                        <?php else: ?>
                            <?php foreach($inventoryList as $item): ?>
                                <tr style="border-bottom: 1px solid rgba(0,0,0,0.05);">
                                    <td style="padding: 1rem 0; font-weight: 500;"><?= htmlspecialchars($item['item_name']) ?></td>
                                    <td style="padding: 1rem 0; color: var(--text-muted);"><?= htmlspecialchars($item['category']) ?></td>
                                    <td style="padding: 1rem 0;">
                                        <span style="<?= $item['quantity'] < 20 ? 'color: var(--danger);' : 'color: var(--primary-color);' ?> font-weight: bold;">
                                            <?= htmlspecialchars(number_format($item['quantity'], 2)) ?>
                                        </span> 
                                        <?= htmlspecialchars($item['unit']) ?>
                                    </td>
                                </tr>
                            <?php endforeach; ?>
                        <?php endif; ?>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
<?php require_once '../includes/footer.php'; ?>
