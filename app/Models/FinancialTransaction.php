<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Scopes\FarmScope;

class FinancialTransaction extends Model
{
    use HasFactory;

    protected static function booted(): void
    {
        static::addGlobalScope(new FarmScope);
    }

    protected $fillable = [
        'farm_id',
        'type',
        'amount',
        'category',
        'description',
        'transaction_date',
        'logged_by',
    ];

    public function logger()
    {
        return $this->belongsTo(User::class, 'logged_by');
    }
}
