<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WasteTypeOrderItem extends Model
{
    protected $fillable = [
        'order_id',
        'waste_type_id',
        'quantity',
    ];

    public function wasteType()
    {
        return $this->belongsTo(WasteType::class);
    }
    
}
