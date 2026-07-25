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
        Schema::table('waste_collectors', function (Blueprint $table) {
            $table->string('location')->nullable();
            $table->dropForeign(['location_id']);
            $table->dropColumn('location_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('waste_collectors', function (Blueprint $table) {
            $table->dropColumn('location');
            $table->foreignId('location_id')->nullable()->constrained()->onDelete('cascade');
        });
    }
}; 