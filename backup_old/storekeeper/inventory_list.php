<?php
require_once '../config.php';
require_once '../includes/db.php';
require_once '../includes/auth.php';

requireRole(3); // Store Keeper or Admin

$stmt = $pdo->query("SELECT * FROM inventory_items ORDER BY category, item_name");
$inventory = $stmt->fetchAll(PDO::FETCH_ASSOC);

require_once '../includes/header.php';
?>
<div class="card glass-card" style="margin-bottom: 2rem;">
    <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid rgba(0,0,0,0.05); padding-bottom: 1rem; margin-bottom: 2rem;">
        <h2>📦 Inventory List</h2>
        <div style="display: flex; gap: 1rem;">
            <button class="btn btn-primary btn-sm" onclick="openAddItemModal()">➕ Add New Item</button>
            <a href="stock_transaction_form.php" class="btn btn-secondary btn-sm">Log Transaction</a>
            <a href="../admin/index.php" class="btn btn-secondary btn-sm">Back to Dashboard</a>
        </div>
    </div>

    <div class="table-responsive">
        <table class="table" style="width: 100%; border-collapse: collapse; text-align: left;">
            <thead>
                <tr style="border-bottom: 2px solid rgba(0,0,0,0.1);">
                    <th style="padding: 1rem 0;">Item Name</th>
                    <th style="padding: 1rem 0;">Category</th>
                    <th style="padding: 1rem 0;">Quantity</th>
                    <th style="padding: 1rem 0;">Status</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach($inventory as $item): ?>
                    <?php 
                        $isLow = $item['quantity'] <= $item['low_stock_threshold']; 
                        $rowStyle = $isLow ? "background: rgba(239, 68, 68, 0.05);" : "border-bottom: 1px solid rgba(0,0,0,0.05);";
                    ?>
                    <tr style="<?= $rowStyle ?>">
                        <td style="padding: 1rem; font-weight: 500;"><?= htmlspecialchars($item['item_name']) ?></td>
                        <td style="padding: 1rem;">
                            <span style="background: rgba(0,0,0,0.05); padding: 0.25rem 0.5rem; border-radius: var(--radius-sm); font-size: 0.85rem;">
                                <?= htmlspecialchars($item['category']) ?>
                            </span>
                        </td>
                        <td style="padding: 1rem; font-weight: 700;">
                            <?= htmlspecialchars($item['quantity']) ?> <?= htmlspecialchars($item['unit']) ?>
                        </td>
                        <td style="padding: 1rem;">
                            <?php if($isLow): ?>
                                <span style="color: var(--danger); font-weight: bold; margin-right: 10px;">⚠️ Low</span>
                            <?php else: ?>
                                <span style="color: var(--primary-color); margin-right: 10px;">Good</span>
                            <?php endif; ?>
                            <button class="btn btn-sm btn-secondary" onclick="openEditItemModal(<?= $item['id'] ?>, '<?= htmlspecialchars(addslashes($item['item_name'])) ?>', '<?= htmlspecialchars(addslashes($item['category'])) ?>', '<?= htmlspecialchars(addslashes($item['unit'])) ?>', <?= $item['low_stock_threshold'] ?>)">Edit</button>
                        </td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>
</div>

<!-- Add Item Modal -->
<div id="addItemModal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 2000; align-items: center; justify-content: center;">
    <div class="card glass-card" style="width: 100%; max-width: 500px; padding: 2rem; background: white;">
        <h3 style="margin-bottom: 1.5rem;">Create New Inventory Item</h3>
        <form id="addItemForm">
            <div class="form-group">
                <label class="form-label">Item Name (Be Specific)</label>
                <input type="text" name="item_name" class="form-control" placeholder="e.g. Fish Feed (Starter), Adult Cows, Trays of Eggs" required>
            </div>
            <div class="grid grid-cols-2" style="gap: 1rem;">
                <div class="form-group">
                    <label class="form-label">Category</label>
                    <select name="category" class="form-control" required>
                        <option value="Feed">Feed</option>
                        <option value="Livestock">Livestock</option>
                        <option value="Produce">Produce (Eggs, Milk)</option>
                        <option value="Medicine">Medicine/Vaccines</option>
                        <option value="Equipment">Equipment</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Unit of Measurement</label>
                    <input type="text" name="unit" class="form-control" placeholder="e.g. Bags, Heads, Trays, Liters" required>
                </div>
            </div>
            <div class="grid grid-cols-2" style="gap: 1rem;">
                <div class="form-group">
                    <label class="form-label">Initial Quantity In Store</label>
                    <input type="number" step="0.01" name="quantity" class="form-control" value="0">
                </div>
                <div class="form-group">
                    <label class="form-label">Low Stock Warning Threshold</label>
                    <input type="number" step="0.01" name="low_stock_threshold" class="form-control" value="10">
                </div>
            </div>
            <div style="display: flex; gap: 1rem; margin-top: 1rem;">
                <button type="submit" class="btn btn-primary" style="flex: 1;">Save Item</button>
                <button type="button" class="btn btn-secondary" style="flex: 1;" onclick="closeAddItemModal()">Cancel</button>
            </div>
        </form>
    </div>
</div>

<!-- Edit Item Modal -->
<div id="editItemModal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 2000; align-items: center; justify-content: center;">
    <div class="card glass-card" style="width: 100%; max-width: 500px; padding: 2rem; background: white;">
        <h3 style="margin-bottom: 1.5rem;">Edit Inventory Item</h3>
        <form id="editItemForm">
            <input type="hidden" name="item_id" id="editItemId">
            <div class="form-group">
                <label class="form-label">Item Name</label>
                <input type="text" name="item_name" id="editItemName" class="form-control" required>
            </div>
            <div class="grid grid-cols-2" style="gap: 1rem;">
                <div class="form-group">
                    <label class="form-label">Category</label>
                    <select name="category" id="editCategory" class="form-control" required>
                        <option value="Feed">Feed</option>
                        <option value="Livestock">Livestock</option>
                        <option value="Produce">Produce (Eggs, Milk)</option>
                        <option value="Medicine">Medicine/Vaccines</option>
                        <option value="Equipment">Equipment</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Unit</label>
                    <input type="text" name="unit" id="editUnit" class="form-control" required>
                </div>
            </div>
            <div class="form-group">
                <label class="form-label">Low Stock Threshold</label>
                <input type="number" step="0.01" name="low_stock_threshold" id="editThreshold" class="form-control" required>
            </div>
            <div style="display: flex; gap: 1rem; margin-top: 1rem;">
                <button type="submit" class="btn btn-primary" style="flex: 1;">Save Changes</button>
                <button type="button" class="btn btn-secondary" style="flex: 1;" onclick="closeEditItemModal()">Cancel</button>
            </div>
        </form>
    </div>
</div>

<script>
function openAddItemModal() {
    document.getElementById('addItemForm').reset();
    document.getElementById('addItemModal').style.display = 'flex';
}

function closeAddItemModal() {
    document.getElementById('addItemModal').style.display = 'none';
}

function openEditItemModal(id, name, category, unit, threshold) {
    document.getElementById('editItemId').value = id;
    document.getElementById('editItemName').value = name;
    document.getElementById('editCategory').value = category;
    document.getElementById('editUnit').value = unit;
    document.getElementById('editThreshold').value = threshold;
    document.getElementById('editItemModal').style.display = 'flex';
}

function closeEditItemModal() {
    document.getElementById('editItemModal').style.display = 'none';
}

document.getElementById('addItemForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    fetch('../api/add_inventory_item.php', {
        method: 'POST',
        body: formData
    })
    .then(res => res.json())
    .then(data => {
        if(data.success) {
            alert(data.message);
            location.reload();
        } else {
            alert('Error: ' + data.error);
        }
    });
});

document.getElementById('editItemForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    fetch('../api/update_inventory_item.php', {
        method: 'POST',
        body: formData
    })
    .then(res => res.json())
    .then(data => {
        if(data.success) {
            alert(data.message);
            location.reload();
        } else {
            alert('Error: ' + data.error);
        }
    });
});
</script>

<?php require_once '../includes/footer.php'; ?>
