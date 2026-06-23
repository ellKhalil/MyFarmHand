<?php

namespace App\Http\Controllers;

use App\Models\Department;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingsController extends Controller
{
    public function index()
    {
        $departments = Department::orderBy('name')->get();
        return Inertia::render('Modules/Settings', [
            'departments' => $departments
        ]);
    }

    public function storeDepartment(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:departments,name',
            'base_salary' => 'required|numeric|min:0'
        ]);

        Department::create([
            'name' => $request->name,
            'base_salary' => $request->base_salary
        ]);

        return redirect()->back()->with('success', 'Department added successfully.');
    }

    public function updateDepartment(Request $request, Department $department)
    {
        $request->validate([
            'base_salary' => 'required|numeric|min:0'
        ]);

        $department->update([
            'base_salary' => $request->base_salary
        ]);

        // Automatically synchronize the salary of all users in this department
        \App\Models\User::where('department', $department->name)->update([
            'base_salary' => $request->base_salary
        ]);

        return redirect()->back()->with('success', 'Department salary updated and synced to employees.');
    }

    public function destroyDepartment(Department $department)
    {
        $department->delete();
        return redirect()->back()->with('success', 'Department removed successfully.');
    }

    public function uploadLogo(Request $request)
    {
        $request->validate([
            'logo' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $user = auth()->user();
        $farm = \App\Models\Farm::find($user->farm_id);

        if ($request->file('logo')) {
            $path = $request->file('logo')->store('logos', 'public');
            $farm->update(['logo_path' => '/storage/' . $path]);
        }

        return redirect()->back()->with('success', 'Farm logo updated successfully.');
    }
}
