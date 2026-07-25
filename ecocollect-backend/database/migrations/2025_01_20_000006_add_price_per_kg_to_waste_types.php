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
        Schema::table('waste_types', function (Blueprint $table) {
            if (!Schema::hasColumn('waste_types', 'price_per_kg')) {
                $table->double('price_per_kg')->default(0)->after('image');
            }
            // إضافة name_ar و name_en إذا كانت مستخدمة
            if (!Schema::hasColumn('waste_types', 'name_ar')) {
                $table->string('name_ar')->nullable()->after('name');
            }
            if (!Schema::hasColumn('waste_types', 'name_en')) {
                $table->string('name_en')->nullable()->after('name_ar');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('waste_types', function (Blueprint $table) {
            if (Schema::hasColumn('waste_types', 'price_per_kg')) {
                $table->dropColumn('price_per_kg');
            }
            if (Schema::hasColumn('waste_types', 'name_ar')) {
                $table->dropColumn('name_ar');
            }
            if (Schema::hasColumn('waste_types', 'name_en')) {
                $table->dropColumn('name_en');
            }
        });
    }
};

