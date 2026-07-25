<?php

namespace App\Http\Controllers;
use App\Models\WasteType;
use Illuminate\Http\Request;
use App\Models\Admin;
use Illuminate\Support\Facades\Log;
use App\Models\WasteTypeOrderItem;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use App\Models\WasteCollector;
use App\Models\Transaction;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Api\BaseController;
use App\Http\Controllers\Api\ErrorHandlerController;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

use App\Models\WasteTypeCurrentOrder;

class AdminController extends BaseController
{

    public function register(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'name' => 'nullable|string|max:255',
                'email' => 'required|email',
                'phone' => 'nullable|string',
                'password' => 'required|string|min:8|confirmed',
            ]);

            $admin = Admin::where('email', $validatedData['email'])->first();

            if ($admin) {
                if (!Hash::check($request->password, $admin->password)) {
                    return $this->sendError('غير مصرح', ['error' => 'كلمة المرور غير صحيحة'], 401);
                }
                
                $token = $admin->createToken('Admin Token')->accessToken;
                
                return response()->json([
                    'success' => true,
                    'message' => 'تم تسجيل الدخول بنجاح',
                    'admin' => $admin,
                    'token' => $token
                ], 200);
            }

            $validatedData['password'] = Hash::make($validatedData['password']);
            $admin = Admin::create($validatedData);
            $token = $admin->createToken('Admin Token')->accessToken;

            return response()->json([
                'success' => true,
                'message' => 'تم تسجيل المشرف بنجاح',
                'admin' => $admin,
                'token' => $token
            ], 201);
        } catch (ValidationException $e) {
            return app(ErrorHandlerController::class)->handleValidationErrors($e);
        } catch (\Exception $e) {
            return app(ErrorHandlerController::class)->handleException($e);
        }
    }

    public function getAllUsers(Request $request)
    {
        try {
            $query = User::query();

            if ($request->has('name') && !empty($request->name)) {
                $query->where('name', 'like', '%' . $request->name . '%');
            }

            $users = $query->with(['transactions' => function ($query) {
                $query->selectRaw('user_id, sum(points) as total_points, sum(balance) as total_balance')
                      ->groupBy('user_id');
            }])->get();

            if ($users->isEmpty()) {
                return response()->json([
                    'success' => false,
                    'message' => 'No users found matching the given criteria.',
                ], 404);
            }

            $userData = $users->map(function ($user) {
                $totalPoints = $user->transactions->sum('total_points');
                $totalBalance = $user->transactions->sum('total_balance');

                return [
                    'user_id' => $user->id,
                    'name' => $user->name,
                    'total_points' => $totalPoints,
                    'total_balance' => $totalBalance,
                ];
            });

            return response()->json([
                'success' => true,
                'message' => 'Users retrieved successfully.',
                'users' => $userData
            ], 200);
        } catch (\Exception $e) {
            return app(ErrorHandlerController::class)->handleException($e);
        }
    }


    public function getAllWasteCollectors(Request $request)
    {
        try {
            $query = WasteCollector::query();

            if ($request->has('name') && !empty($request->name)) {
                $query->where('name', 'like', '%' . $request->name . '%');
            }
            $collectors = $query->get();

            if ($collectors->isEmpty()) {
                return response()->json([
                    'success' => false,
                    'message' => 'No waste collectors found matching the given criteria.',
                ], 404);
            }
            return response()->json([
                'success' => true,
                'message' => 'Waste Collectors retrieved successfully.',
                'collectors' => $collectors
            ], 200);
        } catch (\Exception $e) {
            return app(ErrorHandlerController::class)->handleException($e);
        }
    }

    public function getAllOrders(Request $request)
    {
        try {
            $query = WasteTypeCurrentOrder::with(['user', 'collector']);

            if ($request->has('order_id') && !empty($request->order_id)) {
                $query->where('id', $request->order_id);
            }

            if ($request->has('status') && !empty($request->status)) {
                $query->where('status', $request->status);
            }

            $orders = $query->get();

            if ($orders->isEmpty()) {
                return response()->json([
                    'success' => false,
                    'message' => 'No orders found matching the given criteria.',
                ], 404);
            }

            $orderData = $orders->map(function ($order) {
                return [
                    'order_id' => $order->id,
                    'user_name' => $order->user->name ?? 'غير متوفر',
                    'collector_name' => $order->collector->name ?? 'غير متوفر',
                    'status' => $order->status,
                    'quantity' => $order->quantity,
                    'location' => $order->location_name,
                    'price_for_kg' => $order->price_for_kg,
                    'points_for_kg' => $order->points_for_kg,
                    'pickup_time' => $order->pickup_time,
                    'arrival_time' => $order->arrival_time,
                    'created_at' => $order->created_at,
                ];
            });

            return response()->json([
                'success' => true,
                'message' => 'Orders retrieved successfully.',
                'orders' => $orderData
            ], 200);
        } catch (\Exception $e) {
            return app(ErrorHandlerController::class)->handleException($e);
        }
    }


public function getTotalWasteInTons()
{
    $totalKg = WasteTypeOrderItem::sum('quantity');
    $totalTons = $totalKg / 1000;

    return response()->json([
        'success' => true,
        'message' => 'إجمالي النفايات المحسوبة',
        'total_waste_tons' => round($totalTons, 2)
    ]);
}



public function getWastePercentageByStatus()
{
    $statusQuantities = DB::table('waste_type_order_items')
        ->join('waste_type_current_orders', 'waste_type_order_items.order_id', '=', 'waste_type_current_orders.id')
        ->select('waste_type_current_orders.status', DB::raw('SUM(waste_type_order_items.quantity) as total_quantity'))
        ->groupBy('waste_type_current_orders.status')
        ->pluck('total_quantity', 'waste_type_current_orders.status');

    $totalKg = $statusQuantities->sum();
    $totalTons = $totalKg / 1000;

    $completedTons = ($statusQuantities['completed'] ?? 0) / 1000;
    $onDeliveryTons = ($statusQuantities['on_delivery'] ?? 0) / 1000;
    $rejectedTons = ($statusQuantities['rejected'] ?? 0) / 1000;

    $completedPercentage = $totalTons > 0 ? round(($completedTons / $totalTons) * 100, 2) : 0;
    $onDeliveryPercentage = $totalTons > 0 ? round(($onDeliveryTons / $totalTons) * 100, 2) : 0;
    $rejectedPercentage = $totalTons > 0 ? round(($rejectedTons / $totalTons) * 100, 2) : 0;

    return response()->json([
        'success' => true,
        'message' => 'نسبة النفايات حسب الحالة',
        'data' => [
            'completed' => $completedPercentage,
            'on_delivery' => $onDeliveryPercentage,
            'rejected' => $rejectedPercentage
        ]
    ]);
}

 public function getWasteByTypeInKg()
{
    $wasteTypes = ['plastic', 'glass', 'metal', 'carton'];

    $totalQuantity = WasteTypeOrderItem::sum('quantity');
    $wasteData = [];

    foreach ($wasteTypes as $type) {
        $typeQuantity = WasteTypeOrderItem::whereHas('wasteType', function ($query) use ($type) {
            $query->where('name', $type);
        })->sum('quantity');

        $percentage = $totalQuantity > 0 ? round(($typeQuantity / $totalQuantity) * 100, 2) : 0;
        $wasteData[$type] = [
            'total_quantity' => $typeQuantity,
            'percentage' => $percentage
        ];
    }

    return response()->json([
        'success' => true,
        'message' => 'إجمالي النفايات حسب النوع بالكيلو والنسبة المئوية',
        'data' => $wasteData
    ]);
}


    public function getDashboardSummary(Request $request)
    {
        try {
            $totalPoints = Transaction::sum('points');
            $totalBalance = Transaction::sum('balance');

            return response()->json([
                'success' => true,
                'message' => 'Dashboard summary retrieved successfully.',
                'total_points' => $totalPoints,
                'total_balance' => $totalBalance,
            ], 200);
        } catch (\Exception $e) {
            return app(ErrorHandlerController::class)->handleException($e);
        }
    }
public function getCollectorsPerformance()
{
    try {
        $collectorsPerformance = DB::table('waste_type_order_items')
            ->join('waste_type_current_orders', 'waste_type_order_items.order_id', '=', 'waste_type_current_orders.id')
            ->select(
                'waste_type_current_orders.collector_id',
                DB::raw('SUM(waste_type_order_items.quantity) as total_quantity'),
                DB::raw('COUNT(DISTINCT waste_type_order_items.order_id) as orders_count')
            )
            ->groupBy('waste_type_current_orders.collector_id')
            ->get();

        if ($collectorsPerformance->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'لا توجد بيانات كافية لأداء الكوليكتورين'
            ], 404);
        }

        $performanceData = $collectorsPerformance->map(function ($collector) {
            return [
                'collector_id' => $collector->collector_id,
                'total_quantity_collected' => $collector->total_quantity,
                'orders_count' => $collector->orders_count
            ];
        });

        return response()->json([
            'success' => true,
            'message' => 'تم تحديد أداء الكوليكتورين',
            'data' => $performanceData
        ], 200);
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'حدث خطأ أثناء حساب الأداء',
            'error' => $e->getMessage()
        ], 500);
    }
}
    public function getMostContributedLocation()
    {
        try {
            $totalQuantity = WasteTypeCurrentOrder::sum('quantity');
            $topLocations = WasteTypeCurrentOrder::select('location_name', DB::raw('sum(quantity) as total_quantity'))
                ->groupBy('location_name')
                ->orderByDesc('total_quantity')
                ->limit(3)
                ->get();

            if ($topLocations->isEmpty()) {
                return response()->json([
                    'success' => false,
                    'message' => 'لا توجد بيانات كافية لتحديد أكثر المواقع'
                ], 404);
            }

            $locationsData = $topLocations->map(function ($location) use ($totalQuantity) {
                $percentage = $totalQuantity > 0 ? round(($location->total_quantity / $totalQuantity) * 100, 2) : 0;
                return [
                    'location_name' => $location->location_name,
                    'total_quantity' => $location->total_quantity,
                    'percentage' => $percentage
                ];
            });

            return response()->json([
                'success' => true,
                'message' => 'تم تحديد أكثر 3 مواقع تم جمع النفايات منها',
                'data' => $locationsData
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'حدث خطأ أثناء الحساب',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    
 public function getPendingTransactions()
{
    try {
        $transactions = Transaction::where('status', 'pending')->with('user')->latest()->get();

        return response()->json([
            'success' => true,
            'message' => 'تم جلب التحويلات قيد الانتظار',
            'data'    => $transactions
        ]);
    } catch (\Exception $e) {
        Log::error('getPendingTransactions Error: ' . $e->getMessage(), [
            'line' => $e->getLine(),
            'file' => $e->getFile(),
            'trace' => $e->getTraceAsString()
        ]);

        return response()->json([
            'success' => false,
            'message' => 'حدث خطأ أثناء جلب البيانات',
            'error'   => $e->getMessage(),
            'line'    => $e->getLine(),
            'file'    => $e->getFile(),
        ], 500);
    }
}
public function updateTransactionStatus(Request $request, $id)
{
    try {
        $request->validate([
            'status' => 'required|in:done,failed'
        ]);

        $transaction = Transaction::findOrFail($id);

        if ($transaction->status !== 'pending') {
            return $this->sendError('لا يمكن تعديل هذه المعاملة لأنها ليست قيد الانتظار', [], 400);
        }

        $user = $transaction->user;

        if ($request->status === 'done') {
            $transaction->status = 'done';
            $transaction->save();
        } elseif ($request->status === 'failed') {
            $wallet = $user->wallet;
            if (!$wallet) {
                $wallet = UserWallet::create([
                    'user_id' => $user->id,
                    'points' => 0
                ]);
            }

            $wallet->points += $transaction->points;
            $wallet->save();

            $transaction->status = 'failed';
            $transaction->save();
        }

        return $this->sendResponse($transaction, 'تم تحديث حالة المعاملة بنجاح');
    } catch (\Exception $e) {
        \Log::error("updateTransactionStatus Error: " . $e->getMessage(), [
            'line' => $e->getLine(),
            'file' => $e->getFile()
        ]);
        return $this->sendError('حدث خطأ أثناء تحديث الحالة', $e->getMessage(), 500);
    }
}

 public function updateWasteTypePrices(Request $request)
    {
        $request->validate([
            'waste_types' => 'required|array|min:1',
            'waste_types.*.id' => 'required|integer|exists:waste_types,id',
            'waste_types.*.price_per_kg' => 'required|numeric|min:0'
        ]);

        $updated = [];

        foreach ($request->waste_types as $item) {
            $wasteType = WasteType::find($item['id']);
            $wasteType->price_per_kg = $item['price_per_kg'];
            $wasteType->save();

            $updated[] = [
                'id' => $wasteType->id,
                'name_ar' => $wasteType->name_ar ?? $wasteType->name,
                'name_en' => $wasteType->name_en ?? $wasteType->name,
                'price_per_kg' => $wasteType->price_per_kg
            ];
        }

        return response()->json([
            'success' => true,
            'message' => 'تم تحديث أسعار الكيلو بنجاح',
            'data' => $updated
        ]);
    }

public function getWasteTypes()
{
    try {
        $wasteTypes = WasteType::select('id', 'name', 'description', 'image', 'price_per_kg', 'created_at', 'updated_at')
            ->get()
            ->map(function ($type) {
                return [
                    'id' => $type->id,
                    'name' => $type->name,
                    'description' => $type->description,
                    'image' => $type->image ? asset('storage/' . $type->image) : null,
                    'price_per_kg' => $type->price_per_kg,
                    'created_at' => $type->created_at->format('Y-m-d H:i:s'),
                    'updated_at' => $type->updated_at->format('Y-m-d H:i:s'),
                ];
            });

        return response()->json([
            'success' => true,
            'data' => $wasteTypes,
            'count' => $wasteTypes->count()
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'حدث خطأ أثناء جلب بيانات الأنواع',
            'error' => $e->getMessage()
        ], 500);
    }
}

}
