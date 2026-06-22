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
        // Generate some mock metrics for a premium feel
        $metrics = [
            'total_revenue' => '₦4,250,000',
            'active_employees' => 24,
            'pending_tasks' => 5,
            'inventory_alerts' => 2
        ];

        return Inertia::render('Dashboard', [
            'user' => $user,
            'metrics' => $metrics
        ]);
    }
}
