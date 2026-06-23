<?php

namespace App\Http\Controllers;

use App\Models\InventoryItem;
use App\Models\InventoryTransaction;
use App\Models\Notification;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class InventoryItemController extends Controller
{
    public function index(Request $request)
    {
        $query = InventoryItem::withCount('transactions');

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where('item_name', 'like', "%{$search}%")
                  ->orWhere('category', 'like', "%{$search}%");
        }

        $sortField = $request->input('sort_field', 'item_name');
        $sortDirection = $request->input('sort_direction', 'asc');

        $items = $query->orderBy($sortField, $sortDirection)->paginate(10)->withQueryString();

        return Inertia::render('Modules/Inventory', [
            'inventory' => $items,
            'filters' => $request->only(['search', 'sort_field', 'sort_direction'])
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'item_name' => 'required|string|max:100',
            'category' => 'required|in:Feed,Livestock,Produce,Medicine,Equipment,Consumable,Other',
            'quantity' => 'required|numeric|min:0',
            'unit' => 'required|string|max:20',
            'cost_per_unit' => 'required|numeric|min:0',
            'low_stock_threshold' => 'required|numeric|min:0',
        ]);

        InventoryItem::create($validated);

        return redirect()->back()->with('success', 'Item added to inventory.');
    }

    public function logTransaction(Request $request, InventoryItem $item)
    {
        $validated = $request->validate([
            'action_type' => 'required|in:Restock,Usage,Mortality/Loss',
            'quantity_changed' => 'required|numeric|min:0.01',
            'notes' => 'nullable|string',
        ]);

        // Calculate new quantity
        $newQuantity = $item->quantity;
        if ($validated['action_type'] === 'Restock') {
            $newQuantity += $validated['quantity_changed'];
        } else {
            $newQuantity -= $validated['quantity_changed'];
        }

        // Prevent negative stock
        if ($newQuantity < 0) {
            return redirect()->back()->withErrors(['quantity_changed' => 'Insufficient stock for this transaction.']);
        }

        // Update item quantity
        $item->update(['quantity' => $newQuantity]);

        // Record transaction
        InventoryTransaction::create([
            'item_id' => $item->id,
            'user_id' => Auth::id(),
            'action_type' => $validated['action_type'],
            'quantity_changed' => $validated['quantity_changed'],
            'notes' => $validated['notes'],
        ]);

        // Auto-log to Financial Ledger if it is a Restock (Purchase)
        if ($validated['action_type'] === 'Restock' && $item->cost_per_unit > 0) {
            $cost = $validated['quantity_changed'] * $item->cost_per_unit;
            \App\Models\FinancialTransaction::create([
                'type' => 'Expense',
                'amount' => $cost,
                'category' => 'Inventory Purchase',
                'description' => "Purchased {$validated['quantity_changed']} {$item->unit} of {$item->item_name}",
                'transaction_date' => now(),
                'logged_by' => Auth::id(),
            ]);
        }

        // Low stock check
        if ($newQuantity <= $item->low_stock_threshold) {
            $this->triggerLowStockAlert($item);
        }

        return redirect()->back()->with('success', 'Transaction logged successfully.');
    }

    private function triggerLowStockAlert(InventoryItem $item)
    {
        // Find Admins or Directors to notify
        $admins = User::whereHas('role', function($q) {
            $q->whereIn('role_name', ['Admin', 'Managing Director']);
        })->get();

        foreach ($admins as $admin) {
            Notification::create([
                'user_id' => $admin->id,
                'type' => 'LowStock',
                'message' => "Alert: Inventory for {$item->item_name} has fallen to {$item->quantity} {$item->unit}. Please restock.",
            ]);
        }
    }

    public function export()
    {
        $items = InventoryItem::orderBy('item_name', 'asc')->get();

        $headers = [
            "Content-type"        => "text/csv",
            "Content-Disposition" => "attachment; filename=inventory_report_" . date('Y-m-d') . ".csv",
            "Pragma"              => "no-cache",
            "Cache-Control"       => "must-revalidate, post-check=0, pre-check=0",
            "Expires"             => "0"
        ];

        $columns = ['Item Name', 'Category', 'Quantity', 'Unit', 'Cost Per Unit (NGN)', 'Low Stock Threshold'];

        $callback = function() use($items, $columns) {
            $file = fopen('php://output', 'w');
            fputcsv($file, $columns);

            foreach ($items as $item) {
                $row['Name']  = $item->item_name;
                $row['Category']    = $item->category;
                $row['Quantity']  = $item->quantity;
                $row['Unit']  = $item->unit;
                $row['Cost']  = $item->cost_per_unit;
                $row['Threshold']  = $item->low_stock_threshold;

                fputcsv($file, array($row['Name'], $row['Category'], $row['Quantity'], $row['Unit'], $row['Cost'], $row['Threshold']));
            }

            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }
}
