<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'user_type', 'balance', 'points', 'balance_by_points', 'date'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }}
