<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FinancialTransaction extends Model
{
    use HasFactory;

    protected $fillable = [
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
