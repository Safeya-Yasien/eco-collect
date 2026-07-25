<?php

namespace App\Http\Controllers;

use App\Models\WasteCollector;
use App\Models\WasteTypeCurrentOrder;
use App\Models\User;
use App\Models\WasteType;
use App\Models\WasteCollectorType;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Api\BaseController;
use Illuminate\Validation\ValidationException;
use App\Http\Controllers\Api\ErrorHandlerController;
use App\Http\Requests\UpdateProfileCollectorRequest;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Support\Facades\Storage;
use Twilio\Rest\Client;
use Illuminate\Support\Facades\Cache;
use Exception;

class WasteCollectorController extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

public function signUp(Request $request)
{
    try {
        // التحقق من البيانات
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'business_name' => 'required|string|max:255',
            'email' => 'required|email|unique:waste_collectors,email',
            'phone' => 'required|string|max:20|unique:waste_collectors,phone',
            'password' => 'required|string|min:8|confirmed',
            'location' => 'required|string|max:255',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'waste_types' => 'required|array|min:1',
            'waste_types.*.id' => 'required|integer|exists:waste_types,id',
            'waste_types.*.price' => 'nullable|numeric|min:0',
            'rating' => 'nullable|numeric|min:0|max:5',
        ]);

        // حفظ waste_types لوحده
        $wasteTypesInput = $validatedData['waste_types'];
        unset($validatedData['waste_types']);

        // تشفير الباسورد
        $validatedData['password'] = Hash::make($validatedData['password']);

        // تقييم افتراضي
        $validatedData['rating'] = $validatedData['rating'] ?? 0.0;

        // إنشاء الجامع
        $wasteCollector = WasteCollector::create($validatedData);

        // حفظ اللوجو لو موجود
        if ($request->hasFile('logo')) {
            $logo = $request->file('logo');
            $logoName = time() . '.' . $logo->getClientOriginalExtension();
            $logoPath = $logo->storeAs('logos', $logoName, 'public');
            $wasteCollector->logo = $logoPath;
            $wasteCollector->save();
        }

        // تجهيز بيانات الربط
        $attachData = [];
        foreach ($wasteTypesInput as $wasteType) {
            $attachData[$wasteType['id']] = [
                'waste_price' => $wasteType['price'] ?? null
            ];
        }

        // الربط مع جدول الوسيط
        $wasteCollector->wasteTypes()->attach($attachData);

        // إنشاء التوكن
        $token = $wasteCollector->createToken('WasteCollector Token')->accessToken;

        // ترجمة أنواع النفايات
        $wasteTypesTranslated = $wasteCollector->wasteTypes->map(function ($type) {
            return [
                'id' => $type->id,
                'name_ar' => $type->name_ar ?? $type->name,
                'name_en' => $type->name_en ?? $type->name,
                'price' => $type->pivot->waste_price,
            ];
        });

        // استجابة ناجحة
        return $this->sendResponse([
            'collector' => [
                'id' => $wasteCollector->id,
                'name' => $wasteCollector->name,
                'business_name' => $wasteCollector->business_name,
                'email' => $wasteCollector->email,
                'phone' => $wasteCollector->phone,
                'location' => $wasteCollector->location,
                'logo' => $wasteCollector->logo ? asset('storage/' . $wasteCollector->logo) : null,
                'waste_types' => $wasteTypesTranslated,
                'rating' => (float) $wasteCollector->rating,
            ],
            'token' => $token,
        ], 'تم تسجيل جامع النفايات بنجاح', 201);
} catch (ValidationException $e) {
    return app(ErrorHandlerController::class)->handleValidationErrors($e);
} catch (\Exception $e) {
    return app(ErrorHandlerController::class)->handleException($e);
}
}


    public function login(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'email' => 'required|email',
                'password' => 'required|string',
            ]);

            $wasteCollector = WasteCollector::where('email', $validatedData['email'])->first();

            if ($wasteCollector && Hash::check($validatedData['password'], $wasteCollector->password)) {
                $token = $wasteCollector->createToken('WasteCollector Token')->accessToken;

                return $this->sendResponse([
                    'collector' => [
                        'id' => $wasteCollector->id,
                        'name' => $wasteCollector->name,
                        'business_name' => $wasteCollector->business_name,
                        'email' => $wasteCollector->email,
                        'phone' => $wasteCollector->phone,
                        'location' => $wasteCollector->location,
                        'logo' => $wasteCollector->logo ? asset('storage/' . $wasteCollector->logo) : null,
                    ],
                    'token' => $token,
                ], 'تم تسجيل الدخول بنجاح', 200);
            }

            return $this->sendError('غير مصرح', ['error' => 'البيانات غير صحيحة'], 401);
        } catch (ValidationException $e) {
            return app(ErrorHandlerController::class)->handleValidationErrors($e);
        } catch (\Exception $e) {
            return app(ErrorHandlerController::class)->handleException($e);
        
        }
    }

    public function getProfile(Request $request)
{
    try {
        $wasteCollector = Auth::guard('waste_collectors')->user();

        if ($wasteCollector) {
            $wasteTypesTranslated = $wasteCollector->wasteTypes->map(function ($type) {
                return [
                    'id' => $type->id,
                    'name_ar' => $type->name_ar ?? $type->name,
                    'name_en' => $type->name_en ?? $type->name,
                    'price' => $type->pivot->waste_price,
                ];
            });

            return $this->sendResponse([
                'collector' => [
                    'id' => $wasteCollector->id,
                    'name' => $wasteCollector->name,
                    'business_name' => $wasteCollector->business_name,
                    'email' => $wasteCollector->email,
                    'phone' => $wasteCollector->phone,
                    'location' => $wasteCollector->location,
                    'logo' => $wasteCollector->logo ? asset('storage/' . $wasteCollector->logo) : null,
                    'waste_types' => $wasteTypesTranslated,
                    'rating' => (float) $wasteCollector->rating,
                    'latitude' => $wasteCollector->latitude,
                    'longitude' => $wasteCollector->longitude,
                    'phone_verified_at' => $wasteCollector->phone_verified_at,
                    'created_at' => $wasteCollector->created_at,
                    'updated_at' => $wasteCollector->updated_at
                ]
            ], 'تم جلب البيانات بنجاح', 200);
        }

        return $this->sendError('غير مصرح', ['error' => 'المستخدم غير موجود'], 401);

    } catch (ValidationException $e) {
        return $this->handleValidationErrors($e);
    } catch (\Exception $e) {
        return $this->handleException($e);
    }
}

public function updateProfile(Request $request)
{
    try {
        $wasteCollector = Auth::guard('waste_collectors')->user();

        if (!$wasteCollector) {
            return $this->sendError('غير مصرح', ['error' => 'المستخدم غير موجود'], 401);
        }

        // التحقق من البيانات
        $validatedData = $request->validate([
            'name' => 'nullable|string|max:255',
            'business_name' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:20|unique:waste_collectors,phone,' . $wasteCollector->id,
            'location' => 'nullable|string|max:255',
            'rating' => 'nullable|numeric|min:0|max:5',
            'latitude' => 'nullable|numeric|between:-90,90',
            'longitude' => 'nullable|numeric|between:-180,180',
            'waste_types' => 'nullable|array|min:1',
            'waste_types.*.id' => 'required|integer|exists:waste_types,id',
            'waste_types.*.price' => 'nullable|numeric|min:0'
        ]);

        // تحديث البيانات الأساسية
        $wasteCollector->fill($request->only([
            'name', 'business_name', 'phone', 'location', 'rating', 'latitude', 'longitude'
        ]));
        $wasteCollector->save();

        // تحديث أنواع النفايات مع السعر
        if ($request->has('waste_types')) {
            $wasteTypesInput = $request->input('waste_types');
            $syncData = [];

            foreach ($wasteTypesInput as $type) {
                if (isset($type['id'])) {
                    $syncData[$type['id']] = [
                        'waste_price' => $type['price'] ?? null
                    ];
                }
            }

            $wasteCollector->wasteTypes()->sync($syncData);
        }

        // تجهيز البيانات للرد بدون price
        $wasteTypesTranslated = $wasteCollector->wasteTypes->map(function ($type) {
            return [
                'id' => $type->id,
                'name_ar' => $type->name_ar ?? $type->name,
                'name_en' => $type->name_en ?? $type->name
            ];
        });

        return $this->sendResponse([
            'collector' => [
                'id' => $wasteCollector->id,
                'name' => $wasteCollector->name,
                'business_name' => $wasteCollector->business_name,
                'email' => $wasteCollector->email,
                'phone' => $wasteCollector->phone,
                'location' => $wasteCollector->location,
                'logo' => $wasteCollector->logo ? asset('storage/' . $wasteCollector->logo) : null,
                'waste_types' => $wasteTypesTranslated,
                'rating' => (float) $wasteCollector->rating,
                'latitude' => $wasteCollector->latitude,
                'longitude' => $wasteCollector->longitude,
                'phone_verified_at' => $wasteCollector->phone_verified_at,
                'created_at' => $wasteCollector->created_at,
                'updated_at' => $wasteCollector->updated_at
            ]
        ], 'تم تحديث البيانات بنجاح', 200);
    } catch (ValidationException $e) {
        return $this->handleValidationErrors($e);
    } catch (\Exception $e) {
        return $this->handleException($e);
    }
}


public function index(Request $request)
{
    try {
        $query = WasteCollector::query()->with('wasteTypes');

        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('business_name', 'LIKE', "%{$search}%")
                  ->orWhere('email', 'LIKE', "%{$search}%")
                  ->orWhere('phone', 'LIKE', "%{$search}%")
                  ->orWhere('location', 'LIKE', "%{$search}%");
            });
        }

        if ($request->has('location')) {
            $location = $request->input('location');
            $query->where('location', 'LIKE', "%{$location}%");
        }

        if ($request->has('latitude') && $request->has('longitude')) {
            $latitude = $request->input('latitude');
            $longitude = $request->input('longitude');

            $query->selectRaw("
                *,
                ROUND((6371 * acos(
                    cos(radians(?)) *
                    cos(radians(latitude)) *
                    cos(radians(longitude) - radians(?)) +
                    sin(radians(?)) *
                    sin(radians(latitude))
                )), 2) AS distance", [$latitude, $longitude, $latitude]);
        }

        $sortBy = $request->input('sort_by', 'business_name');
        $sortOrder = $request->input('sort_order', 'asc');

        $allowedSortFields = ['business_name', 'email', 'phone', 'location', 'distance', 'rating'];
        if (in_array($sortBy, $allowedSortFields)) {
            if ($sortBy === 'distance' && (!$request->has('latitude') || !$request->has('longitude'))) {
                return response()->json([
                    'success' => false,
                    'message' => 'يجب تحديد خطوط الطول والعرض للترتيب حسب المسافة'
                ], 400);
            }
            $query->orderBy($sortBy, $sortOrder);
        }

        $totalResults = $query->count();

        $wasteCollectors = $query->paginate(10);

        $wasteCollectors->getCollection()->transform(function ($collector) {
            // تحويل waste_types إلى List of Strings فقط
            $collector->waste_types = $collector->wasteTypes->map(function ($type) {
                return $type->name_ar ?? $type->name;
            });

            // إزالة العلاقة الأصلية
            unset($collector->wasteTypes);

            // تنسيق المسافة إن وجدت
            if (isset($collector->distance)) {
                $collector->distance = $collector->distance . ' كم';
            }

            return $collector;
        });

        return response()->json([
            'success' => true,
            'total_results' => $totalResults,
            'data' => $wasteCollectors,
            'sorting_info' => [
                'current_sort' => $sortBy,
                'current_order' => $sortOrder,
                'available_sort_fields' => $allowedSortFields,
                'sort_order_options' => ['asc' => 'تصاعدي', 'desc' => 'تنازلي']
            ]
        ]);
    } catch (\Exception $e) {
        return app(ErrorHandlerController::class)->handleException($e);
    }
}

public function show($id)
{
    try {
        $wasteCollector = WasteCollector::with('wasteTypes')->find($id);

        if (!$wasteCollector) {
            return response()->json([
                'success' => false,
                'message' => 'لم يتم العثور على جامع النفايات'
            ], 404);
        }

        // waste_types: مجرد أسماء بالعربي أو الإنجليزي
        $wasteTypes = $wasteCollector->wasteTypes->map(function ($type) {
            return $type->name_ar ?? $type->name;
        });

        // waste_types_price: تفاصيل النوع + السعر من جدول waste_types (price_per_kg)
        $wasteTypesPrice = $wasteCollector->wasteTypes->map(function ($type) {
            return [
                'id' => $type->id,
                'name_ar' => $type->name_ar ?? $type->name,
                'name_en' => $type->name_en ?? $type->name,
                'price_per_kg' => $type->price_per_kg // السعر من الجدول نفسه
            ];
        });

        return response()->json([
            'success' => true,
            'data' => [
                'business_name' => $wasteCollector->business_name,
                'email' => $wasteCollector->email,
                'phone' => $wasteCollector->phone,
                'logo' => $wasteCollector->logo ? asset('storage/' . $wasteCollector->logo) : null,
                'rating' => (float) $wasteCollector->rating,
                'waste_types' => $wasteTypes,
                'waste_types_price' => $wasteTypesPrice,
                'location' => $wasteCollector->location,
            ]
        ]);
    } catch (ValidationException $e) {
        return app(ErrorHandlerController::class)->handleValidationErrors($e);
    } catch (\Exception $e) {
        return app(ErrorHandlerController::class)->handleException($e);
    }
}

    // ✅ جلب كل الطلبات الخاصة بالكوليكتور ومعاها الايتمز
  public function allOrders()
{
    try {
        $collector = Auth::guard('waste_collectors')->user();

        if (!$collector) {
            return $this->sendError('غير مصرح', ['error' => 'يجب تسجيل الدخول'], 401);
        }

        $orders = WasteTypeCurrentOrder::with(['user', 'collector', 'items.wasteType'])
            ->where('collector_id', $collector->id)
            ->latest()
            ->get();

        $formattedOrders = $orders->map(function ($order) {
            return [
                'order_id'       => $order->id,
                'user_name'      => $order->user->name ?? 'غير متوفر',
                'collector_name' => $order->collector->name ?? 'غير متوفر',
                'pickup_time'    => $order->pickup_time ?? 'غير متوفر',
                'location'       => $order->location_name ?? 'غير متوفر',
                'status'         => $order->status,
                'created_at'     => $order->created_at->format('Y-m-d H:i:s'),
                'items' => $order->items->map(function ($item) {
                    $wasteType = $item->wasteType;
                    $pricePerKg = $wasteType->price_per_kg ?? 0;

                    return [
                        'id' => $item->id,
                        'quantity' => $item->quantity,
                        'price_for_kg' => $pricePerKg,
                        'total_price' => $item->quantity * $pricePerKg,
                        'waste_type' => [
                            'id' => $wasteType->id ?? null,
                            'name' => $wasteType->name ?? 'غير معروف',
                        ],
                    ];
                })
            ];
        });

        return $this->sendResponse($formattedOrders, 'تم جلب الطلبات بنجاح');

    } catch (\Exception $e) {
        return $this->sendError('خطأ في الخادم', ['error' => $e->getMessage()], 500);
    }
}

    // ✅ جلب طلب واحد فقط للكوليكتور بالتفاصيل + الايتمز
    public function oneOrder($orderId)
    {
        try {
            $collector = Auth::guard('waste_collectors')->user();

            $order = WasteTypeCurrentOrder::with(['user', 'collector', 'items.wasteType'])
                ->where('id', $orderId)
                ->where('collector_id', $collector->id)
                ->first();

            if (!$order) {
                return $this->sendError('الطلب غير موجود أو لا يتبع هذا الكوليكتور', [], 404);
            }

            $items = $order->items->map(function ($item) {
                return [
                    'id' => $item->id,
                    'quantity' => $item->quantity,
                    'price_for_kg' => $item->price_for_kg,
                    'points_for_kg' => $item->points_for_kg,
                    'total_price' => $item->quantity * $item->price_for_kg,
                    'waste_type' => [
                        'id' => $item->wasteType->id ?? null,
                        'name' => $item->wasteType->name ?? 'غير معروف',
                    ],
                ];
            });

            $orderDetails = [
                'id' => $order->id,
                'user_name' => $order->user->name ?? 'غير متوفر',
                'collector_name' => $order->collector->name ?? 'غير متوفر',
                'pickup_time' => $order->pickup_time,
                'location' => $order->location_name,
                'status' => $order->status,
                'created_at' => $order->created_at->format('Y-m-d H:i:s'),
                'items' => $items
            ];

            return $this->sendResponse(['order' => $orderDetails], 'تم جلب تفاصيل الطلب بنجاح', 200);

        } catch (\Exception $e) {
            return $this->sendError('خطأ في الخادم', ['error' => $e->getMessage()], 500);
        }
    }




    public function sendPhoneVerificationCode(Request $request)
    {
        try {
            $request->validate([
                'phone' => 'required|string'
            ], [
                'phone.required' => 'رقم الهاتف مطلوب'
            ]);

            $phone = $request->phone;

            $code = str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);

            Cache::put('collector_phone_verification_' . $phone, [
                'code' => $code,
                'attempts' => 0
            ], now()->addMinutes(10));

            $client = new Client(
                config('services.twilio.account_sid'),
                config('services.twilio.auth_token')
            );

            $message = $client->messages->create(
                $phone,
                [
                    'from' => config('services.twilio.phone_number'),
                    'body' => "رمز التحقق الخاص بك هو: {$code}. هذا الرمز صالح لمدة 10 دقائق."
                ]
            );

            return $this->sendResponse([], 'تم إرسال رمز التحقق بنجاح');
        } catch (Exception $e) {
            return $this->sendError('فشل في إرسال رمز التحقق: ' . $e->getMessage(), [], 400);
        }
    }

    public function resendVerificationCode(Request $request)
    {
        try {
            $request->validate([
                'phone' => 'required|string'
            ], [
                'phone.required' => 'رقم الهاتف مطلوب'
            ]);

            $phone = $request->phone;

            $verification = Cache::get('collector_phone_verification_' . $phone);

            if ($verification && $verification['attempts'] >= 3) {
                return $this->sendError('لقد تجاوزت الحد الأقصى لمحاولات إعادة الإرسال. يرجى الانتظار 10 دقائق.', [], 400);
            }

            $code = str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);

            Cache::put('collector_phone_verification_' . $phone, [
                'code' => $code,
                'attempts' => $verification ? $verification['attempts'] + 1 : 1
            ], now()->addMinutes(10));

            $client = new Client(
                config('services.twilio.account_sid'),
                config('services.twilio.auth_token')
            );

            $message = $client->messages->create(
                $phone,
                [
                    'from' => config('services.twilio.phone_number'),
                    'body' => "رمز التحقق الجديد الخاص بك هو: {$code}. هذا الرمز صالح لمدة 10 دقائق."
                ]
            );

            return $this->sendResponse([], 'تم إعادة إرسال رمز التحقق بنجاح');
        } catch (Exception $e) {
            return $this->sendError('فشل في إعادة إرسال رمز التحقق: ' . $e->getMessage(), [], 400);
        }
    }

    public function verifyPhoneCode(Request $request)
    {
        try {
            $request->validate([
                'phone' => 'required|string',
                'code' => 'required|string|size:6'
            ], [
                'phone.required' => 'رقم الهاتف مطلوب',
                'code.required' => 'رمز التحقق مطلوب',
                'code.size' => 'رمز التحقق يجب أن يكون 6 أرقام'
            ]);

            $phone = $request->phone;
            $code = $request->code;

            $verification = Cache::get('collector_phone_verification_' . $phone);

            if (!$verification) {
                return $this->sendError('رمز التحقق غير صالح أو منتهي الصلاحية', [], 400);
            }

            if ($verification['code'] !== $code) {
                return $this->sendError('رمز التحقق غير صحيح', [], 400);
            }

            if (Auth::guard('waste_collectors')->check()) {
                Auth::guard('waste_collectors')->user()->update([
                    'phone_verified_at' => now()
                ]);
            }

            Cache::forget('collector_phone_verification_' . $phone);

            return $this->sendResponse([], 'تم التحقق من رقم الهاتف بنجاح');
        } catch (Exception $e) {
            return $this->sendError('فشل في التحقق من الرمز: ' . $e->getMessage(), [], 400);
        }
    }

    public function getNearbyUsers(Request $request)
    {
        try {
            $collector = Auth::guard('waste_collectors')->user();
            if (!$collector) {
                return $this->sendError('يجب تسجيل الدخول أولا', [], 401);
            }

            if (!$collector->latitude || !$collector->longitude) {
                return $this->sendError('لم يتم تحديد موقع الكوليكتور', [], 422);
            }

            $collectorLat = $collector->latitude;
            $collectorLng = $collector->longitude;

            $radius = $request->input('radius', 10);

            if ($radius < 1 || $radius > 50) {
                return $this->sendError('قيمة نصف القطر غير صالحة', [], 422);
            }

            $users = User::selectRaw("
                *,
                (6371 * acos(
                    cos(radians(?)) *
                    cos(radians(latitude)) *
                    cos(radians(longitude) - radians(?)) +
                    sin(radians(?)) *
                    sin(radians(latitude))
                )) AS distance", [$collectorLat, $collectorLng, $collectorLat])
                ->having('distance', '<=', $radius)
                ->orderBy('distance')
                ->get();

            if ($users->isEmpty()) {
                return $this->sendError('لا يوجد مستخدمين في نطاق البحث', [], 404);
            }

            $usersData = $users->map(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'phone' => $user->phone,
                    'location' => $user->location,
                    'photo' => $user->photo ? asset('storage/' . $user->photo) : null,
                    'distance' => round($user->distance, 2) . ' كم', // المسافة بالكيلومترات مع الوحدة
                    'points' => $user->points ?? 0
                ];
            });

            return $this->sendResponse([
                'users' => $usersData
            ], 'تم جلب المستخدمين القريبين بنجاح', 200);

        } catch (ValidationException $e) {
            return $this->sendError('خطأ في البيانات', $e->errors(), 422);
        } catch (\Exception $e) {
            return $this->sendError('خطأ في النظام', ['error' => $e->getMessage()], 500);
        }
    }
}
