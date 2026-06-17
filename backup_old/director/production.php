<?php
require_once '../config.php';
require_once '../includes/db.php';
require_once '../includes/auth.php';

requireRole(2); // Managing Director
require_once '../includes/header.php';
?>
<div class="card glass-card" style="margin-bottom: 2rem;">
    <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid rgba(0,0,0,0.05); padding-bottom: 1rem; margin-bottom: 2rem;">
        <div>
            <h2>📈 Production Tracking</h2>
            <p class="text-muted">Monitor active batches and log daily yields across all departments.</p>
        </div>
        <a href="index.php" class="btn btn-secondary btn-sm">Back to Dashboard</a>
    </div>

    <!-- Active Batches Grid -->
    <div id="batchesGrid" class="grid grid-cols-3" style="margin-bottom: 3rem;">
        <!-- Populated via AJAX -->
    </div>
</div>

<!-- Log Yield Modal -->
<div id="logModal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 2000; align-items: center; justify-content: center;">
    <div class="card glass-card" style="width: 100%; max-width: 500px; padding: 2rem; background: white;">
        <h3 style="margin-bottom: 1.5rem;" id="modalBatchName">Log Yield</h3>
        <form id="logYieldForm">
            <input type="hidden" id="logBatchId" name="batch_id">
            
            <div class="grid grid-cols-2" style="gap: 1rem; margin-bottom: 1rem;">
                <div class="form-group" style="margin-bottom: 0;">
                    <label class="form-label">Yield Amount</label>
                    <input type="number" step="0.01" name="yield_amount" class="form-control" required>
                </div>
                <div class="form-group" style="margin-bottom: 0;">
                    <label class="form-label">Unit</label>
                    <input type="text" name="yield_unit" class="form-control" placeholder="e.g. Trays, Liters, Kg" required>
                </div>
            </div>

            <div class="form-group">
                <label class="form-label">Log Date</label>
                <input type="date" name="log_date" class="form-control" value="<?= date('Y-m-d') ?>" required>
            </div>

            <div class="form-group">
                <label class="form-label">Quality Rating (1-5)</label>
                <select name="quality_rating" class="form-control" required>
                    <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
                    <option value="4">⭐⭐⭐⭐ Good</option>
                    <option value="3">⭐⭐⭐ Fair</option>
                    <option value="2">⭐⭐ Poor</option>
                    <option value="1">⭐ Critical</option>
                </select>
            </div>

            <div class="form-group">
                <label class="form-label">Notes</label>
                <textarea name="notes" class="form-control" rows="2" placeholder="Any anomalies or observations?"></textarea>
            </div>

            <div style="display: flex; gap: 1rem; margin-top: 2rem;">
                <button type="submit" class="btn btn-primary" style="flex: 1;">Save Log</button>
                <button type="button" class="btn btn-secondary" style="flex: 1;" onclick="closeModal()">Cancel</button>
            </div>
        </form>
    </div>
</div>

<script>
function fetchBatches() {
    fetch('../api/get_production_batches.php')
        .then(res => res.json())
        .then(data => {
            if(data.success) {
                const grid = document.getElementById('batchesGrid');
                grid.innerHTML = '';
                
                if (data.data.length === 0) {
                    grid.innerHTML = '<p class="text-muted">No active production batches found.</p>';
                    return;
                }

                data.data.forEach(batch => {
                    const statusColor = batch.status === 'Active' ? 'var(--primary-color)' : 'var(--text-muted)';
                    const card = document.createElement('div');
                    card.className = 'card';
                    card.style.cssText = 'background: white; border: 1px solid rgba(0,0,0,0.05); box-shadow: var(--shadow-sm); display: flex; flex-direction: column; justify-content: space-between;';
                    
                    card.innerHTML = `
                        <div>
                            <div style="display: flex; justify-content: space-between; margin-bottom: 1rem;">
                                <span style="font-size: 0.8rem; font-weight: 700; text-transform: uppercase; color: ${statusColor}; background: rgba(16,185,129,0.1); padding: 0.2rem 0.6rem; border-radius: 99px;">${batch.status}</span>
                                <span style="font-size: 0.8rem; color: var(--text-muted);">${batch.department}</span>
                            </div>
                            <h3 style="margin-bottom: 0.5rem;">${batch.batch_name}</h3>
                            <p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 1.5rem;">Started: ${batch.start_date}</p>
                            
                            <div style="background: rgba(0,0,0,0.02); padding: 1rem; border-radius: var(--radius-sm); margin-bottom: 1.5rem;">
                                <div style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.25rem;">Total Yield Logged</div>
                                <div style="font-size: 1.5rem; font-weight: 800; color: var(--primary-dark);">${batch.total_yield > 0 ? parseFloat(batch.total_yield).toFixed(2) : '0.00'}</div>
                            </div>
                        </div>
                        ${batch.status === 'Active' ? `<button class="btn btn-accent btn-sm" style="width: 100%;" onclick="openModal(${batch.id}, '${batch.batch_name.replace(/'/g, "\\'")}')">➕ Log Yield</button>` : ''}
                    `;
                    grid.appendChild(card);
                });
            }
        });
}

function openModal(batchId, batchName) {
    document.getElementById('logBatchId').value = batchId;
    document.getElementById('modalBatchName').innerText = `Log Yield: ${batchName}`;
    document.getElementById('logYieldForm').reset();
    document.getElementById('logModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('logModal').style.display = 'none';
}

document.getElementById('logYieldForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    
    fetch('../api/log_production.php', {
        method: 'POST',
        body: formData
    })
    .then(res => res.json())
    .then(data => {
        if(data.success) {
            alert('Yield logged successfully!');
            closeModal();
            fetchBatches(); // Refresh data
        } else {
            alert('Error: ' + data.error);
        }
    });
});

// Init
fetchBatches();
</script>

<?php require_once '../includes/footer.php'; ?>
