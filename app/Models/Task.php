<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Scopes\FarmScope;

class Task extends Model
{
    use HasFactory;

    protected static function booted(): void
    {
        static::addGlobalScope(new FarmScope);
    }

    protected $fillable = [
        'farm_id',
        'title',
        'description',
        'assigned_to',
        'created_by',
        'due_date',
        'status',
    ];

    public function assignee()
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
