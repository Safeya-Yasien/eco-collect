<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;

use Illuminate\Database\Eloquent\Model;

class CollectorWallet extends Model
{
    use HasFactory;

    protected $fillable = ['collector_id', 'points'];

    public function collector()
    {
        return $this->belongsTo(WasteCollector::class);
    }
}
