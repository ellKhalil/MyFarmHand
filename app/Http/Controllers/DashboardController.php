<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $roleName = $user->role->role_name ?? null;

        return match ($roleName) {
            'Admin' => Inertia::render('Admin/Dashboard', ['user' => $user]),
            'Managing Director' => Inertia::render('Director/Dashboard', ['user' => $user]),
            'Store Keeper' => Inertia::render('Storekeeper/Dashboard', ['user' => $user]),
            'Accountant' => Inertia::render('Accountant/Dashboard', ['user' => $user]),
            default => Inertia::render('Dashboard'), // Fallback
        };
    }
}
