<?php

namespace App\Http\Controllers;

use App\Models\ProductionBatch;
use App\Models\ProductionLog;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class ProductionController extends Controller
{
    public function storeBatch(Request $request)
    {
        $validated = $request->validate([
            'batch_name' => 'required|string|max:100',
            'department' => 'required|in:Poultry,Fishery,Livestock,Crop',
            'start_date' => 'required|date',
            'initial_population' => 'required|numeric|min:1',
        ]);

        ProductionBatch::create([
            ...$validated,
            'status' => 'Active',
        ]);

        return redirect()->back()->with('success', 'Production batch initiated.');
    }

    public function logProduction(Request $request, ProductionBatch $batch)
    {
        $validated = $request->validate([
            'log_date' => 'required|date',
            'yield_amount' => 'nullable|numeric|min:0',
            'yield_unit' => 'nullable|string',
            'quality_rating' => 'nullable|in:A,B,C,Reject',
            'mortality_count' => 'nullable|integer|min:0',
            'notes' => 'nullable|string',
        ]);

        ProductionLog::create([
            ...$validated,
            'batch_id' => $batch->id,
            'user_id' => Auth::id(),
        ]);

        // If mortality count reduces population to 0, automatically mark batch as completed/depleted
        if ($batch->current_population <= 0) {
            $batch->update(['status' => 'Depleted']);
        }

        return redirect()->back()->with('success', 'Production log recorded successfully.');
    }
}
