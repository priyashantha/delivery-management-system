<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index()
    {
        return Task::where('completed', false)
            ->latest()
            ->take(5)
            ->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'nullable|string',
        ]);

        return Task::create($validated);
    }

    public function markDone(Task $task)
    {
        $task->update(['completed' => true]);
        return response()->json(['message' => 'Task marked as done']);
    }
}
