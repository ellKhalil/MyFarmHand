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

        return redirect()->back()->with('success', 'Transaction recorded successfully.');
    }

    public function export()
    {
        $transactions = FinancialTransaction::with('logger')->orderBy('transaction_date', 'desc')->get();

        $headers = [
            "Content-type"        => "text/csv",
            "Content-Disposition" => "attachment; filename=financial_ledger_" . date('Y-m-d') . ".csv",
            "Pragma"              => "no-cache",
            "Cache-Control"       => "must-revalidate, post-check=0, pre-check=0",
            "Expires"             => "0"
        ];

        $columns = ['Date', 'Type', 'Category', 'Amount (NGN)', 'Description', 'Logged By'];

        $callback = function() use($transactions, $columns) {
            $file = fopen('php://output', 'w');
            fputcsv($file, $columns);

            foreach ($transactions as $transaction) {
                $row['Date']  = $transaction->transaction_date;
                $row['Type']    = $transaction->type;
                $row['Category']  = $transaction->category;
                $row['Amount']  = $transaction->amount;
                $row['Description']  = $transaction->description;
                $row['Logged By']  = $transaction->logger ? $transaction->logger->name : 'System';

                fputcsv($file, array($row['Date'], $row['Type'], $row['Category'], $row['Amount'], $row['Description'], $row['Logged By']));
            }

            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }
}
