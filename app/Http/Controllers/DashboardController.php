<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\FinancialTransaction;
use App\Models\User;
use App\Models\Task;
use App\Models\InventoryItem;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        // Generate real metrics for the farm
        $metrics = [
            'total_revenue' => '₦' . number_format(FinancialTransaction::where('type', 'Income')->sum('amount'), 2),
            'active_employees' => User::count(),
            'pending_tasks' => Task::where('status', 'Pending')->count(),
            'inventory_alerts' => InventoryItem::whereColumn('quantity', '<=', 'low_stock_threshold')->count()
        ];

        // Generate real financial chart data for the last 6 months
        $chartData = [];
        for ($i = 5; $i >= 0; $i--) {
            $monthStart = Carbon::now()->subMonths($i)->startOfMonth();
            $monthEnd = Carbon::now()->subMonths($i)->endOfMonth();

            $income = FinancialTransaction::where('type', 'Income')
                        ->whereBetween('transaction_date', [$monthStart, $monthEnd])
                        ->sum('amount');

            $expense = FinancialTransaction::where('type', 'Expense')
                        ->whereBetween('transaction_date', [$monthStart, $monthEnd])
                        ->sum('amount');

            $chartData[] = [
                'month' => $monthStart->format('M'),
                'Income' => (float)$income,
                'Expenses' => (float)$expense,
            ];
        }

        return Inertia::render('Dashboard', [
            'user' => $user,
            'metrics' => $metrics,
            'chartData' => $chartData
        ]);
    }
}
