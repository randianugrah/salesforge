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

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resource('sales-pages', \App\Http\Controllers\SalesPageController::class);
    Route::get('/sales-pages/{sales_page}/preview', [\App\Http\Controllers\SalesPageController::class, 'show'])->name('sales-pages.preview');
    Route::get('/sales-pages/{sales_page}/export', [\App\Http\Controllers\SalesPageController::class, 'export'])->name('sales-pages.export');
});

require __DIR__.'/auth.php';
