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
        Schema::create('collector_notifications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('collector_id')->constrained('waste_collectors')->onDelete('cascade');
            $table->string('title');
            $table->text('des');
            $table->date('time');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('collector_notifications');
    }
};
