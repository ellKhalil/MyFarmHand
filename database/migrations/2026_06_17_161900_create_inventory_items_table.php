<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('inventory_items', function (Blueprint $table) {
            $table->id();
            $table->string('item_name', 100);
            $table->enum('category', ['Feed', 'Livestock', 'Produce', 'Medicine', 'Equipment', 'Consumable', 'Other']);
            $table->decimal('quantity', 10, 2)->default(0.00);
            $table->string('unit', 20);
            $table->decimal('cost_per_unit', 10, 2)->default(0.00);
            $table->decimal('low_stock_threshold', 10, 2)->default(10.00);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('inventory_items');
    }
};
