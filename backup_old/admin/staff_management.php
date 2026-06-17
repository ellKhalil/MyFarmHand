<?php
require_once '../config.php';
require_once '../includes/db.php';
require_once '../includes/auth.php';

requireRole(1); // Admin only

// Fetch roles for Add Staff modal (Excluding Admin)
$stmt = $pdo->query("SELECT * FROM roles WHERE id != 1 ORDER BY id");
$roles = $stmt->fetchAll();

require_once '../includes/header.php';
?>
<div class="card glass-card" style="margin-bottom: 2rem;">
    <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid rgba(0,0,0,0.05); padding-bottom: 1rem; margin-bottom: 2rem;">
        <h2>👥 HR & Staff Management</h2>
        <div style="display: flex; gap: 1rem;">
            <button class="btn btn-primary btn-sm" onclick="openAddModal()">➕ Add Staff</button>
            <a href="index.php" class="btn btn-secondary btn-sm">Back to Dashboard</a>
        </div>
    </div>

    <div class="table-responsive">
        <table class="table" style="width: 100%; border-collapse: collapse; text-align: left;" id="staffTable">
            <thead>
                <tr style="border-bottom: 2px solid rgba(0,0,0,0.1);">
                    <th style="padding: 1rem 0;">Name</th>
                    <th style="padding: 1rem 0;">Role</th>
                    <th style="padding: 1rem 0;">Department</th>
                    <th style="padding: 1rem 0;">Phone</th>
                    <th style="padding: 1rem 0;">Base Salary</th>
                    <th style="padding: 1rem 0;">Actions</th>
                </tr>
            </thead>
            <tbody>
                <!-- Populated via AJAX -->
            </tbody>
        </table>
    </div>
</div>

<!-- Add Staff Modal -->
<div id="addModal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 2000; align-items: center; justify-content: center;">
    <div class="card glass-card" style="width: 100%; max-width: 500px; padding: 2rem; background: white;">
        <h3 style="margin-bottom: 1.5rem;">Create New Staff</h3>
        <form id="addStaffForm">
            <div class="form-group">
                <label class="form-label">Full Name</label>
                <input type="text" name="full_name" class="form-control" placeholder="e.g. John Doe">
            </div>
            <div class="form-group">
                <label class="form-label">Username</label>
                <input type="text" name="username" class="form-control" required>
            </div>
            <div class="form-group">
                <label class="form-label">Password</label>
                <input type="password" name="password" class="form-control" required>
            </div>
            <div class="form-group">
                <label class="form-label">System Role</label>
                <select name="role_id" class="form-control" required>
                    <option value="">-- Select Role --</option>
                    <?php foreach($roles as $role): ?>
                        <option value="<?= $role['id'] ?>"><?= htmlspecialchars($role['role_name']) ?></option>
                    <?php endforeach; ?>
                </select>
            </div>
            <div style="display: flex; gap: 1rem; margin-top: 2rem;">
                <button type="submit" class="btn btn-primary" style="flex: 1;">Create Account</button>
                <button type="button" class="btn btn-secondary" style="flex: 1;" onclick="closeAddModal()">Cancel</button>
            </div>
        </form>
    </div>
</div>

<!-- Edit Staff Modal (Hidden by default) -->
<div id="editModal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 2000; align-items: center; justify-content: center;">
    <div class="card glass-card" style="width: 100%; max-width: 500px; padding: 2rem; background: white;">
        <h3 style="margin-bottom: 1.5rem;">Edit Staff Details</h3>
        <form id="editStaffForm">
            <input type="hidden" id="editUserId" name="user_id">
            <div class="form-group">
                <label class="form-label">Phone Number</label>
                <input type="text" id="editPhone" name="phone_number" class="form-control">
            </div>
            <div class="form-group">
                <label class="form-label">Department</label>
                <select id="editDept" name="department" class="form-control">
                    <option value="">-- None --</option>
                    <option value="Poultry">Poultry</option>
                    <option value="Aquaculture">Aquaculture</option>
                    <option value="Dairy">Dairy</option>
                    <option value="Crops">Crops</option>
                </select>
            </div>
            
            <h4 style="margin-top: 1.5rem; margin-bottom: 1rem; color: var(--primary-dark); border-bottom: 1px solid rgba(0,0,0,0.05); padding-bottom: 0.5rem;">Salary Structure</h4>
            <div class="form-group">
                <label class="form-label">Base Salary</label>
                <input type="number" step="0.01" id="editSalary" name="base_salary" class="form-control">
            </div>
            <div class="grid grid-cols-2" style="gap: 1rem;">
                <div class="form-group">
                    <label class="form-label">Transport Allowance (Flat)</label>
                    <input type="number" step="0.01" id="editTransport" name="transport_allowance" class="form-control" value="0">
                </div>
                <div class="form-group">
                    <label class="form-label">Tax Deduction (%)</label>
                    <input type="number" step="0.01" id="editTax" name="tax_percentage" class="form-control" value="5">
                </div>
            </div>

            <div style="display: flex; gap: 1rem; margin-top: 2rem;">
                <button type="submit" class="btn btn-primary" style="flex: 1;">Save Changes</button>
                <button type="button" class="btn btn-secondary" style="flex: 1;" onclick="closeEditModal()">Cancel</button>
            </div>
        </form>
    </div>
</div>

<script>
function fetchStaff() {
    fetch('../api/get_staff.php')
        .then(res => res.json())
        .then(data => {
            if(data.success) {
                const tbody = document.querySelector('#staffTable tbody');
                tbody.innerHTML = '';
                data.data.forEach(staff => {
                    const tr = document.createElement('tr');
                    tr.style.borderBottom = "1px solid rgba(0,0,0,0.05)";
                    tr.innerHTML = `
                        <td style="padding: 1rem 0; font-weight: 500;">${staff.full_name || 'N/A'}</td>
                        <td style="padding: 1rem 0;">
                            <span style="background: rgba(16,185,129,0.1); color: var(--primary-dark); padding: 0.25rem 0.5rem; border-radius: var(--radius-sm); font-size: 0.85rem;">
                                ${staff.role_name}
                            </span>
                        </td>
                        <td style="padding: 1rem 0;">${staff.department || '-'}</td>
                        <td style="padding: 1rem 0;">${staff.phone_number || '-'}</td>
                        <td style="padding: 1rem 0;">$${parseFloat(staff.base_salary).toFixed(2)}</td>
                        <td style="padding: 1rem 0;">
                            <button class="btn btn-sm btn-secondary" onclick="openEditModal(${staff.id}, '${staff.phone_number||''}', '${staff.department||''}', ${staff.base_salary}, ${staff.transport_allowance||0}, ${staff.tax_percentage||0})">Edit</button>
                        </td>
                    `;
                    tbody.appendChild(tr);
                });
            }
        });
}

function openAddModal() {
    document.getElementById('addStaffForm').reset();
    document.getElementById('addModal').style.display = 'flex';
}

function closeAddModal() {
    document.getElementById('addModal').style.display = 'none';
}

function openEditModal(id, phone, dept, salary, transport, tax) {
    document.getElementById('editUserId').value = id;
    document.getElementById('editPhone').value = phone;
    document.getElementById('editDept').value = dept;
    document.getElementById('editSalary').value = salary;
    document.getElementById('editTransport').value = transport;
    document.getElementById('editTax').value = tax;
    document.getElementById('editModal').style.display = 'flex';
}

function closeEditModal() {
    document.getElementById('editModal').style.display = 'none';
}

document.getElementById('addStaffForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    fetch('../api/add_staff.php', {
        method: 'POST',
        body: formData
    })
    .then(res => res.json())
    .then(data => {
        if(data.success) {
            alert(data.message);
            closeAddModal();
            fetchStaff();
        } else {
            alert('Error: ' + data.error);
        }
    });
});

document.getElementById('editStaffForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    fetch('../api/update_staff.php', {
        method: 'POST',
        body: formData
    })
    .then(res => res.json())
    .then(data => {
        if(data.success) {
            alert('Staff updated successfully!');
            closeEditModal();
            fetchStaff();
        } else {
            alert('Error: ' + data.error);
        }
    });
});

// Load staff on page load
fetchStaff();
</script>

<?php require_once '../includes/footer.php'; ?>
