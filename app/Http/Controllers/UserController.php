<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Illuminate\Validation\Rules;

class UserController extends Controller
{
    public function index()
    {
        $users = User::with('role')->orderBy('created_at', 'desc')->get();
        $roles = Role::all();
        
        return Inertia::render('Modules/Users', [
            'users' => $users,
            'roles' => $roles,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'role_id' => 'required|exists:roles,id',
            'department' => 'nullable|string|max:255',
            'base_salary' => 'nullable|numeric|min:0',
            'hire_date' => 'nullable|date',
            'phone_number' => 'nullable|string|max:20',
        ]);

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make('password'), // Default password
            'role_id' => $request->role_id,
            'department' => $request->department,
            'base_salary' => $request->base_salary ?: 0,
            'hire_date' => $request->hire_date ?: now()->format('Y-m-d'),
            'phone_number' => $request->phone_number,
        ]);

        return redirect()->back()->with('success', 'Employee onboarded successfully. Default password is "password".');
    }
}
