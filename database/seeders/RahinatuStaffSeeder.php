<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;
use App\Models\Role;
use App\Models\User;

class RahinatuStaffSeeder extends Seeder
{
    public function run(): void
    {
        // Add a general Staff role if it doesn't exist
        Role::firstOrCreate(
            ['id' => 5],
            ['role_name' => 'General Staff', 'created_at' => now(), 'updated_at' => now()]
        );

        $staffData = [
            ['Hamza Nasiru Muktar', 'General', 'Farm Manager', '2020-10-01', 65000, 2], // Managing Director Role
            ['Dr Sadik Hassan', 'General', 'Veterinary Consultant', '2021-12-01', 40000, 5],
            ['Alh Kabiru Garba', 'Admin and Accounts', 'Senior Assistant Manager', '2023-04-01', 60000, 1], // Admin Role
            ['Jamilu Auwalu Darma', 'Admin and Accounts', 'Assistant Manager', '2020-05-01', 55000, 1],
            ['Ali Garba', 'Admin and Accounts', 'Senior Security Officer', '2013-01-01', 30000, 5],
            ['Nura Abdullahi', 'Admin and Accounts', 'Cleaner', '2021-07-01', 5000, 5],
            ['Mubarak Lawan', 'Admin and Accounts', 'Admin & Accounts Assistant', '2021-03-01', 30000, 4], // Accountant Role
            ['Abubakar Auwalu', 'Admin and Accounts', 'Driver', '2022-07-01', 25000, 5],
            ['Adamu Bala Ishaq', 'Admin and Accounts', 'Adult Literacy Teacher', '2022-05-01', 15000, 5],
            ['Ahmad Auwal Ahmad', 'Egg', 'Egg Supervisor', '2022-05-01', 37000, 5],
            ['Halliru Shuaibu', 'Egg', 'Senior Mill Attendant', '2010-01-01', 40000, 5],
            ['Alkasim', 'Egg', 'Mill Attendant I', '2023-02-01', 12000, 5],
            ['Aminu Abdullahi', 'Egg', 'Egg Attendant I', '2020-08-01', 25000, 5],
            ['Uzairu Abdullahi', 'Egg', 'Egg Attendant I', '2022-07-01', 29000, 5],
            ['Sani Idris', 'Egg', 'Egg Attendant I', '2021-05-01', 24000, 5],
            ['Salisu Hassan', 'Egg', 'Egg Attendant I', '2021-12-01', 25000, 5],
            ['Muhammad Isyaku', 'Egg', 'Egg Attendant I', '2022-03-12', 24000, 5],
            ['Sabo Usman', 'Egg', 'Egg Attendant I', '2022-07-01', 24000, 5],
            ['Abubakar Umar Ali', 'Noiler', 'Noiler Attendant I', '2018-06-01', 35000, 5],
            ['Tanimu Inusa', 'Noiler', 'Noiler Attendant I', '2022-11-01', 24000, 5],
            ['Muktar Faruk', 'Noiler', 'Temporary Staff', '2022-12-01', 10000, 5],
            ['Aliyu Umar', 'Broiler', 'Broiler Attendant I', '2022-02-01', 30000, 5],
            ['Kabiru Muhammad Idris', 'Greenhouse', 'Assistant Manager (Dizengoff)', '2021-07-01', 20000, 5],
            ['Ibrahim Muhammad', 'Greenhouse', 'Greenhouse Supervisor', '2022-06-01', 35000, 5],
            ['Aminu Adamu', 'Greenhouse', 'Senior Greenhouse Attendant', '2021-09-01', 30000, 5],
            ['Yahaya Abdullahi', 'Greenhouse', 'Senior Greenhouse Attendant', '2021-01-01', 60000, 5],
            ['Ayuba Ahmad Umar', 'Greenhouse', 'Greenhouse Attendant I', '2022-01-01', 24000, 5],
            ['Umar Garba', 'Greenhouse', 'Greenhouse Attendant I', '2022-01-01', 24000, 5],
            ['Mahmud Mahmud', 'Greenhouse', 'Temporary staff', '2022-12-01', 30000, 5],
            ['Abdullahi Usman', 'Ruminant', 'Senoir Ruminant Attendant', '2016-01-01', 30000, 5],
            ['Babangida Isyaku', 'Ruminant', 'Ruminant Shade Cleaner', '2022-06-01', 20000, 5],
            ['Basiru Abubakar', 'Fisheries', 'Fish Attendant I', '2021-09-01', 24000, 5],
            ['Yau Adamu', 'Gundutse Arable farm', 'Supervisor', '2022-06-01', 15000, 5],
            ['Adamu Alhaji Muhammad', 'Cotton Company', 'Security Officer', null, 24000, 5]
        ];

        foreach ($staffData as $index => $data) {
            // Generate email from name
            $cleanName = preg_replace('/[^a-zA-Z0-9\s]/', '', $data[0]);
            $emailPrefix = strtolower(str_replace(' ', '.', $cleanName));
            $email = $emailPrefix . '@rahinatufarms.com';
            
            // To prevent duplicate emails for simple names like "Alkasim"
            if (User::where('email', $email)->exists()) {
                $email = $emailPrefix . $index . '@rahinatufarms.com';
            }

            User::updateOrCreate(
                ['email' => $email],
                [
                    'name' => $data[0],
                    'department' => $data[1], // Section -> Department
                    // Appending Position to department for visibility if needed, or we can just keep department.
                    // Wait, the User model only has department, not position. I will combine them for better context: "Egg (Egg Supervisor)"
                    'department' => $data[1] . ' - ' . $data[2], 
                    'hire_date' => $data[3],
                    'base_salary' => $data[4],
                    'role_id' => $data[5],
                    'password' => Hash::make('password'),
                    'created_at' => now(),
                    'updated_at' => now()
                ]
            );
        }
    }
}
