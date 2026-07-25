<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class CollectorNotification extends Model
{
    use HasFactory;

    protected $fillable = [
        'collector_id', 'title', 'des', 'order_data', 'status', 'time'
    ];

    protected $casts = [
        'order_data' => 'array',
        'time' => 'datetime',
    ];


    public function collector()
    {
        return $this->belongsTo(WasteCollector::class);
    }

    public function order()
    {
        return $this->belongsTo(WasteTypeCurrentOrder::class, 'order_id');  // تأكد من وجود عمود order_id في الجدول
    }
}
