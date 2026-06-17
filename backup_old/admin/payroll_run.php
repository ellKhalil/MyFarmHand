<?php
require_once '../config.php';
require_once '../includes/db.php';
require_once '../includes/auth.php';

requireRole(1); // Admin only
require_once '../includes/header.php';
?>
<div class="card glass-card" style="margin-bottom: 2rem;">
    <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid rgba(0,0,0,0.05); padding-bottom: 1rem; margin-bottom: 2rem;">
        <h2>💸 Payroll Processing</h2>
        <div style="display: flex; gap: 1rem;">
            <button class="btn btn-accent btn-sm" id="generateBtn">Generate Current Payroll</button>
            <a href="index.php" class="btn btn-secondary btn-sm">Back to Dashboard</a>
        </div>
    </div>

    <div style="margin-bottom: 2rem; display: flex; gap: 1rem; align-items: center;">
        <select id="monthSelect" class="form-control" style="width: 200px;">
            <?php
            $months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
            $currentMonth = date('F');
            foreach($months as $m) {
                $sel = ($m == $currentMonth) ? 'selected' : '';
                echo "<option value=\"$m\" $sel>$m</option>";
            }
            ?>
        </select>
        <select id="yearSelect" class="form-control" style="width: 150px;">
            <option value="<?= date('Y') ?>"><?= date('Y') ?></option>
            <option value="<?= date('Y')-1 ?>"><?= date('Y')-1 ?></option>
        </select>
        <button class="btn btn-secondary" onclick="fetchPayroll()">View Payslips</button>
    </div>

    <div class="table-responsive">
        <table class="table" style="width: 100%; border-collapse: collapse; text-align: left;" id="payrollTable">
            <thead>
                <tr style="border-bottom: 2px solid rgba(0,0,0,0.1);">
                    <th style="padding: 1rem 0;">Staff Member</th>
                    <th style="padding: 1rem 0;">Department</th>
                    <th style="padding: 1rem 0;">Base Pay</th>
                    <th style="padding: 1rem 0;">Net Payable</th>
                    <th style="padding: 1rem 0;">Status</th>
                </tr>
            </thead>
            <tbody>
                <!-- Populated via AJAX -->
            </tbody>
        </table>
    </div>
</div>

<script>
function fetchPayroll() {
    const m = document.getElementById('monthSelect').value;
    const y = document.getElementById('yearSelect').value;
    
    fetch(`../api/get_payroll.php?month=${m}&year=${y}`)
        .then(res => res.json())
        .then(data => {
            const tbody = document.querySelector('#payrollTable tbody');
            tbody.innerHTML = '';
            
            if(data.success && data.data.length > 0) {
                data.data.forEach(p => {
                    const statusColor = p.payment_status === 'Paid' ? 'var(--primary-color)' : 'var(--accent-color)';
                    const tr = document.createElement('tr');
                    tr.style.borderBottom = "1px solid rgba(0,0,0,0.05)";
                    tr.innerHTML = `
                        <td style="padding: 1rem 0; font-weight: 500;">${p.full_name}</td>
                        <td style="padding: 1rem 0;">${p.department || '-'}</td>
                        <td style="padding: 1rem 0;">$${parseFloat(p.base_pay).toFixed(2)}</td>
                        <td style="padding: 1rem 0; font-weight: 700; color: var(--primary-dark);">$${parseFloat(p.net_payable).toFixed(2)}</td>
                        <td style="padding: 1rem 0;">
                            <span style="color: ${statusColor}; font-weight: 600;">${p.payment_status}</span>
                        </td>
                    `;
                    tbody.appendChild(tr);
                });
            } else {
                tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; padding: 2rem; color: var(--text-muted);">No payroll records found for this period.</td></tr>`;
            }
        });
}

document.getElementById('generateBtn').addEventListener('click', function() {
    const formData = new FormData();
    formData.append('month', document.getElementById('monthSelect').value);
    formData.append('year', document.getElementById('yearSelect').value);
    
    fetch('../api/generate_payroll.php', {
        method: 'POST',
        body: formData
    })
    .then(res => res.json())
    .then(data => {
        if(data.success) {
            alert(data.message);
            fetchPayroll();
        } else {
            alert('Error: ' + data.error);
        }
    });
});

// Load payroll on page load
fetchPayroll();
</script>

<?php require_once '../includes/footer.php'; ?>
