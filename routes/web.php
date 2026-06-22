<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', [\App\Http\Controllers\DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Inventory - Admins, Directors, Store Keepers
    Route::middleware('role:Admin,Managing Director,Store Keeper')->group(function() {
        Route::get('/inventory', [\App\Http\Controllers\InventoryItemController::class, 'index'])->name('inventory.index');
        Route::post('/inventory/items', [\App\Http\Controllers\InventoryItemController::class, 'store'])->name('inventory.store');
        Route::post('/inventory/items/{item}/transaction', [\App\Http\Controllers\InventoryItemController::class, 'logTransaction'])->name('inventory.transaction');
    });

    // Finance & Payroll - Admins, Directors, Accountants
    Route::middleware('role:Admin,Managing Director,Accountant')->group(function() {
        Route::get('/payroll', [\App\Http\Controllers\PayrollController::class, 'index'])->name('payroll.index');
        Route::get('/payroll/export', [\App\Http\Controllers\PayrollController::class, 'export'])->name('payroll.export');
        Route::get('/payroll/{payroll}/slip', [\App\Http\Controllers\PayrollController::class, 'payslip'])->name('payroll.slip');
        Route::post('/payroll/pay', [\App\Http\Controllers\PayrollController::class, 'pay'])->name('payroll.pay');

        Route::get('/finance', [\App\Http\Controllers\FinancialTransactionController::class, 'index'])->name('finance.index');
        Route::post('/finance/transactions', [\App\Http\Controllers\FinancialTransactionController::class, 'store'])->name('finance.transaction.store');
    });

    // Team, Users & Settings - Admins, Directors
    Route::middleware('role:Admin,Managing Director')->group(function() {
        Route::get('/users', [\App\Http\Controllers\UserController::class, 'index'])->name('users.index');
        Route::post('/users', [\App\Http\Controllers\UserController::class, 'store'])->name('users.store');

        Route::get('/settings', [\App\Http\Controllers\SettingsController::class, 'index'])->name('settings.index');
        Route::post('/settings/departments', [\App\Http\Controllers\SettingsController::class, 'storeDepartment'])->name('settings.departments.store');
        Route::put('/settings/departments/{department}', [\App\Http\Controllers\SettingsController::class, 'updateDepartment'])->name('settings.departments.update');
        Route::delete('/settings/departments/{department}', [\App\Http\Controllers\SettingsController::class, 'destroyDepartment'])->name('settings.departments.destroy');
    });

    // Production (Globally Accessible for Task Logging, but can be restricted inside controller)
    Route::post('/production/batches', [\App\Http\Controllers\ProductionController::class, 'storeBatch'])->name('production.batch.store');
    Route::post('/production/batches/{batch}/log', [\App\Http\Controllers\ProductionController::class, 'logProduction'])->name('production.log.store');

    // Analytics (Globally Accessible for Dashboard)
    Route::get('/api/analytics', [\App\Http\Controllers\AnalyticsController::class, 'getChartData'])->name('analytics.data');

    // Tasks (Globally Accessible)
    Route::get('/tasks', [\App\Http\Controllers\TaskController::class, 'index'])->name('tasks.index');
    Route::post('/tasks', [\App\Http\Controllers\TaskController::class, 'store'])->name('tasks.store');
    Route::patch('/tasks/{task}/status', [\App\Http\Controllers\TaskController::class, 'updateStatus'])->name('tasks.updateStatus');

    // Notifications
    Route::post('/notifications/{notification}/mark-read', [\App\Http\Controllers\NotificationController::class, 'markRead'])->name('notifications.mark-read');
});

require __DIR__.'/auth.php';
