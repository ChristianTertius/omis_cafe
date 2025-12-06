<?php

use App\Http\Controllers\DrinkController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/drinks/create', function () {
        return Inertia::render('drinks.create');
    })->name('drinks');
});

Route::resource('drinks', DrinkController::class);

Route::get('/about', function () {
    return Inertia::render('about', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
});


Route::get('/findus', function () {
    return Inertia::render('findus', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
});

Route::get('/contactus', function () {
    return Inertia::render('contactus', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
});
require __DIR__ . '/settings.php';
