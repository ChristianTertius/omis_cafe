<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Stock extends Model
{
    protected $guarded = ['id'];

    public function drink()
    {
        return $this->belongsTo(Drink::class);
    }
}
