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
    public function index()
    {
        $items = InventoryItem::withCount('transactions')->get();
        return Inertia::render('Modules/Inventory', [
            'inventory' => $items
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
}
