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
        Schema::table('waste_collector_types', function (Blueprint $table) {
            $table->double('waste_price')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('waste_collector_types', function (Blueprint $table) {
            $table->double('waste_price')->nullable(false)->change();
        });
    }
};

