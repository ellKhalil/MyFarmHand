<?php

namespace App\Http\Controllers;

use App\Models\FinancialTransaction;
use App\Models\ProductionBatch;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AnalyticsController extends Controller
{
    public function getChartData()
    {
        // Example: Monthly Revenue vs Expenses
        $financeData = FinancialTransaction::selectRaw("
            DATE_FORMAT(transaction_date, '%Y-%m') as month,
            SUM(CASE WHEN type = 'Income' THEN amount ELSE 0 END) as revenue,
            SUM(CASE WHEN type = 'Expense' THEN amount ELSE 0 END) as expenses
        ")
        ->groupBy('month')
        ->orderBy('month')
        ->take(12)
        ->get();

        // Example: Mortality rate per batch
        $mortalityData = ProductionBatch::withSum('logs', 'mortality_count')
            ->where('status', '!=', 'Depleted')
            ->get()
            ->map(function ($batch) {
                return [
                    'name' => $batch->batch_name,
                    'initial' => $batch->initial_population,
                    'mortality' => $batch->logs_sum_mortality_count ?? 0,
                ];
            });

        return response()->json([
            'finance' => $financeData,
            'mortality' => $mortalityData,
        ]);
    }
}
