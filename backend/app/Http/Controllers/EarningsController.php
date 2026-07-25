<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\WasteTypeCurrentOrder;
use App\Models\User;
use App\Models\Transaction;
use App\Models\UserWallet;
use App\Models\PointPrice;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Api\BaseController;
use Illuminate\Validation\ValidationException;
use App\Http\Controllers\Api\ErrorHandlerController;

class EarningsController extends BaseController
{
    public function viewEarnings($user_id)
    {
        try {
            $user = Auth::guard('api')->user();
            if (!$user || $user->id != $user_id) {
                return $this->sendError('غير مصرح', ['error' => 'بيانات غير صحيحة'], 401);
            }

            $wallet = $user->wallet;
            if (!$wallet) {
                $wallet = UserWallet::create([
                    'user_id' => $user_id,
                    'points' => 0
                ]);
            }

            $lastTransaction = Transaction::where('user_id', $user_id)
                ->orderBy('created_at', 'desc')
                ->first();

            $newWasteQuantity = WasteTypeCurrentOrder::where('user_id', $user_id)
                ->where('status', 'completed')
                ->when($lastTransaction, function($query) use ($lastTransaction) {
                    return $query->where('created_at', '>', $lastTransaction->created_at);
                })
                ->sum('quantity');

            $pointsPerKg = PointPrice::where('active', 1)->value('points_for_kg') ?? 10;
            $newPoints = $newWasteQuantity * $pointsPerKg;

            $totalPoints = $newPoints;
            if ($lastTransaction) {
                $totalPoints += $lastTransaction->points;
            }

            $wallet->points = $totalPoints;
            $wallet->save();

            return $this->sendResponse([
                'user_id' => $user_id,
                'user_name' => $user->name,
                'total_points_earned' => $totalPoints,
                'available_balance' => $wallet->points / 100,
                'points_after_conversion' => $newPoints,
                'points_details' => [
                    'new_waste_quantity' => $newWasteQuantity,
                    'points_per_kg' => $pointsPerKg,
                    'conversion_rate' => '100 points = 1 currency unit',
                    'last_conversion_date' => $lastTransaction ? $lastTransaction->created_at->format('Y-m-d H:i:s') : null, // تاريخ آخر تحويل
                    'points_breakdown' => [
                        'new_points' => $newPoints,
                        'previous_points' => $lastTransaction ? $lastTransaction->points : 0
                    ]
                ]
            ], 'تم جلب بيانات الأرباح بنجاح', 200);

        } catch (ValidationException $e) {
            return app(ErrorHandlerController::class)->handleValidationErrors($e);
        } catch (\Exception $e) {
            return app(ErrorHandlerController::class)->handleException($e);
        }
    }

   public function convertPointsToMoney(Request $request)
{
    try {
        $user = Auth::guard('api')->user();
        if (!$user) {
            return $this->sendError('غير مصرح', ['error' => 'يجب تسجيل الدخول أولاً'], 401);
        }

        $wallet = $user->wallet;
        if (!$wallet) {
            $wallet = UserWallet::create([
                'user_id' => $user->id,
                'points'  => 0
            ]);
        }

        $totalWasteQuantity = WasteTypeCurrentOrder::where('user_id', $user->id)
            ->where('status', 'completed')
            ->sum('quantity');

        $pointsPerKg = PointPrice::where('active', 1)->value('points_for_kg') ?? 10;
        $totalPoints = $totalWasteQuantity * $pointsPerKg;

        // تحديث رصيد النقاط الفعلي
        $wallet->points = $totalPoints;
        $wallet->save();

        if ($totalPoints < 0) {
            return $this->sendError('خطأ', ['error' => 'لا يوجد نقاط كافية للتحويل (الحد الأدنى 10 نقطة)'], 400);        }

        $balance = $totalPoints / 100;

        // خصم النقاط مؤقتًا (وتتحول لاحقًا عند موافقة الأدمن)
        $wallet->points = 0;
        $wallet->save();

        // إنشاء معاملة بحالة pending
        $transaction = Transaction::create([
            'user_id'            => $user->id,
            'user_type'          => get_class($user),
            'balance'            => $balance,
            'points'             => $totalPoints,
            'balance_by_points'  => $balance,
            'status'             => 'pending', // 🟡 أهم سطر
            'date'               => now(),
        ]);

        return $this->sendResponse([
            'transaction_id' => $transaction->id,
            'user_id'        => $user->id,
            'user_name'      => $user->name,
            'conversion_details' => [
                'points_before_conversion' => $totalPoints,
                'points_after_conversion'  => 0,
                'balance_requested'        => $balance,
                'conversion_rate'          => '100 points = 1 currency unit',
                'status'                   => 'pending'
            ],
            'points_details' => [
                'total_waste_quantity' => $totalWasteQuantity,
                'points_per_kg'        => $pointsPerKg
            ],
            'transaction_date' => now()->format('Y-m-d H:i:s')
        ], 'تم إرسال طلب تحويل النقاط وجاري مراجعته من الإدارة', 200);

    } catch (ValidationException $e) {
        return app(ErrorHandlerController::class)->handleValidationErrors($e);
    } catch (\Exception $e) {
        return app(ErrorHandlerController::class)->handleException($e);
    }
}

    public function getTransactionHistory(Request $request)
    {
        try {
            $user = Auth::guard('api')->user();
            if (!$user) {
                return $this->sendError('غير مصرح', ['error' => 'يجب تسجيل الدخول أولاً'], 401);
            }

            $transactions = Transaction::where('user_id', $user->id)
                ->orderBy('created_at', 'desc')
                ->get()
                ->map(function ($transaction) {
                    return [
                        'transaction_id' => $transaction->id,
                        'conversion_details' => [
                            'points_before_conversion' => $transaction->points,
                            'points_after_conversion' => 0,
                            'balance_received' => $transaction->balance,
                            'conversion_rate' => '100 points = 1 currency unit'
                        ],
                        'dates' => [
                            'transaction_date' => $transaction->created_at->format('Y-m-d H:i:s'),
                            'created_at' => $transaction->created_at->format('Y-m-d H:i:s')
                        ]
                    ];
                });

            return $this->sendResponse([
                'user_id' => $user->id,
                'user_name' => $user->name,
                'total_transactions' => $transactions->count(),
                'transactions' => $transactions
            ], 'تم جلب سجل المعاملات بنجاح', 200);

        } catch (ValidationException $e) {
            return app(ErrorHandlerController::class)->handleValidationErrors($e);
        } catch (\Exception $e) {
            return app(ErrorHandlerController::class)->handleException($e);
        }
    }
}
