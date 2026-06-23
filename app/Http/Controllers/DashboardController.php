<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Task;
use App\Models\InventoryItem;
use App\Models\FinancialTransaction;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user()->load('role');
        
        // Fetch real metrics from the database
        $activeEmployees = User::count();
        $pendingTasks = Task::where('status', '!=', 'completed')->count();
        $inventoryAlerts = InventoryItem::where('quantity', '<', 50)->count();
        $totalRevenue = FinancialTransaction::where('type', 'income')->sum('amount');
        
        $metrics = [
            'total_revenue' => '₦' . number_format($totalRevenue, 2),
            'active_employees' => $activeEmployees,
            'pending_tasks' => $pendingTasks,
            'inventory_alerts' => $inventoryAlerts
        ];

        // Fetch recent activity (latest 5 tasks)
        $recentActivity = Task::with('assignedUser')->latest()->take(5)->get();
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
            'chartData' => $chartData,
            'recentActivity' => $recentActivity
        ]);
    }
}
