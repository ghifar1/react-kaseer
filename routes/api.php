<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('/getBarang', [\App\Http\Controllers\BarangController::class, 'getBarang']);
Route::post('/saveBarang', [\App\Http\Controllers\BarangController::class, 'tambahBarang']);
Route::post('/cariBarang', [\App\Http\Controllers\BarangController::class, 'cariBarang']);
Route::post('/createTransaction', [\App\Http\Controllers\TransactionController::class, 'createTransaction']);
