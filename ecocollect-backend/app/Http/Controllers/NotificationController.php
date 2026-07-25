<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\WasteCollector;
use App\Models\WasteTypeOrderItem;
use App\Models\UserNotification;
use App\Models\CollectorNotification;
use App\Models\WasteTypeCurrentOrder;
use App\Http\Controllers\Api\BaseController;
use Illuminate\Validation\ValidationException;
use App\Http\Controllers\Api\ErrorHandlerController;
class NotificationController extends BaseController
{
public function notifyCollectorOnSchedule(Request $request)
{
    $orderId = $request->input('order_id');
    $order = WasteTypeCurrentOrder::with(['items.wasteType', 'user'])->findOrFail($orderId);

    $notificationTime = now();

    $userName     = $order->user?->name ?? 'مستخدم غير معروف';
    $locationName = $order->location_name ?? 'موقع غير محدد';
    $status       = $order->status ?? 'غير محدد';

    // تجهيز العناصر بالشكل المطلوب
    $items = $order->items->map(function ($item) {
        return [
            'id'       => $item->id,
            'quantity' => $item->quantity,
            'waste_type' => [
                'id'   => $item->wasteType->id ?? null,
                'name' => $item->wasteType->name ?? 'غير معروف'
            ]
        ];
    });

    // تكوين الوصف النصي
    $wasteText = count($items)
        ? implode(' و ', $items->map(fn($i) => "{$i['waste_type']['name']} بكمية {$i['quantity']}")->toArray())
        : 'مخلفات غير معروفة';

    // حفظ الإشعار
    CollectorNotification::create([
        'collector_id' => $order->collector_id,
        'title'        => 'طلب جديد',
        'des'          => "تم جدولة طلب جديد للاستلام من {$userName} لنقل {$wasteText} في موقع {$locationName}.",
        'time'         => $notificationTime,
        'order_data'   => $this->formatOrderData($order),
        'status'       => $status,
    ]);

    // استجابة الـ API
    return response()->json([
        'success' => true,
        'message' => 'تم إرسال الإشعار للكوليكتور بنجاح',
        'data'    => [
            'notification_time' => $notificationTime,
            'collector_id'      => $order->collector_id,
            'user_name'         => $userName,
            'location_name'     => $locationName,
            'status'            => $status,
            'items'             => $items,
        ]
    ]);
}
public function orderCompleted(Request $request)
{
    try {
        $request->validate([
            'order_id' => 'required|exists:waste_type_current_orders,id',
        ]);

        $order = WasteTypeCurrentOrder::findOrFail($request->order_id);

        $order->status = 'completed';
        $order->save();

        return response()->json([
            'success' => true,
            'message' => 'تم تحديث حالة الطلب إلى مكتمل بنجاح',
            'data' => [
                'order_id' => $order->id,
                'status' => $order->status,
                'updated_at' => $order->updated_at
            ]
        ], 200);

    } catch (ValidationException $e) {
        return response()->json([
            'success' => false,
            'message' => 'خطأ في البيانات',
            'errors' => $e->errors()
        ], 422);
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'حدث خطأ أثناء تحديث الطلب',
            'error' => $e->getMessage()
        ], 500);
    }
}


   public function acceptOrder($id)
{
    $order = WasteTypeCurrentOrder::with(['user', 'collector', 'items.wasteType'])->findOrFail($id);
    $order->update(['status' => 'on_delivery']);

    $wasteItems = $order->items->map(function ($item) {
        $type = $item->wasteType->name ?? 'نوع مخلف غير معروف';
        return "{$type} بكمية {$item->quantity}";
    });

    $wasteText = count($wasteItems) ? implode(' و ', $wasteItems->toArray()) : 'مخلفات غير معروفة';

    UserNotification::create([
        'user_id'    => $order->user_id,
        'title'      => 'تمت الموافقة على الطلب',
        'des'        => 'المجمّع ' . $order->collector->name . ' وافق على استلام طلبك من ' . $order->user->name . ' لنقل ' . $wasteText . ' في موقع ' . $order->location_name . '.',
        'time'       => now(),
        'order_data' => $this->formatOrderData($order),
        'status'     => $order->status ?? 'غير محدد',
    ]);

    return $this->sendResponse($order, 'تمت الموافقة على الطلب');
}


  public function rejectOrder($id)
{
    $order = WasteTypeCurrentOrder::with(['user', 'collector', 'items.wasteType'])->findOrFail($id);
    $order->update(['status' => 'rejected']);

    $wasteItems = $order->items->map(function ($item) {
        $type = $item->wasteType->name ?? 'نوع مخلف غير معروف';
        return "{$type} بكمية {$item->quantity}";
    });

    $wasteText = count($wasteItems) ? implode(' و ', $wasteItems->toArray()) : 'مخلفات غير معروفة';

    UserNotification::create([
        'user_id'    => $order->user_id,
        'title'      => 'تم رفض الطلب',
        'des'        => 'المجمّع ' . $order->collector->name . ' رفض طلبك من ' . $order->user->name . ' لنقل ' . $wasteText . ' في موقع ' . $order->location_name . '.',
        'time'       => now(),
        'order_data' => $this->formatOrderData($order),
        'status'     => $order->status ?? 'غير محدد',
    ]);

    return $this->sendResponse($order, 'تم رفض الطلب');
}



    public function getUserNotifications($userId)
{
    $user = User::find($userId);

    if (!$user) {
        return response()->json([
            'success' => false,
            'message' => 'المستخدم غير موجود'
        ], 404);
    }

    $notifications = $user->notifications;
    $formattedNotifications = $notifications->map(function ($notification) {
        $orderData = is_string($notification->order_data) ? json_decode($notification->order_data, true) : $notification->order_data;
        $orderStatus = isset($orderData['status']) ? $orderData['status'] : 'غير محدد';

        return [
            'id' => $notification->id,
            'title' => $notification->title,
            'des' => $notification->des,
            'time' => $notification->time,
            'order_data' => $this->formatOrderData($notification->order_data),
        ];
    });

    return response()->json([
        'success' => true,
        'message' => 'تم جلب الإشعارات',
        'data' => $formattedNotifications
    ]);
}

public function getCollectorNotifications($collectorId)
{
    $collector = WasteCollector::find($collectorId);

    if (!$collector) {
        return response()->json([
            'success' => false,
            'message' => 'الكوليكتور غير موجود'
        ], 404);
    }

    $notifications = $collector->collectorNotifications()->latest()->get();

    $formattedNotifications = $notifications->map(function ($notification) {
        $orderData = is_string($notification->order_data) ? json_decode($notification->order_data, true) : $notification->order_data;

        $orderStatus = isset($orderData['status']) ? $orderData['status'] : 'غير محدد';

        return [
            'id' => $notification->id,
            'title' => $notification->title,
            'des' => $notification->des,
            'time' => $notification->time,
            'order_data' => $this->formatOrderData($orderData),
        ];
    });

    return response()->json([
        'success' => true,
        'message' => 'تم جلب الإشعارات',
        'data' => $formattedNotifications
    ]);
}


public function formatOrderData($orderData)
{
    if ($orderData === null) {
        return null;
    }

    $orderId = null;
    $orderStatus = null;
    $order = null;
    if (is_object($orderData)) {
        $orderId = $orderData->id ?? null;
        if (!$orderId && isset($orderData->order_id)) {
            $orderId = $orderData->order_id;
        }
        if (!$orderId && isset($orderData->quantity, $orderData->pickup_time, $orderData->location_name)) {
            $order = \App\Models\WasteTypeCurrentOrder::where('quantity', $orderData->quantity)
                ->where('pickup_time', $orderData->pickup_time)
                ->where('location_name', $orderData->location_name)
                ->first();
            if ($order) {
                $orderId = $order->id;
            }
        } else if ($orderId) {
            $order = \App\Models\WasteTypeCurrentOrder::find($orderId);
        }
        $orderStatus = $order ? $order->status : ($orderData->status ?? 'غير محدد');
    } elseif (is_array($orderData)) {
        $orderId = $orderData['order_id'] ?? $orderData['id'] ?? null;
        if (!$orderId && isset($orderData['quantity'], $orderData['pickup_time'], $orderData['location'])) {
            $order = \App\Models\WasteTypeCurrentOrder::where('quantity', $orderData['quantity'])
                ->where('pickup_time', $orderData['pickup_time'])
                ->where('location_name', $orderData['location'])
                ->first();
            if ($order) {
                $orderId = $order->id;
            }
        } else if ($orderId) {
            $order = \App\Models\WasteTypeCurrentOrder::find($orderId);
        }
        $orderStatus = $order ? $order->status : ($orderData['status'] ?? 'غير محدد');
    }

    if (is_object($orderData)) {
        return [
            'order_id' => $orderId,
            'collector_name' => $orderData->collector->name ?? 'غير متوفر',
            'waste_type' => $orderData->wasteType->name ?? 'غير متوفر',
            'quantity' => $orderData->quantity ?? 0,
            'pickup_time' => $orderData->pickup_time ?? 'غير متوفر',
            'location' => $orderData->location_name ?? 'غير متوفر',
            'status' => $orderStatus,
        ];
    }

    if (is_array($orderData)) {
        return [
            'order_id' => $orderId,
            'user_name' => $orderData['user_name'] ?? 'غير متوفر',
            'collector_name' => $orderData['collector_name'] ?? 'غير متوفر',
            'waste_type' => $orderData['waste_type'] ?? 'غير متوفر',
            'quantity' => $orderData['quantity'] ?? 0,
            'pickup_time' => $orderData['pickup_time'] ?? 'غير متوفر',
            'location' => $orderData['location'] ?? 'غير متوفر',
            'status' => $orderStatus,
        ];
    }

    return null;
}


public function getCollectorOrdersWithDetails($collectorId)
{
    $orders = WasteTypeCurrentOrder::with(['user', 'collector', 'wasteType'])
        ->where('collector_id', $collectorId)
        ->latest()
        ->get();

    if ($orders->isEmpty()) {
        return response()->json([
            'success' => false,
            'message' => 'لا توجد طلبات لهذا الكوليكتور'
        ], 404);
    }

    $formattedOrders = $orders->map(function ($order) {
        return [
            'order_id' => $order->id,
            'user_name' => $order->user->name ?? 'غير متوفر',
            'collector_name' => $order->collector->name ?? 'غير متوفر',
            'waste_type' => $order->wasteType->name ?? 'غير متوفر',
            'quantity' => $order->quantity ?? 0,
            'pickup_time' => $order->pickup_time ?? 'غير متوفر',
            'location' => $order->location_name ?? 'غير متوفر',
            'status' => $order->status ?? 'غير محدد',
        ];
    });

    return response()->json([
        'success' => true,
        'message' => 'تم جلب الطلبات بنجاح',
        'data' => $formattedOrders
    ]);
}





}
