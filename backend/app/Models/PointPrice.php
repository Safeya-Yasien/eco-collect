<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;

use Illuminate\Database\Eloquent\Model;

class PointPrice extends Model
{
    use HasFactory;

    protected $fillable = ['points_for_kg', 'active'];
}
