<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WasteCollectorType extends Model
{
    protected $table = 'waste_collector_types';

    protected $fillable = [
        'collector_id',
        'waste_id',
        'waste_price',
    ];

    public $timestamps = false; // لو الجدول مفيهوش created_at / updated_at

    // العلاقة مع جامع النفايات
    public function collector()
    {
        return $this->belongsTo(WasteCollector::class, 'collector_id');
    }

    // العلاقة مع نوع النفاية
    public function waste()
    {
        return $this->belongsTo(WasteType::class, 'waste_id');
    }
}
