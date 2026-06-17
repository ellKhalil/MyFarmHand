# MyFarmHand ERP 🌾

**MyFarmHand** is a comprehensive Enterprise Resource Planning (ERP) application designed specifically for modern agricultural operations. It brings institutional-grade efficiency to farm management by centralizing inventory, production yields, payroll, and daily tasks into a single, clean, and professional dashboard.

## 🚀 Tech Stack

This project was built and migrated from vanilla PHP to a robust modern web stack:
- **Backend:** Laravel (PHP)
- **Frontend:** React + Inertia.js
- **Styling:** Tailwind CSS (Corporate Flat Design)
- **Charts:** Recharts (Data visualization)
- **Database:** MySQL

## 🛠️ Features

* **Role-Based Access Control (RBAC):** Segregated dashboards for `Admin`, `Managing Director`, `Store Keeper`, and `Accountant`.
* **Inventory Control:** Track feed, livestock, and supplies with automated low-stock threshold alerts.
* **Production & Yield Tracking:** Log daily yields (Eggs, Milk, Crops), track batch mortality rates, and analyze performance across departments.
* **Financial Ledger:** Keep a detailed record of operational expenses and sales revenue for full P&L reports.
* **Task Management:** Assign and monitor daily farm operations and work orders.
* **Analytics Dashboard:** Real-time visual tracking of yields, burn rates, and financial health.

## ⚙️ Local Development Setup

Follow these instructions to run the project locally.

### Prerequisites
* PHP 8.2+
* Composer
* Node.js & npm
* MySQL / MariaDB (e.g., via MAMP or XAMPP)

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/MyFarmHand.git
   cd MyFarmHand
   ```

2. **Install PHP and Node dependencies:**
   ```bash
   composer install
   npm install --legacy-peer-deps
   ```

3. **Environment Setup:**
   Duplicate the `.env.example` file and rename it to `.env`, or manually create the `.env` file. Update your database credentials:
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=8889  # Use 3306 if not using MAMP
   DB_DATABASE=myfarmhand
   DB_USERNAME=root
   DB_PASSWORD=root
   ```

4. **Generate App Key:**
   ```bash
   php artisan key:generate
   ```

5. **Run Database Migrations and Seeders:**
   This will create the necessary tables and populate the default Roles and the default Admin user.
   ```bash
   php artisan migrate:fresh --seed
   ```
   **Default Admin Credentials:**
   * **Email:** `admin@myfarmhand.com`
   * **Password:** `Admin123!`

6. **Start the Development Servers:**
   You will need to run both the Laravel backend and the Vite frontend compiler simultaneously:
   
   *Terminal 1 (Backend):*
   ```bash
   php artisan serve
   ```
   *Terminal 2 (Frontend):*
   ```bash
   npm run dev
   ```

7. **Access the Application:**
   Open your browser and navigate to [http://localhost:8000](http://localhost:8000).

## 🔒 Security
Authentication and session management is securely handled by Laravel Breeze. Passwords are encrypted using Bcrypt. 

## 📝 License
This project is proprietary software designed for internal agricultural management.
