<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WasteTypeCurrentOrder extends Model
{
    protected $fillable = [
        'user_id',
        'collector_id',
        'waste_type_id',
        'quantity',
        'pickup_time',
        'status',
        'location_name' ,
        'waste_type_id',
        'quantity',
        'price_for_kg',
        'points_for_kg',
        'status',
        'arrival_time',
        'pickup_time'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function collector()
    {
        return $this->belongsTo(WasteCollector::class);
    }

    public function wasteType()
    {
        return $this->belongsTo(WasteType::class);
    }
public function items()
{
    return $this->hasMany(WasteTypeOrderItem::class, 'order_id');
}


}
