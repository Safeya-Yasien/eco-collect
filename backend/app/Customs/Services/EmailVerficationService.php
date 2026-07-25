<?php

 namespace App\Customs\Services;

 use App\Models\emailvertoken;
use App\Notifications\emailverfivationnotification;
use Illuminate\Support\str;
use Illuminate\Support\Facades\Notification;

class EmailVerficationService
{
    public function sendVerifyEmailLink($user)
    {
        $url = route('verification.verify', ['id' => $user->id, 'hash' => sha1($user->email)]);
        $user->notify((new emailverfivationnotification($url))->onQueue('emails'));
    }


    public function generateEmailVerficationLink(string $email)
    {
        // التحقق إذا كان هناك رمز موجود مسبقًا
        $checkIfTokenExists = emailvertoken::where('email', $email)->first();

        // إذا كان موجودًا، قم بحذفه
        if ($checkIfTokenExists) {
            $checkIfTokenExists->delete();
        }

        // إنشاء رمز جديد
        $token = Str::uuid();

        // إنشاء الرابط
        $url = config('app.url') . "?token=" . $token . "&email=" . $email;

        // حفظ الرمز الجديد
        $saveToken = emailvertoken::create([
            'email' => $email,
            'token' => $token,
            'expired_at' => now()->addMinutes(12000),
        ]);

        // إرجاع الرابط إذا تم الحفظ بنجاح
        if ($saveToken) {
            return $url;
        }

        // في حالة فشل الحفظ، يمكنك التعامل مع هذا السيناريو
        return null;
    }
}
