<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Scopes\FarmScope;

class Department extends Model
{
    use HasFactory;

    protected static function booted(): void
    {
        static::addGlobalScope(new FarmScope);
    }

    protected $fillable = ['farm_id', 'name', 'base_salary'];
}
