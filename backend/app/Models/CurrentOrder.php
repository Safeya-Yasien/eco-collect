<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class CurrentOrder extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'collector_id', 'location_id', 'status', 'arrival_time', 'points_for_kg'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function collector()
    {
        return $this->belongsTo(WasteCollector::class);
    }

    public function location()
    {
        return $this->belongsTo(Location::class);
    }

    public function wasteTypes()
    {
        return $this->belongsToMany(WasteType::class, 'waste_type_current_order')
                    ->withPivot('quantity_kg', 'price_for_kg');
    }

    public static $statuses = ['paid', 'on_delivery', 'rejected'];

    public function setStatusAttribute($value)
    {
        if (!in_array($value, self::$statuses)) {
            throw new \InvalidArgumentException("Invalid status value");
        }
        $this->attributes['status'] = $value;
    }
}


