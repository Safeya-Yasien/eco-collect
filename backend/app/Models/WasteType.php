<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class WasteType extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'name_ar', 'name_en', 'description', 'image', 'price_per_kg'];

  public function collectors()
    {
        return $this->belongsToMany(WasteCollector::class, 'waste_collector_types', 'waste_id', 'collector_id')
                    ->withPivot('waste_price');
    }


    public function orders()
    {
        return $this->belongsToMany(CurrentOrder::class, 'waste_type_current_order')
                    ->withPivot('quantity_kg', 'price_for_kg');
    }}
