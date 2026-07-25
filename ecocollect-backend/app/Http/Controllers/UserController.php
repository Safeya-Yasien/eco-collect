<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Storage;

use App\Customs\Services\EmailVerficationService;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\WasteTypeCurrentOrder;
use App\Models\Location;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Api\BaseController;
use Illuminate\Validation\ValidationException;
use App\Http\Controllers\Api\ErrorHandlerController;
use App\Http\Requests\Auth\UserLoginRequest;
use App\Http\Requests\Auth\UserRegisterRequest;
use App\Http\Requests\UpdateUserProfileRequest;
use Twilio\Rest\Client;
use Illuminate\Support\Facades\Cache;
use App\Models\WasteCollector;
use App\Models\PointPrice;
use App\Models\UserWallet;
use App\Models\Transaction;

class UserController extends BaseController
{
    private function handleImageUpload($image, $folder = 'users')
    {
        if (!$image) return null;

        $filename = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
        $path = $folder . '/' . $filename;

        // Store the original image
        $image->storeAs('public/' . $folder, $filename);

        return $path;
    }

    private function deleteOldImage($path)
    {
        if ($path && Storage::disk('public')->exists($path)) {
            Storage::disk('public')->delete($path);
        }
    }

    public function signUp(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|email|unique:users,email',
                'password' => [
                    'required',
                    'string',
                    'min:8',
                    'confirmed',
                    'regex:/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/'
                ],
                'location' => 'required|string|max:255',
                'phone' => 'required|string|max:20',
                'government' => 'required|string|max:255',
                'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048'
            ], [
                'name.required' => 'حقل الاسم مطلوب',
                'email.required' => 'حقل البريد الإلكتروني مطلوب',
                'email.email' => 'يجب إدخال بريد إلكتروني صحيح',
                'email.unique' => 'البريد الإلكتروني مستخدم بالفعل',
                'password.required' => 'حقل كلمة المرور مطلوب',
                'password.min' => 'كلمة المرور يجب أن تكون 8 أحرف على الأقل',
                'password.regex' => 'كلمة المرور يجب أن تحتوي على حروف وأرقام',
                'location.required' => 'حقل الموقع مطلوب',
                'phone.required' => 'حقل رقم الهاتف مطلوب',
                'phone.string' => 'حقل الهاتف يجب أن يكون نصاً',
                'government.required' => 'حقل المحافظة مطلوب',
                'image.image' => 'الملف يجب أن يكون صورة',
                'image.max' => 'حجم الصورة لا يجب أن يتجاوز 2 ميجابايت'
            ]);

            $validatedData['password'] = bcrypt($validatedData['password']);

            if ($request->hasFile('image')) {
                $validatedData['photo'] = $this->handleImageUpload($request->file('image'));
            }

            $user = User::create($validatedData);

            Location::create([
                'name' => $validatedData['location'],
                'user_id' => $user->id
            ]);

            $token = $user->createToken('User Token')->accessToken;

            return $this->sendResponse([
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'phone' => $user->phone,
                    'government' => $user->government,
                    'photo' => $user->photo ? asset('storage/' . $user->photo) : null,
                    'location' => $user->location
                ],
                'token' => $token
            ], 'تم تسجيل المستخدم بنجاح', 201);

        } catch (ValidationException $e) {
            return $this->sendError('خطأ في البيانات', $e->errors(), 422);
        } catch (\Exception $e) {
            return $this->sendError('خطأ في النظام', ['error' => $e->getMessage()], 500);
        }
    }

    public function login(Request $request)
    {
        try {
            $credentials = $request->validate([
                'email' => 'required|email',
                'password' => 'required|string'
            ], [
                'email.required' => 'حقل البريد الإلكتروني مطلوب',
                'email.email' => 'يجب إدخال بريد إلكتروني صحيح',
                'password.required' => 'حقل كلمة المرور مطلوب'
            ]);

            if (!Auth::attempt($credentials)) {
                return $this->sendError('غير مصرح', ['error' => 'البيانات غير صحيحة'], 401);
            }

            $user = Auth::user();
            $token = $user->createToken('User Token')->accessToken;

            return $this->sendResponse([
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'phone' => $user->phone,
                    'government' => $user->government,
                    'photo' => $user->photo ? asset('storage/' . $user->photo) : null,
                    'location' => $user->location
                ],
                'token' => $token
            ], 'تم تسجيل الدخول بنجاح', 200);

        } catch (ValidationException $e) {
            return $this->sendError('خطأ في البيانات', $e->errors(), 422);
        } catch (\Exception $e) {
            return $this->sendError('خطأ في النظام', ['error' => $e->getMessage()], 500);
        }
    }

    public function getProfile($id = null)
{
    try {
        $user = Auth::guard('api')->user();
        if (!$user) {
            return $this->sendError('غير مصرح', ['error' => 'يجب تسجيل الدخول أولاً'], 401);
        }

        // إذا تم تمرير معرف، تحقق من أنه نفس المستخدم المسجل دخوله
        if ($id && $user->id != $id) {
            return $this->sendError('غير مصرح', ['error' => 'بيانات غير صحيحة'], 401);
        }

        $user = User::with(['wallet'])->findOrFail($user->id);
        
        // حساب النقاط من الطلبات المكتملة
        $totalWasteQuantity = WasteTypeCurrentOrder::where('user_id', $user->id)
            ->where('status', 'completed')
            ->sum('quantity');

        $pointsPerKg = PointPrice::where('active', 1)->value('points_for_kg') ?? 10;
        $totalPoints = $totalWasteQuantity * $pointsPerKg;

        // تحديث النقاط في المحفظة
        if (!$user->wallet) {
            $user->wallet = UserWallet::create([
                'user_id' => $user->id,
                'points' => $totalPoints
            ]);
        } else {
            $user->wallet->points = $totalPoints;
            $user->wallet->save();
        }

        // التحقق من آخر معاملة تحويل
        $lastTransaction = Transaction::where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->first();

        return $this->sendResponse([
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'phone' => $user->phone,
            'location' => $user->location,
            'photo' => $user->photo ? asset('storage/' . $user->photo) : null,
            'total_points' => $totalPoints,
            'available_balance' => $user->wallet->points / 100,
            'points_breakdown' => [
                'new_points' => 0,
                'previous_points' => $lastTransaction ? $lastTransaction->points : $totalPoints
            ],
            'created_at' => $user->created_at,
            'updated_at' => $user->updated_at
        ], 'تم جلب بيانات المستخدم بنجاح', 200);

    } catch (ValidationException $e) {
        return app(ErrorHandlerController::class)->handleValidationErrors($e);
    } catch (\Exception $e) {
        return app(ErrorHandlerController::class)->handleException($e);
    }
}

    public function updateProfile(Request $request)
    {
        try {
            $user = Auth::user();

            if (!$user) {
                return $this->sendError('غير مصرح', ['error' => 'المستخدم غير موجود'], 404);
            }

            $validatedData = $request->validate([
                'name' => 'nullable|string|max:255',
                'phone' => 'nullable|string|max:20|unique:users,phone,' . $user->id,
                'government' => 'nullable|string|max:255',
                'location' => 'nullable|string|max:255',
                'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
                'latitude' => 'nullable|numeric|between:-90,90',
                'longitude' => 'nullable|numeric|between:-180,180',
            ], [
                'name.string' => 'حقل الاسم يجب أن يكون نصاً',
                'phone.string' => 'حقل الهاتف يجب أن يكون نصاً',
                'phone.unique' => 'رقم الهاتف مستخدم بالفعل',
                'government.string' => 'حقل المحافظة يجب أن يكون نصاً',
                'location.string' => 'حقل الموقع يجب أن يكون نصاً',
                'image.image' => 'الملف يجب أن يكون صورة',
                'image.max' => 'حجم الصورة لا يجب أن يتجاوز 2 ميجابايت',
                'latitude.numeric' => 'خط العرض يجب أن يكون رقماً',
                'latitude.between' => 'خط العرض يجب أن يكون بين -90 و 90',
                'longitude.numeric' => 'خط الطول يجب أن يكون رقماً',
                'longitude.between' => 'خط الطول يجب أن يكون بين -180 و 180',
            ]);

            if (isset($validatedData['name'])) $user->name = $validatedData['name'];
            if (isset($validatedData['phone'])) $user->phone = $validatedData['phone'];
            if (isset($validatedData['government'])) $user->government = $validatedData['government'];
            if (isset($validatedData['location'])) $user->location = $validatedData['location'];
            if (isset($validatedData['latitude'])) $user->latitude = $validatedData['latitude'];
            if (isset($validatedData['longitude'])) $user->longitude = $validatedData['longitude'];

            if ($request->hasFile('image')) {
                $this->deleteOldImage($user->photo);
                $user->photo = $this->handleImageUpload($request->file('image'));
            }

            $user->save();

            $totalWasteQuantity = WasteTypeCurrentOrder::where('user_id', $user->id)
                ->where('status', 'completed')
                ->sum('quantity');

            return $this->sendResponse([
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'phone' => $user->phone,
                    'government' => $user->government,
                    'photo' => $user->photo ? asset('storage/' . $user->photo) : null,
                    'location' => $user->location,
                    'points' => $user->points ?? 0,
                    'total_waste_quantity' => $totalWasteQuantity,
                    'latitude' => $user->latitude,
                    'longitude' => $user->longitude,
                    'phone_verified_at' => $user->phone_verified_at,
                    'created_at' => $user->created_at,
                    'updated_at' => $user->updated_at
                ]
            ], 'تم تحديث البيانات بنجاح', 200);

        } catch (ValidationException $e) {
            return $this->sendError('خطأ في البيانات', $e->errors(), 422);
        } catch (\Exception $e) {
            return $this->sendError('خطأ في النظام', ['error' => $e->getMessage()], 500);
        }
    }

    public function oneOrder($orderId)
{
    try {
        $userId = Auth::id();

        if (!$userId) {
            return $this->sendError('غير مصرح', ['error' => 'يجب تسجيل الدخول'], 401);
        }

        $order = WasteTypeCurrentOrder::with(['user', 'collector', 'wasteType', 'items.wasteType'])
            ->where('user_id', $userId)
            ->where('id', $orderId)
            ->firstOrFail();

        $items = $order->items->map(function ($item) {
            return [
                'id'         => $item->id,
                'quantity'   => $item->quantity,
                'waste_type' => [
                    'id'   => $item->wasteType->id ?? null,
                    'name' => $item->wasteType->name ?? 'غير معروف',
                ],
            ];
        });

        $orderDetails = [
            'order_id'       => $order->id,
            'user_name'      => $order->user->name ?? 'غير متوفر',
            'collector_name' => $order->collector->name ?? 'غير متوفر',
            'waste_type'     => $order->wasteType->name ?? 'غير متوفر',
            'quantity'       => $order->quantity,
            'pickup_time'    => $order->pickup_time,
            'location'       => $order->location_name,
            'status'         => $order->status,
            'price_for_kg'   => $order->price_for_kg,
            'points_for_kg'  => $order->points_for_kg,
            'created_at'     => $order->created_at->format('Y-m-d H:i:s'),
            'items'          => $items,
        ];

        return $this->sendResponse([
            'order' => $orderDetails
        ], 'تم جلب تفاصيل الطلب بنجاح', 200);

    } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
        return $this->sendError('غير موجود', ['error' => 'الطلب غير موجود'], 404);
    } catch (\Exception $e) {
        return $this->sendError('خطأ في النظام', ['error' => $e->getMessage()], 500);
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

            Cache::put('phone_verification_' . $phone, [
                'code' => $code,
                'attempts' => 0
            ], now()->addMinutes(10));

            // Initialize Twilio client
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

            $verification = Cache::get('phone_verification_' . $phone);

            if ($verification && $verification['attempts'] >= 3) {
                return $this->sendError('لقد تجاوزت الحد الأقصى لمحاولات إعادة الإرسال. يرجى الانتظار 10 دقائق.', [], 400);
            }

            $code = str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);

            Cache::put('phone_verification_' . $phone, [
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

            $verification = Cache::get('phone_verification_' . $phone);

            if (!$verification) {
                return $this->sendError('رمز التحقق غير صالح أو منتهي الصلاحية', [], 400);
            }

            if ($verification['code'] !== $code) {
                return $this->sendError('رمز التحقق غير صحيح', [], 400);
            }

            if (Auth::check()) {
                Auth::user()->update([
                    'phone_verified_at' => now()
                ]);
            }

            Cache::forget('phone_verification_' . $phone);

            return $this->sendResponse([], 'تم التحقق من رقم الهاتف بنجاح');
        } catch (Exception $e) {
            return $this->sendError('فشل في التحقق من الرمز: ' . $e->getMessage(), [], 400);
        }
    }

    /**
     * Get current orders for the authenticated user (pending, scheduled, on_delivery)
     */
  public function currentOrders()
{
    try {
        $userId = Auth::id();
        if (!$userId) {
            return $this->sendError('غير مصرح', ['error' => 'يجب تسجيل الدخول'], 401);
        }

        $statuses = ['pending', 'scheduled', 'on_delivery'];

        $orders = WasteTypeCurrentOrder::with([
            'user',
            'collector',
            'items.wasteType'
        ])
            ->where('user_id', $userId)
            ->whereIn('status', $statuses)
            ->orderByDesc('created_at')
            ->get();

        $orderDetails = $orders->map(function ($order) {
            return [
                'order_id'       => $order->id,
                'user_name'      => $order->user->name ?? 'غير متوفر',
                'collector_name' => $order->collector->name ?? 'غير متوفر',
                'pickup_time'    => $order->pickup_time,
                'arrival_time'   => $order->arrival_time,
                'location'       => $order->location_name,
                'status'         => $order->status,
                'price_for_kg'   => $order->price_for_kg,
                'created_at'     => $order->created_at->format('Y-m-d H:i:s'),
                'items'          => $order->items->map(function ($item) {
                    return [
                        'id'         => $item->id,
                        'quantity'   => $item->quantity,
                        'waste_type' => [
                            'id'   => $item->wasteType->id ?? null,
                            'name' => $item->wasteType->name ?? null,
                        ]
                    ];
                })
            ];
        });

        return $this->sendResponse([
            'orders' => $orderDetails
        ], 'تم جلب الطلبات الحالية بنجاح', 200);

    } catch (\Exception $e) {
        return $this->sendError('خطأ في النظام', ['error' => $e->getMessage()], 500);
    }
}


    /**
     * Get completed or rejected orders for the authenticated user
     */
  public function pastOrders()
{
    try {
        $userId = Auth::id();
        if (!$userId) {
            return $this->sendError('غير مصرح', ['error' => 'يجب تسجيل الدخول'], 401);
        }

        $statuses = ['completed', 'rejected'];

        $orders = WasteTypeCurrentOrder::with([
            'user',
            'collector',
            'items.wasteType'
        ])
            ->where('user_id', $userId)
            ->whereIn('status', $statuses)
            ->orderByDesc('created_at')
            ->get();

        $orderDetails = $orders->map(function ($order) {
            return [
                'order_id'       => $order->id,
                'user_name'      => $order->user->name ?? 'غير متوفر',
                'collector_name' => $order->collector->name ?? 'غير متوفر',
                'pickup_time'    => $order->pickup_time,
                'arrival_time'   => $order->arrival_time,
                'location'       => $order->location_name,
                'status'         => $order->status,
                'price_for_kg'   => $order->price_for_kg,
                'created_at'     => $order->created_at->format('Y-m-d H:i:s'),
                'items'          => $order->items->map(function ($item) {
                    return [
                        'id'         => $item->id,
                        'quantity'   => $item->quantity,
                        'waste_type' => [
                            'id'   => $item->wasteType->id ?? null,
                            'name' => $item->wasteType->name ?? null,
                        ]
                    ];
                })
            ];
        });

        return $this->sendResponse([
            'orders' => $orderDetails
        ], 'تم جلب الطلبات السابقة بنجاح', 200);

    } catch (\Exception $e) {
        return $this->sendError('خطأ في النظام', ['error' => $e->getMessage()], 500);
    }
}


    public function getNearbyCollectors(Request $request)
    {
        try {
            $user = Auth::user();
            if (!$user) {
                return $this->sendError('يجب تسجيل الدخول أولا', [], 401);
            }

            if (!$user->latitude || !$user->longitude) {
                return $this->sendError('لم يتم تحديد موقع المستخدم', [], 422);
            }

            $userLat = $user->latitude;
            $userLng = $user->longitude;

            $radius = $request->input('radius', 10);

            if ($radius < 1 || $radius > 50) {
                return $this->sendError('قيمة نصف القطر غير صالحة', [], 422);
            }

            $collectors = WasteCollector::selectRaw("
                *,
                (6371 * acos(
                    cos(radians(?)) *
                    cos(radians(latitude)) *
                    cos(radians(longitude) - radians(?)) +
                    sin(radians(?)) *
                    sin(radians(latitude))
                )) AS distance", [$userLat, $userLng, $userLat])
                ->having('distance', '<=', $radius)
                ->orderBy('distance')
                ->get();

            if ($collectors->isEmpty()) {
                return $this->sendError('لا يوجد جامعي نفايات في نطاق البحث', [], 404);
            }

            $collectorsData = $collectors->map(function ($collector) {
                return [
                    'id' => $collector->id,
                    'name' => $collector->name,
                    'business_name' => $collector->business_name,
                    'phone' => $collector->phone,
                    'location' => $collector->location,
                    'logo' => $collector->logo ? asset('storage/' . $collector->logo) : null,
                    'distance' => round($collector->distance, 2) . ' كم', // distance in kilometers with unit
                    'waste_types' => $collector->waste_types,
                    'rating' => $collector->rating
                ];
            });

            return $this->sendResponse([
                'collectors' => $collectorsData
            ], 'تم جلب جامعي النفايات القريبين بنجاح', 200);

        } catch (ValidationException $e) {
            return $this->sendError('خطأ في البيانات', $e->errors(), 422);
        } catch (\Exception $e) {
            return $this->sendError('خطأ في النظام', ['error' => $e->getMessage()], 500);
        }
    }

}
