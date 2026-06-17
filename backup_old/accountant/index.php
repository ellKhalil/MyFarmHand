<?php
require_once '../config.php';
require_once '../includes/db.php';
require_once '../includes/auth.php';

requireRole(4); // 4 = Accountant

// Handle Salary Payment
$message = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['pay_salary'])) {
    $staff_id = $_POST['staff_id'];
    $amount = $_POST['amount'];
    $month_year = date('F Y');
    
    try {
        $stmt = $pdo->prepare("INSERT INTO salaries (staff_id, month_year, amount_paid, payment_date, processed_by) VALUES (?, ?, ?, CURDATE(), ?)");
        $stmt->execute([$staff_id, $month_year, $amount, $_SESSION['user_id']]);
        
        logActivity($pdo, $_SESSION['user_id'], 'PAY_SALARY', "Processed salary for staff ID $staff_id ($amount)");
        $message = "Salary for $month_year processed successfully!";
    } catch(Exception $e) {
        $message = "Error: " . $e->getMessage();
    }
}

// Fetch Staff
$stmt = $pdo->query("SELECT * FROM staff WHERE status = 'Active'");
$staffList = $stmt->fetchAll();

// Fetch Recent Payments
$stmt = $pdo->query("SELECT s.month_year, s.amount_paid, s.payment_date, st.first_name, st.last_name 
                     FROM salaries s JOIN staff st ON s.staff_id = st.id 
                     ORDER BY s.payment_date DESC LIMIT 5");
$recentPayments = $stmt->fetchAll();

require_once '../includes/header.php';
?>
<div class="card glass-card" style="animation: fadeIn 0.5s ease-out; margin-bottom: 2rem;">
    <h2>💼 Accountant Dashboard</h2>
    <p class="text-muted">Manage staff salaries, process monthly payroll, and track financial outflows.</p>
    
    <?php if($message): ?>
        <div class="alert" style="background: rgba(16,185,129,0.1); border-left: 4px solid var(--primary-color); color: var(--primary-dark); padding: 1rem; margin-top: 1rem;">
            <?= htmlspecialchars($message) ?>
        </div>
    <?php endif; ?>

    <div class="grid grid-cols-2" style="margin-top: 2rem; align-items: start;">
        <!-- Process Salaries Form -->
        <div style="background: white; border-radius: var(--radius-sm); padding: 2rem; border: 1px solid rgba(0,0,0,0.05);">
            <h3 style="margin-bottom: 1.5rem; border-bottom: 2px solid rgba(16,185,129,0.2); padding-bottom: 0.5rem; color: var(--primary-dark);">Process Payroll</h3>
            
            <?php if(empty($staffList)): ?>
                <p>No active staff members found. (Please add staff via the database for now).</p>
            <?php else: ?>
                <form method="POST">
                    <div class="form-group">
                        <label class="form-label" for="staff_id">Select Employee</label>
                        <select name="staff_id" id="staff_id" class="form-control" required>
                            <option value="">-- Choose Employee --</option>
                            <?php foreach($staffList as $st): ?>
                                <option value="<?= htmlspecialchars($st['id']) ?>" data-salary="<?= htmlspecialchars($st['base_salary']) ?>">
                                    <?= htmlspecialchars($st['first_name'] . ' ' . $st['last_name'] . ' (' . $st['position'] . ')') ?>
                                </option>
                            <?php endforeach; ?>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Amount (GMD)</label>
                        <input type="number" step="0.01" name="amount" id="amount" class="form-control" placeholder="Enter amount to pay" required>
                    </div>
                    
                    <button type="submit" name="pay_salary" class="btn btn-primary" style="width: 100%; margin-top: 1rem;">Process Payment <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-left:5px;"><path d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg></button>
                </form>
            <?php endif; ?>
        </div>
        
        <!-- Recent Transactions -->
        <div style="background: rgba(245,158,11,0.05); border-radius: var(--radius-sm); padding: 2rem; border: 1px solid rgba(245,158,11,0.1);">
            <h3 style="margin-bottom: 1.5rem; color: var(--accent-color);">Recent Payroll Logs</h3>
            <div style="display: flex; flex-direction: column; gap: 1rem;">
                <?php if(empty($recentPayments)): ?>
                    <p class="text-muted">No salaries have been processed yet.</p>
                <?php else: ?>
                    <?php foreach($recentPayments as $payment): ?>
                        <div style="background: white; padding: 1rem; border-radius: var(--radius-sm); display: flex; justify-content: space-between; align-items: center; box-shadow: var(--shadow-sm);">
                            <div>
                                <div style="font-weight: 700; color: var(--text-main);"><?= htmlspecialchars($payment['first_name'] . ' ' . $payment['last_name']) ?></div>
                                <div style="font-size: 0.85rem; color: var(--text-muted);"><?= htmlspecialchars($payment['month_year']) ?></div>
                            </div>
                            <div style="text-align: right;">
                                <div style="font-weight: 800; color: var(--danger);">-<?= htmlspecialchars(number_format($payment['amount_paid'], 2)) ?></div>
                                <div style="font-size: 0.75rem; color: var(--text-muted);"><?= htmlspecialchars($payment['payment_date']) ?></div>
                            </div>
                        </div>
                    <?php endforeach; ?>
                <?php endif; ?>
            </div>
        </div>
    </div>
</div>

<script>
document.getElementById('staff_id')?.addEventListener('change', function() {
    var selected = this.options[this.selectedIndex];
    var salary = selected.getAttribute('data-salary');
    if(salary) {
        document.getElementById('amount').value = salary;
    } else {
        document.getElementById('amount').value = '';
    }
});
</script>

<?php require_once '../includes/footer.php'; ?>
