<?php

namespace App\Http\Controllers;

use App\Models\Payroll;
use App\Models\User;
use App\Models\FinancialTransaction;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class PayrollController extends Controller
{
    public function generate(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'month' => 'required|integer|between:1,12',
            'year' => 'required|integer|min:2020',
            'base_pay' => 'required|numeric|min:0',
            'allowances' => 'nullable|array',
            'deductions' => 'nullable|array',
            'bonuses' => 'nullable|numeric|min:0',
        ]);

        $allowancesTotal = collect($validated['allowances'] ?? [])->sum('amount');
        $deductionsTotal = collect($validated['deductions'] ?? [])->sum('amount');
        $netPayable = $validated['base_pay'] + $allowancesTotal + ($validated['bonuses'] ?? 0) - $deductionsTotal;

        $payroll = Payroll::create([
            'user_id' => $validated['user_id'],
            'month' => $validated['month'],
            'year' => $validated['year'],
            'base_pay' => $validated['base_pay'],
            'allowances' => $validated['allowances'] ?? [],
            'deductions' => $validated['deductions'] ?? [],
            'bonuses' => $validated['bonuses'] ?? 0,
            'net_payable' => $netPayable,
            'payment_status' => 'Pending',
        ]);

        return redirect()->back()->with('success', 'Payroll slip generated successfully.');
    }

    public function markAsPaid(Request $request, Payroll $payroll)
    {
        DB::transaction(function () use ($payroll) {
            $payroll->update(['payment_status' => 'Paid']);

            // Automatically log this into the financial ledger as an expense
            FinancialTransaction::create([
                'type' => 'Expense',
                'amount' => $payroll->net_payable,
                'category' => 'Payroll',
                'description' => "Salary payment for {$payroll->user->name} ({$payroll->month}/{$payroll->year})",
                'transaction_date' => now(),
                'logged_by' => Auth::id(),
            ]);
        });

        return redirect()->back()->with('success', 'Payroll marked as paid and recorded in ledger.');
    }
}
