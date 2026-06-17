<?php
require_once 'config.php';
require_once 'includes/db.php';
require_once 'includes/auth.php';

if (isLoggedIn()) {
    header('Location: ' . BASE_URL . '/');
    exit;
}

$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username'] ?? '');
    $password = $_POST['password'] ?? '';

    if ($username && $password) {
        $stmt = $pdo->prepare("SELECT id, password_hash, role_id, full_name FROM users WHERE username = ?");
        $stmt->execute([$username]);
        $user = $stmt->fetch();

        if ($user && password_verify($password, $user['password_hash'])) {
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['role_id'] = $user['role_id'];
            $_SESSION['full_name'] = $user['full_name'];

            logActivity($pdo, $user['id'], 'LOGIN', 'User logged into the system.');

            switch ($user['role_id']) {
                case 1: header('Location: ' . BASE_URL . '/admin/'); break;
                case 2: header('Location: ' . BASE_URL . '/director/'); break;
                case 3: header('Location: ' . BASE_URL . '/storekeeper/'); break;
                case 4: header('Location: ' . BASE_URL . '/accountant/'); break;
                default: header('Location: ' . BASE_URL . '/'); break;
            }
            exit;
        } else {
            $error = "Invalid username or password.";
        }
    } else {
        $error = "Please fill in both fields.";
    }
}

require_once 'includes/header.php';
?>

<div class="auth-wrapper">
    <div class="card auth-card">
        <div class="auth-header">
            <h2>Welcome Back</h2>
            <p class="text-muted">Sign in to your farm management portal</p>
        </div>
        
        <?php if ($error): ?>
            <div class="alert alert-danger"><?= htmlspecialchars($error) ?></div>
        <?php endif; ?>

        <form method="POST" action="login.php">
            <div class="form-group">
                <label for="username" class="form-label">Username</label>
                <input type="text" id="username" name="username" class="form-control" placeholder="e.g. admin" required autofocus>
            </div>
            
            <div class="form-group">
                <label for="password" class="form-label">Password</label>
                <input type="password" id="password" name="password" class="form-control" placeholder="••••••••" required>
            </div>
            
            <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 1rem;">
                Secure Login
            </button>
        </form>
    </div>
</div>

<?php require_once 'includes/footer.php'; ?>
