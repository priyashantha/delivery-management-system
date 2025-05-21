<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DeliveryRequestController;

Route::get('/requests', [DeliveryRequestController::class, 'index']);
Route::post('/requests', [DeliveryRequestController::class, 'store']);
