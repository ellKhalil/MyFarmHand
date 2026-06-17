<?php
require_once '../config.php';
require_once '../includes/db.php';
require_once '../includes/auth.php';

requireRole(3); // Store Keeper only

$stmt = $pdo->query("SELECT id, item_name, unit FROM inventory_items ORDER BY item_name");
$items = $stmt->fetchAll(PDO::FETCH_ASSOC);

require_once '../includes/header.php';
?>
<div class="card glass-card" style="margin-bottom: 2rem; max-width: 600px; margin-left: auto; margin-right: auto;">
    <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid rgba(0,0,0,0.05); padding-bottom: 1rem; margin-bottom: 2rem;">
        <h2>📝 Log Stock Transaction</h2>
        <a href="inventory_list.php" class="btn btn-secondary btn-sm">Back to List</a>
    </div>

    <form id="transactionForm">
        <div class="form-group">
            <label class="form-label">Inventory Item</label>
            <select name="item_id" class="form-control" required>
                <option value="">-- Select Item --</option>
                <?php foreach($items as $item): ?>
                    <option value="<?= $item['id'] ?>"><?= htmlspecialchars($item['item_name']) ?> (<?= htmlspecialchars($item['unit']) ?>)</option>
                <?php endforeach; ?>
            </select>
        </div>

        <div class="form-group">
            <label class="form-label">Action Type</label>
            <select name="action_type" class="form-control" required>
                <option value="Restock">➕ Restock (Add)</option>
                <option value="Usage">➖ Usage (Subtract)</option>
                <option value="Mortality/Loss">⚠️ Mortality/Loss (Subtract)</option>
            </select>
        </div>

        <div class="form-group">
            <label class="form-label">Quantity</label>
            <input type="number" step="0.01" min="0.01" name="quantity_changed" class="form-control" required>
        </div>

        <div class="form-group">
            <label class="form-label">Notes (Optional)</label>
            <textarea name="notes" class="form-control" rows="3"></textarea>
        </div>

        <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 1rem;">Log Transaction</button>
    </form>
</div>

<script>
document.getElementById('transactionForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    
    fetch('../api/log_transaction.php', {
        method: 'POST',
        body: formData
    })
    .then(res => res.json())
    .then(data => {
        if(data.success) {
            alert('Transaction recorded successfully!');
            window.location.href = 'inventory_list.php';
        } else {
            alert('Error: ' + data.error);
        }
    });
});
</script>

<?php require_once '../includes/footer.php'; ?>
