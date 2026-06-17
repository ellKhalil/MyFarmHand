CREATE TABLE IF NOT EXISTS production_batches (
    id INT AUTO_INCREMENT PRIMARY KEY,
    batch_name VARCHAR(100) NOT NULL,
    department ENUM('Poultry', 'Aquaculture', 'Dairy', 'Crops') NOT NULL,
    start_date DATE NOT NULL,
    status ENUM('Active', 'Completed') DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS production_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    batch_id INT NOT NULL,
    user_id INT NOT NULL,
    log_date DATE NOT NULL,
    yield_amount DECIMAL(10,2) NOT NULL,
    yield_unit VARCHAR(20) NOT NULL,
    quality_rating INT NULL, -- 1 to 5
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (batch_id) REFERENCES production_batches(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE RESTRICT
);

-- Insert some dummy batches for demonstration
INSERT IGNORE INTO production_batches (id, batch_name, department, start_date) VALUES 
(1, 'Layer Flock A (Spring)', 'Poultry', '2026-04-01'),
(2, 'Holstein Herd 1', 'Dairy', '2026-01-15'),
(3, 'North Field Wheat', 'Crops', '2026-03-20');
