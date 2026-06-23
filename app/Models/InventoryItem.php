<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Scopes\FarmScope;

class InventoryItem extends Model
{
    use HasFactory;

    protected static function booted(): void
    {
        static::addGlobalScope(new FarmScope);
    }

    protected $fillable = [
        'farm_id',
        'item_name',
        'category',
        'quantity',
        'unit',
        'cost_per_unit',
        'low_stock_threshold',
    ];

    public function transactions()
    {
        return $this->hasMany(InventoryTransaction::class, 'item_id');
    }
}
