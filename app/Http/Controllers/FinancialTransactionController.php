<?php

namespace App\Http\Controllers;

use App\Models\FinancialTransaction;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class FinancialTransactionController extends Controller
{
    public function index(Request $request)
    {
        $query = FinancialTransaction::query();

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where('category', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
        }

        $sortField = $request->input('sort_field', 'transaction_date');
        $sortDirection = $request->input('sort_direction', 'desc');

        $transactions = $query->orderBy($sortField, $sortDirection)->paginate(10)->withQueryString();

        return Inertia::render('Modules/Finance', [
            'transactions' => $transactions,
            'filters' => $request->only(['search', 'sort_field', 'sort_direction'])
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
