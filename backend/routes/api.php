<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DeliveryRequestController;

Route::get('/requests', [DeliveryRequestController::class, 'index']);

Route::middleware('throttle:10,1')->post('/requests', [DeliveryRequestController::class, 'store']);
Route::patch('/requests/{ref}/cancel', [DeliveryRequestController::class, 'cancel']);
