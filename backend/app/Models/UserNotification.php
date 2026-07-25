<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class UserNotification extends Model
{
    use HasFactory;

    protected $fillable = [        'user_id', 'title', 'des', 'order_data', 'status', 'time'
];

protected $casts = [
    'order_data' => 'array',
    'time' => 'datetime',
];

    public function user()
    {
        return $this->belongsTo(User::class);
    }


    public function order()
    {
        return $this->belongsTo(WasteTypeCurrentOrder::class, 'order_id');  
    }
}
