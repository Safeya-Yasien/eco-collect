<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\WasteTypeCurrentOrder;
use App\Models\User;
use App\Models\Transaction;
use App\Models\WasteTypeOrderItem;

use App\Customs\Services\EmailVerficationService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\Auth\userloginRequest;
use App\Http\Requests\Auth\userRegisterRequest;
use App\Http\Requests\UpdateUserProfileRequest;
use App\Models\Location;
use App\Http\Controllers\Api\BaseController;
use Illuminate\Validation\ValidationException;
use App\Http\Controllers\Api\ErrorHandlerController;
class PickupController extends BaseController
{
public function chooseCollector(Request $request)
{
    try {
        $request->validate([
            'collector_id'  => 'required|exists:waste_collectors,id',
            'wastes'        => 'required|array|min:1',
            'wastes.*.waste_type_id' => 'required|exists:waste_types,id',
            'wastes.*.quantity'      => 'required|numeric|min:0.1',
            'location_name' => 'required|string|max:255',
        'arrival_time'  => 'nullable|date',
    'price_for_kg'  => 'nullable|numeric',
        ]);

        $order = WasteTypeCurrentOrder::create([
            'user_id'       => Auth::id(),
            'collector_id'  => $request->collector_id,
            'price_for_kg'  => $request->price_for_kg,
            'location_name' => $request->location_name,
            'status'        => 'pending',
            'arrival_time'  => $request->arrival_time,
        ]);

        foreach ($request->wastes as $wasteItem) {
            WasteTypeOrderItem::create([
                'order_id'      => $order->id,
                'waste_type_id' => $wasteItem['waste_type_id'],
                'quantity'      => $wasteItem['quantity'],
            ]);
        }

        $order->load('items.wasteType');

        return response()->json([
            'success' => true,
            'message' => 'تم اختيار الكوليكتور وإنشاء الطلب بنجاح',
            'data'    => $order
        ], 201);

    } catch (ValidationException $e) {
        return app(ErrorHandlerController::class)->handleValidationErrors($e);
    } catch (\Exception $e) {
        return app(ErrorHandlerController::class)->handleException($e);
    }
}



  public function schedulePickup(Request $request)
{
    try {
        $request->validate([
            'order_id'    => 'required|exists:waste_type_current_orders,id',
            'pickup_time' => 'required|date_format:Y-m-d H:i:s'
        ]);

        $order = WasteTypeCurrentOrder::with(['items.wasteType'])->find($request->order_id);

        if (!$order) {
            return $this->sendError('Not Found', ['error' => 'Order not found'], 404);
        }

        $order->update([
            'pickup_time' => $request->pickup_time,
            'status'      => 'scheduled'
        ]);

        // إعداد البيانات اللي هنرجعها بدون الحقول اللي مش محتاجينها
        $response = [
            'id'            => $order->id,
            'user_id'       => $order->user_id,
            'collector_id'  => $order->collector_id,
            'location_name' => $order->location_name,
            'status'        => $order->status,
            'pickup_time'   => $order->pickup_time,
            'arrival_time'  => $order->arrival_time,
            'price_for_kg'  => $order->price_for_kg,
            'items'         => $order->items->map(function ($item) {
                return [
                    'id'         => $item->id,
                    'quantity'   => $item->quantity,
                    'waste_type' => [
                        'id'   => $item->wasteType->id ?? null,
                        'name' => $item->wasteType->name ?? null,
                    ]
                ];
            }),
        ];

        return response()->json([
            'success' => true,
            'message' => 'تم جدولة الـ Pick Up بنجاح',
            'data'    => $response
        ], 200);

    } catch (ValidationException $e) {
        return app(ErrorHandlerController::class)->handleValidationErrors($e);
    } catch (\Exception $e) {
        return app(ErrorHandlerController::class)->handleException($e);
    }
}


    public function convertOrderToPoints(Request $request, $orderId)
    {
        try {
            $user = Auth::user();
            $order = WasteTypeCurrentOrder::with('items')->findOrFail($orderId);

            if ($order->user_id !== $user->id) {
                return $this->sendError('Unauthorized', ['error' => 'Invalid credentials'], 401);
            }

            if ($order->is_converted) {
                return $this->sendError('Already converted', ['error' => 'Order already converted to points'], 400);
            }

            // جمع الكميات من جميع العناصر في الطلب
            $totalQuantity = $order->items->sum('quantity');
            
            if ($totalQuantity <= 0) {
                return $this->sendError('Invalid quantity', ['error' => 'Order has no valid items'], 400);
            }

            $points = $totalQuantity * 100;
            $balance = $points / 100;

            Transaction::create([
                'user_id' => $user->id,
                'user_type' => get_class($user),
                'balance' => $balance,
                'points' => $points,
                'balance_by_points' => $balance,
                'date' => now(),
            ]);

            $user->points += $points;
            $user->save();
            $order->is_converted = true;
            $order->status = 'completed';
            $order->save();
            
            return $this->sendResponse([
                'message' => 'Order converted successfully',
                'order_id' => $order->id,
                'total_quantity' => $totalQuantity,
                'points_added' => $points,
                'total_points' => $user->points,
            ], 'Conversion completed', 200);

        } catch (\Exception $e) {
            return app(ErrorHandlerController::class)->handleException($e);
        }
    }

}