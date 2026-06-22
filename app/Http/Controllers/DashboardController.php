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
        // Generate mock financial chart data for the last 6 months
        $chartData = [
            ['month' => 'Jan', 'Income' => 1200000, 'Expenses' => 800000],
            ['month' => 'Feb', 'Income' => 1350000, 'Expenses' => 850000],
            ['month' => 'Mar', 'Income' => 1800000, 'Expenses' => 900000],
            ['month' => 'Apr', 'Income' => 1600000, 'Expenses' => 1100000],
            ['month' => 'May', 'Income' => 2100000, 'Expenses' => 1200000],
            ['month' => 'Jun', 'Income' => 2400000, 'Expenses' => 1350000],
        ];

        return Inertia::render('Dashboard', [
            'user' => $user,
            'metrics' => $metrics,
            'chartData' => $chartData
        ]);
    }
}
