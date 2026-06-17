<?php

namespace App\Http\Controllers;

use App\Models\FinancialTransaction;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class FinancialTransactionController extends Controller
{
    public function index()
    {
        $transactions = FinancialTransaction::orderBy('transaction_date', 'desc')->take(20)->get();
        return Inertia::render('Modules/Finance', [
            'transactions' => $transactions
        ]);
    }
    public function store(Request $request)
    {
        $validated = $request->validate([
            'type' => 'required|in:Income,Expense',
            'amount' => 'required|numeric|min:0.01',
            'category' => 'required|string|max:50',
            'description' => 'required|string',
            'transaction_date' => 'required|date',
        ]);

        FinancialTransaction::create([
            ...$validated,
            'logged_by' => Auth::id(),
        ]);

        return redirect()->back()->with('success', 'Transaction added to the ledger.');
    }
}
