<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payroll extends Model
{
    use HasFactory;

    protected $table = 'payroll';

    protected $fillable = [
        'user_id',
        'month',
        'year',
        'base_pay',
        'allowances',
        'deductions',
        'bonuses',
        'net_payable',
        'payment_status',
    ];

    protected $casts = [
        'allowances' => 'array',
        'deductions' => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
