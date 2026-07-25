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
        Schema::create('waste_collector_types', function (Blueprint $table) {
            $table->foreignId('collector_id')->constrained('waste_collectors')->onDelete('cascade');
            $table->foreignId('waste_id')->constrained('waste_types')->onDelete('cascade');
            $table->double('waste_price');
            $table->primary(['collector_id', 'waste_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('waste_collector_types');
    }
};
