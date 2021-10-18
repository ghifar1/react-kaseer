<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [\App\Http\Controllers\GuestController::class, 'index']);

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
Route::get('/print/{type}', [\App\Http\Controllers\PrinterController::class, 'print']);
Route::get('/login', [\App\Http\Controllers\GuestController::class, 'index']);
Route::get('/editData', [\App\Http\Controllers\HomeController::class, 'editData']);
