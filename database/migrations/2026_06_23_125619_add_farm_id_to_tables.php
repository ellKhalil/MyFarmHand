<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $tables = ['users', 'inventory_items', 'financial_transactions', 'production_batches', 'tasks', 'departments'];
        foreach ($tables as $tableName) {
            if (!Schema::hasColumn($tableName, 'farm_id')) {
                Schema::table($tableName, function (Blueprint $table) {
                    $table->foreignId('farm_id')->nullable()->constrained('farms')->cascadeOnDelete();
                });
            }
        }
        
        Schema::table('users', function (Blueprint $table) {
            if (Schema::hasColumn('users', 'company_name')) {
                $table->dropColumn('company_name');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('company_name')->nullable();
        });

        $tables = ['users', 'inventory_items', 'financial_transactions', 'production_batches', 'tasks', 'departments'];
        foreach ($tables as $tableName) {
            Schema::table($tableName, function (Blueprint $table) {
                $table->dropForeign(['farm_id']);
                $table->dropColumn('farm_id');
            });
        }
    }
};
