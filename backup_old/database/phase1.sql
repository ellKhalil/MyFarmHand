-- 1. Extend the existing users table
ALTER TABLE users
ADD COLUMN phone_number VARCHAR(20) NULL,
ADD COLUMN address TEXT NULL,
ADD COLUMN hire_date DATE NULL,
ADD COLUMN department ENUM('Poultry', 'Aquaculture', 'Dairy', 'Crops') NULL,
ADD COLUMN base_salary DECIMAL(10,2) DEFAULT 0.00;

-- 2. Create Payroll Table
CREATE TABLE IF NOT EXISTS payroll (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    month VARCHAR(20) NOT NULL,
    year INT NOT NULL,
    base_pay DECIMAL(10,2) NOT NULL,
    allowances JSON NULL,
    deductions JSON NULL,
    bonuses DECIMAL(10,2) DEFAULT 0.00,
    net_payable DECIMAL(10,2) NOT NULL,
    payment_status ENUM('Pending', 'Paid') DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 3. Create Inventory Items Table
CREATE TABLE IF NOT EXISTS inventory_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    item_name VARCHAR(100) NOT NULL,
    category ENUM('Consumable', 'Equipment', 'Living Asset') NOT NULL,
    quantity DECIMAL(10,2) DEFAULT 0.00,
    unit VARCHAR(20) NOT NULL,
    supplier_id INT NULL,
    cost_per_unit DECIMAL(10,2) DEFAULT 0.00,
    low_stock_threshold DECIMAL(10,2) DEFAULT 10.00,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 4. Create Inventory Transactions Table
CREATE TABLE IF NOT EXISTS inventory_transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    item_id INT NOT NULL,
    user_id INT NOT NULL,
    action_type ENUM('Restock', 'Usage', 'Mortality/Loss') NOT NULL,
    quantity_changed DECIMAL(10,2) NOT NULL,
    transaction_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    notes TEXT,
    FOREIGN KEY (item_id) REFERENCES inventory_items(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE RESTRICT
);
