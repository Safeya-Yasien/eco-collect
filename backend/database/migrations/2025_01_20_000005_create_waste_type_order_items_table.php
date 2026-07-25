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
        if (!Schema::hasTable('waste_type_order_items')) {
            Schema::create('waste_type_order_items', function (Blueprint $table) {
                $table->id();
                $table->foreignId('order_id')->constrained('waste_type_current_orders')->onDelete('cascade');
                $table->foreignId('waste_type_id')->constrained('waste_types')->onDelete('cascade');
                $table->double('quantity');
                $table->double('price_for_kg')->nullable();
                $table->integer('points_for_kg')->nullable();
                $table->timestamps();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('waste_type_order_items');
    }
};

