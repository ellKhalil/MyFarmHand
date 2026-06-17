<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Insert Roles
        $roles = [
            ['id' => 1, 'role_name' => 'Admin', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['id' => 2, 'role_name' => 'Managing Director', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['id' => 3, 'role_name' => 'Store Keeper', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['id' => 4, 'role_name' => 'Accountant', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
        ];

        DB::table('roles')->insertOrIgnore($roles);

        // Insert Admin User
        DB::table('users')->insertOrIgnore([
            'id' => 1,
            'name' => 'System Administrator',
            'email' => 'admin@myfarmhand.com',
            'password' => Hash::make('Admin123!'),
            'role_id' => 1,
            'phone_number' => null,
            'address' => null,
            'hire_date' => Carbon::now()->format('Y-m-d'),
            'department' => null,
            'base_salary' => 0.00,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
        
        // You can add more dummy data here for production batches, etc.
    }
}
