<?php

namespace App\Models;

use Laravel\Passport\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Model;

class WasteCollector extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'business_name',
        'phone',
        'email',
        'password',
        'logo',
        'rating',
        'latitude',       
        'longitude',
        'location',
        'phone_verified_at'
    ];

    protected $hidden = ['password', 'remember_token'];

    protected $casts = [
        'password' => 'hashed',
    ];

    public function wallet()
    {
        return $this->hasOne(CollectorWallet::class);
    }

    public function notifications()
    {
        return $this->hasMany(CollectorNotification::class);
    }

   public function wasteTypes()
    {
        return $this->belongsToMany(WasteType::class, 'waste_collector_types', 'collector_id', 'waste_id')
                    ->withPivot('waste_price');
    }

    public function orders()
    {
        return $this->hasMany(CurrentOrder::class);
    }

    public function collectorNotifications()
    {
        return $this->hasMany(CollectorNotification::class, 'collector_id');
    }
}
