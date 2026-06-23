<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Farm extends Model
{
    protected $fillable = ['name', 'logo_path'];

    public function users()
    {
        return $this->hasMany(User::class);
    }
}
