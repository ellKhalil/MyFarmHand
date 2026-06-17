<?php require_once 'includes/header.php'; ?>

<!-- Ambient animated background -->
<div class="ambient-bg">
    <div class="ambient-orb orb-1"></div>
    <div class="ambient-orb orb-2"></div>
    <div class="ambient-orb orb-3"></div>
</div>

<div class="landing-hero container">
    <div class="hero-grid">
        <div class="hero-text">
            <span class="hero-badge">Next-Gen AgriTech</span>
            <h1>Manage Your Farm with <span class="text-gradient">Intelligence</span></h1>
            <p>A beautifully orchestrated system designed specifically for Administrators, Managing Directors, and Store Keepers to oversee field operations, track inventory metrics, and scale growth effortlessly.</p>
            
            <div class="hero-actions">
                <?php if(!isset($_SESSION['user_id'])): ?>
                    <a href="<?= BASE_URL ?>/login.php" class="btn btn-primary">
                        Access Portal 
                        <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </a>
                    <a href="#features" class="btn btn-secondary">Explore Features</a>
                <?php else: ?>
                    <?php 
                        $dashUrl = BASE_URL . '/';
                        if($_SESSION['role_id'] == 1) $dashUrl .= 'admin/';
                        elseif($_SESSION['role_id'] == 2) $dashUrl .= 'director/';
                        elseif($_SESSION['role_id'] == 3) $dashUrl .= 'storekeeper/';
                    ?>
                    <a href="<?= $dashUrl ?>" class="btn btn-primary">
                        Go to Dashboard
                        <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </a>
                <?php endif; ?>
            </div>
        </div>
        
        <div class="hero-visual">
            <div class="glass-card" style="padding: 2rem; position: relative; background: rgba(255,255,255,0.85);">
                <!-- Decorative Mockup Element -->
                <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(0,0,0,0.05); padding-bottom: 1rem; margin-bottom: 1.5rem;">
                    <div style="display: flex; gap: 0.5rem;">
                        <div style="width:12px; height:12px; border-radius:50%; background:#EF4444;"></div>
                        <div style="width:12px; height:12px; border-radius:50%; background:#F59E0B;"></div>
                        <div style="width:12px; height:12px; border-radius:50%; background:#10B981;"></div>
                    </div>
                    <div style="font-weight: 600; color:var(--primary-dark); font-size: 0.875rem;">System Overview</div>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                    <div style="background: rgba(16,185,129,0.05); border: 1px solid rgba(16,185,129,0.1); border-radius: var(--radius-sm); padding: 1.5rem;">
                        <div style="color:var(--primary-color); font-size: 2rem; margin-bottom: 0.5rem;">🌿</div>
                        <div style="font-size: 2rem; font-weight: 800; color: var(--text-main);">+24%</div>
                        <div style="color:var(--text-muted); font-size: 0.875rem;">Crop Yield</div>
                    </div>
                    <div style="background: rgba(245,158,11,0.05); border: 1px solid rgba(245,158,11,0.1); border-radius: var(--radius-sm); padding: 1.5rem;">
                        <div style="color:var(--accent-color); font-size: 2rem; margin-bottom: 0.5rem;">📦</div>
                        <div style="font-size: 2rem; font-weight: 800; color: var(--text-main);">1,284</div>
                        <div style="color:var(--text-muted); font-size: 0.875rem;">Stock Items</div>
                    </div>
                </div>
                
                <div style="margin-top: 1rem; background: rgba(59,130,246,0.05); border: 1px solid rgba(59,130,246,0.1); border-radius: var(--radius-sm); padding: 1.5rem; display: flex; align-items: center; justify-content: space-between;">
                    <div>
                        <div style="font-weight: 700;">Global Efficiency</div>
                        <div style="color:var(--text-muted); font-size: 0.875rem;">Across all operational sectors</div>
                    </div>
                    <div style="background: white; padding: 0.5rem 1rem; border-radius: 999px; font-weight: 800; color: #3B82F6; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">98%</div>
                </div>
            </div>
            
            <!-- Floating Elements -->
            <div style="position: absolute; top: -20px; right: -10px; background: white; padding: 1rem 1.5rem; border-radius: var(--radius-full); box-shadow: var(--shadow-lg); font-weight: 700; color: var(--primary-dark); display: flex; align-items: center; gap: 0.5rem; animation: floatOrb 6s infinite alternate ease-in-out;">
                <span>✨</span> Real-time Sync
            </div>
        </div>
    </div>
</div>

<div id="features" class="feature-section container">
    <div class="section-header">
        <h2 class="text-gradient">Empowering Every Role</h2>
        <p>A unified interface seamlessly adapting to the specialized needs of your entire agricultural team.</p>
    </div>
    
    <div class="feature-grid">
        <div class="glass-card feature-card">
            <div class="feature-icon-wrapper">
                👨‍💼
            </div>
            <h3>Administration</h3>
            <p>Retain full control over user access, security roles, system-wide configurations, and underlying structural settings.</p>
        </div>
        
        <div class="glass-card feature-card">
            <div class="feature-icon-wrapper" style="background: linear-gradient(135deg, rgba(245,158,11,0.1), rgba(245,158,11,0.05)); border-color: rgba(245,158,11,0.2);">
                📊
            </div>
            <h3>Analytics & Directing</h3>
            <p>Access high-level overviews of farm productivity, review beautifully rendered financial metrics, and drive executive decisions.</p>
        </div>
        
        <div class="glass-card feature-card">
            <div class="feature-icon-wrapper" style="background: linear-gradient(135deg, rgba(59,130,246,0.1), rgba(59,130,246,0.05)); border-color: rgba(59,130,246,0.2);">
                📦
            </div>
            <h3>Inventory & Stock</h3>
            <p>Effortlessly track daily stock usage, restock items dynamically, and monitor seed and fertilizer levels to prevent shortage.</p>
        </div>
    </div>
</div>

<div class="container" style="padding-bottom: 8rem; text-align: center;">
    <div class="glass-card" style="background: linear-gradient(135deg, var(--primary-dark), var(--bg-dark)); color: white; border: none;">
        <h2 style="color: white; font-size: 2.5rem; margin-bottom: 1.5rem;">Ready to Transform Your Yield?</h2>
        <p style="color: rgba(255,255,255,0.8); font-size: 1.25rem; max-width: 600px; margin: 0 auto 2.5rem;">Join the standard in agricultural intelligence. Streamline everything from seedling to sale.</p>
        
        <?php if(!isset($_SESSION['user_id'])): ?>
            <a href="<?= BASE_URL ?>/login.php" class="btn btn-accent" style="padding: 1rem 3rem; font-size: 1.125rem;">
                Sign In Now
            </a>
        <?php else: ?>
            <a href="<?= $dashUrl ?>" class="btn btn-accent" style="padding: 1rem 3rem; font-size: 1.125rem;">
                Go to Dashboard
            </a>
        <?php endif; ?>
    </div>
</div>

<?php require_once 'includes/footer.php'; ?>
