<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductionBatch extends Model
{
    use HasFactory;

    protected $fillable = [
        'batch_name',
        'department',
        'start_date',
        'initial_population',
        'status',
    ];

    public function logs()
    {
        return $this->hasMany(ProductionLog::class, 'batch_id');
    }

    /**
     * Helper to get current population by subtracting mortalities
     */
    public function getCurrentPopulationAttribute()
    {
        $totalMortality = $this->logs()->sum('mortality_count');
        return $this->initial_population - $totalMortality;
    }
}
