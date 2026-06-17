<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    public function index()
    {
        $tasks = Task::orderBy('created_at', 'desc')->get();
        return Inertia::render('Modules/Tasks', [
            'tasks' => $tasks
        ]);
    }
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'assigned_to' => 'nullable|exists:users,id',
            'due_date' => 'nullable|date',
        ]);

        Task::create([
            ...$validated,
            'created_by' => Auth::id(),
            'status' => 'Pending',
        ]);

        return redirect()->back()->with('success', 'Task assigned successfully.');
    }

    public function updateStatus(Request $request, Task $task)
    {
        $validated = $request->validate([
            'status' => 'required|in:Pending,In Progress,Completed'
        ]);

        $task->update(['status' => $validated['status']]);

        return redirect()->back()->with('success', 'Task status updated.');
    }
}
