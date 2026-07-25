<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WasteCollectorController;
use App\Http\Controllers\PickupController;
use App\Http\Controllers\EarningsController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\NotificationController;

/*
|--------------------------------------------------------------------------
| API Routes
|-------------------------------------------------------------------------- */

Route::middleware('verify.otp')->get('/secure-data', function () {
    return response()->json(['message' => 'You are authorized!']);
});
Route::middleware('verified')->get('/secure-data', function () {
    return response()->json(['message' => 'You are authorized!']);
});

Route::middleware('auth:api')->get('user', function (Request $request) {
    return $request->user();
});
Route::post('signup', [UserController::class, 'signUp']);
Route::post('login', [UserController::class, 'login']);
Route::middleware('auth:api')->group(function() {
    Route::get('user/profile', [UserController::class, 'getProfile']);
    Route::put('user/profile', [UserController::class, 'updateProfile']);
    Route::get('/user/order/{orderId}', [UserController::class, 'oneOrder']);
    Route::get('/user/orders/current', [UserController::class, 'currentOrders']);
    Route::get('/user/orders/past', [UserController::class, 'pastOrders']);
    Route::get('/nearby-collectors', [UserController::class, 'getNearbyCollectors']);
    Route::get('/earnings/transactions', [EarningsController::class, 'getTransactionHistory']);
});



Route::prefix('waste-collector')->group(function () {
    Route::post('register', [WasteCollectorController::class, 'signUp']);
    Route::post('login', [WasteCollectorController::class, 'login']);
    // Phone Verification Routes
    Route::post('phone/send-code', [WasteCollectorController::class, 'sendPhoneVerificationCode']);
    Route::post('phone/resend-code', [WasteCollectorController::class, 'resendVerificationCode']);
    Route::post('phone/verify', [WasteCollectorController::class, 'verifyPhoneCode']);

    Route::middleware('auth:waste_collectors')->group(function() {
        Route::get('profile', [WasteCollectorController::class, 'getProfile']);
        Route::put('profile', [WasteCollectorController::class, 'updateProfile']);
        Route::get('/nearby-users', [WasteCollectorController::class, 'getNearbyUsers']);
    });
});

Route::prefix('waste-collector')->middleware('auth:waste_collectors')->group(function() {
    Route::get('orders', [WasteCollectorController::class, 'allOrders']);
    Route::get('order/{orderId}', [WasteCollectorController::class, 'oneOrder']);
});


Route::prefix('users/waste-collectors')->group(function () {
    Route::get('/', [WasteCollectorController::class, 'index']);
    Route::get('/{id}', [WasteCollectorController::class, 'show']);
});

Route::middleware('auth:api')->group(function () {
 Route::post('/orders/choose-collector', [PickupController::class, 'chooseCollector']);
    Route::post('/orders/schedule-pickup', [PickupController::class, 'schedulePickup']);
    Route::post('/convert-order-to-points/{orderId}', [PickupController::class, 'convertOrderToPoints']);
    Route::get('/earnings/{user_id}', [EarningsController::class, 'viewEarnings']);
    Route::post('/earnings/convert-points', [EarningsController::class, 'convertPointsToMoney']);
    Route::get('/earnings/transactions', [EarningsController::class, 'getTransactionHistory']);
});

Route::post('notifications/collector-schedule', [NotificationController::class, 'notifyCollectorOnSchedule']);
Route::post('orders/{id}/accept', [NotificationController::class, 'acceptOrder']);
Route::post('orders/{id}/reject', [NotificationController::class, 'rejectOrder']);
Route::get('/collector-orders/{collectorId}', [NotificationController::class, 'getCollectorOrdersWithDetails']);
Route::post('/order-completed', [NotificationController::class, 'orderCompleted']);

Route::get('notifications/user/{userId}', [NotificationController::class, 'getUserNotifications']);
Route::get('notifications/collector/{collectorId}', [NotificationController::class, 'getCollectorNotifications']);

// Admin Routes - Public (Registration/Login only)
Route::post('/admin/register', [AdminController::class, 'register']);

// Admin Routes - Protected
Route::middleware('auth:admins')->prefix('admin')->group(function () {
    Route::get('/users', [AdminController::class, 'getAllUsers']);
    Route::get('/waste-collectors', [AdminController::class, 'getAllWasteCollectors']);
    Route::get('/orders', [AdminController::class, 'getAllOrders']);
    Route::get('/total-waste', [AdminController::class, 'getTotalWasteInTons']);
    Route::get('/waste-percentage-status', [AdminController::class, 'getWastePercentageByStatus']);
    Route::get('/waste-by-type', [AdminController::class, 'getWasteByTypeInKg']);
    Route::get('/dashboard-summary', [AdminController::class, 'getDashboardSummary']);
    Route::get('/collectors-performance', [AdminController::class, 'getCollectorsPerformance']);
    Route::get('/most-contributed-location', [AdminController::class, 'getMostContributedLocation']);
    Route::get('/transactions/pending', [AdminController::class, 'getPendingTransactions']); 
    Route::patch('/transactions/{id}/status', [AdminController::class, 'updateTransactionStatus']);
    Route::post('/waste-types/prices', [AdminController::class, 'updateWasteTypePrices']); 
    Route::get('/waste-types', [AdminController::class, 'getWasteTypes']);
});


// Phone Verification Routes
Route::post('/phone/send-code', [UserController::class, 'sendPhoneVerificationCode']);
Route::post('/phone/resend-code', [UserController::class, 'resendVerificationCode']);
Route::post('/phone/verify', [UserController::class, 'verifyPhoneCode']);
