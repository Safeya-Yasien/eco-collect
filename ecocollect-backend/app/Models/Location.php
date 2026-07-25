<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;

use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'user_id',
        'user_type',
        'latitude',
        'longitude',
        'government',
        'address_description'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function wasteCollector()
    {
        return $this->hasOne(WasteCollector::class);
    }

    public function orders()
    {
        return $this->hasMany(CurrentOrder::class);
    }
}
