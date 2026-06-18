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
    public function index(Request $request)
    {
        $query = User::with('role');

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('department', 'like', "%{$search}%");
        }

        $sortField = $request->input('sort_field', 'created_at');
        $sortDirection = $request->input('sort_direction', 'desc');

        $users = $query->orderBy($sortField, $sortDirection)->paginate(10)->withQueryString();
        $roles = Role::all();
        $departments = \App\Models\Department::orderBy('name')->get();
        
        return Inertia::render('Modules/Users', [
            'users' => $users,
            'roles' => $roles,
            'departments' => $departments,
            'filters' => $request->only(['search', 'sort_field', 'sort_direction'])
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'role_id' => 'required|exists:roles,id',
            'department' => 'required|string|exists:departments,name',
            'hire_date' => 'nullable|date',
            'phone_number' => 'nullable|string|max:20',
        ]);

        $department = \App\Models\Department::where('name', $request->department)->first();

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make('password'), // Default password
            'role_id' => $request->role_id,
            'department' => $request->department,
            'base_salary' => $department ? $department->base_salary : 0,
            'hire_date' => $request->hire_date ?: now()->format('Y-m-d'),
            'phone_number' => $request->phone_number,
        ]);

        return redirect()->back()->with('success', 'Employee onboarded successfully. Default password is "password".');
    }
}
