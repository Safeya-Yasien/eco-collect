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
        Schema::create('current_orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('collector_id')->constrained('waste_collectors')->onDelete('cascade');
            $table->foreignId('location_id')->constrained()->onDelete('cascade');
            $table->enum('status', ['paid', 'on_delivery', 'rejected'])->default('on_delivery')->change();
            $table->date('arrival_time')->nullable();
            $table->integer('points_for_kg');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('current_orders');
    }
};
