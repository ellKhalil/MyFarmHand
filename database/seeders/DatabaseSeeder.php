<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 0. Insert Farms
        $farms = [
            ['id' => 1, 'name' => 'Green Acres Farm', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['id' => 2, 'name' => 'Sunrise Poultry', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
        ];
        DB::table('farms')->insertOrIgnore($farms);

        // 1. Insert Roles
        $roles = [
            ['id' => 1, 'role_name' => 'Admin', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['id' => 2, 'role_name' => 'Managing Director', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['id' => 3, 'role_name' => 'Store Keeper', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['id' => 4, 'role_name' => 'Accountant', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
        ];
        DB::table('roles')->insertOrIgnore($roles);

        // 2. Insert Test Users
        $users = [
            ['id' => 1, 'farm_id' => 1, 'name' => 'System Administrator', 'email' => 'admin@myfarmhand.com', 'password' => Hash::make('password'), 'role_id' => 1, 'phone_number' => null, 'address' => null, 'hire_date' => Carbon::now()->format('Y-m-d'), 'department' => null, 'base_salary' => 0.00, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['id' => 2, 'farm_id' => 1, 'name' => 'Managing Director', 'email' => 'director@myfarmhand.com', 'password' => Hash::make('password'), 'role_id' => 2, 'phone_number' => null, 'address' => null, 'hire_date' => Carbon::now()->format('Y-m-d'), 'department' => null, 'base_salary' => 0.00, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['id' => 3, 'farm_id' => 1, 'name' => 'Head Store Keeper', 'email' => 'store@myfarmhand.com', 'password' => Hash::make('password'), 'role_id' => 3, 'phone_number' => null, 'address' => null, 'hire_date' => Carbon::now()->format('Y-m-d'), 'department' => null, 'base_salary' => 0.00, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['id' => 4, 'farm_id' => 1, 'name' => 'Chief Accountant', 'email' => 'accountant@myfarmhand.com', 'password' => Hash::make('password'), 'role_id' => 4, 'phone_number' => null, 'address' => null, 'hire_date' => Carbon::now()->format('Y-m-d'), 'department' => null, 'base_salary' => 0.00, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['id' => 5, 'farm_id' => 2, 'name' => 'Farm B Admin', 'email' => 'adminB@myfarmhand.com', 'password' => Hash::make('password'), 'role_id' => 1, 'phone_number' => null, 'address' => null, 'hire_date' => Carbon::now()->format('Y-m-d'), 'department' => null, 'base_salary' => 0.00, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
        ];
        DB::table('users')->insertOrIgnore($users);

        // 3. Insert Dummy Inventory
        $inventory = [
            ['id' => 1, 'farm_id' => 1, 'item_name' => 'Layer Feed (Finisher)', 'category' => 'Feed', 'quantity' => 120, 'unit' => 'Bags', 'cost_per_unit' => 25.00, 'low_stock_threshold' => 20, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['id' => 2, 'farm_id' => 1, 'item_name' => 'Broiler Starter', 'category' => 'Feed', 'quantity' => 15, 'unit' => 'Bags', 'cost_per_unit' => 28.50, 'low_stock_threshold' => 30, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['id' => 3, 'farm_id' => 1, 'item_name' => 'Amoxicillin Antibiotic', 'category' => 'Medicine', 'quantity' => 50, 'unit' => 'Bottles', 'cost_per_unit' => 12.00, 'low_stock_threshold' => 15, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['id' => 4, 'farm_id' => 2, 'item_name' => 'Farm B Exclusive Item', 'category' => 'Equipment', 'quantity' => 5, 'unit' => 'Pcs', 'cost_per_unit' => 100.00, 'low_stock_threshold' => 1, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
        ];
        DB::table('inventory_items')->insertOrIgnore($inventory);

        // 4. Insert Dummy Production Batches & Logs
        $batches = [
            ['id' => 1, 'farm_id' => 1, 'batch_name' => 'Broiler Batch 001', 'department' => 'Poultry', 'start_date' => Carbon::now()->subMonths(2), 'initial_population' => 5000, 'status' => 'Active', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['id' => 2, 'farm_id' => 1, 'batch_name' => 'Catfish Pond A', 'department' => 'Fishery', 'start_date' => Carbon::now()->subMonths(4), 'initial_population' => 10000, 'status' => 'Active', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
        ];
        DB::table('production_batches')->insertOrIgnore($batches);

        $logs = [
            ['batch_id' => 1, 'user_id' => 1, 'log_date' => Carbon::now()->subWeeks(6), 'yield_amount' => 0, 'yield_unit' => null, 'quality_rating' => null, 'mortality_count' => 12, 'notes' => 'Early chick mortality', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['batch_id' => 1, 'user_id' => 1, 'log_date' => Carbon::now()->subWeeks(3), 'yield_amount' => 0, 'yield_unit' => null, 'quality_rating' => null, 'mortality_count' => 5, 'notes' => 'Routine check', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['batch_id' => 2, 'user_id' => 1, 'log_date' => Carbon::now()->subMonths(1), 'yield_amount' => 0, 'yield_unit' => null, 'quality_rating' => null, 'mortality_count' => 150, 'notes' => 'Water PH drop', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
        ];
        DB::table('production_logs')->insertOrIgnore($logs);

        // 5. Insert Dummy Financial Transactions
        $finance = [
            ['farm_id' => 1, 'type' => 'Income', 'amount' => 15000.00, 'category' => 'Egg Sales', 'description' => 'Weekly egg supply to market', 'transaction_date' => Carbon::now()->subDays(10), 'logged_by' => 4, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['farm_id' => 1, 'type' => 'Income', 'amount' => 8500.00, 'category' => 'Meat Sales', 'description' => 'Wholesale broiler purchase', 'transaction_date' => Carbon::now()->subDays(25), 'logged_by' => 4, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['farm_id' => 1, 'type' => 'Expense', 'amount' => 4000.00, 'category' => 'Feed Purchase', 'description' => '100 bags of feed', 'transaction_date' => Carbon::now()->subDays(5), 'logged_by' => 4, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['farm_id' => 1, 'type' => 'Expense', 'amount' => 1200.00, 'category' => 'Utilities', 'description' => 'Diesel for generator', 'transaction_date' => Carbon::now()->subDays(2), 'logged_by' => 4, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
        ];
        DB::table('financial_transactions')->insertOrIgnore($finance);
    }
}
