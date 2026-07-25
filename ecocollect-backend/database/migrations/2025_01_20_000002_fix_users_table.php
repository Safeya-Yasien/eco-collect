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
        Schema::table('users', function (Blueprint $table) {
            // إضافة photo إذا لم يكن موجوداً (يستخدم بدلاً من image)
            if (!Schema::hasColumn('users', 'photo')) {
                $table->string('photo')->nullable()->after('image');
            }
            
            // إضافة latitude و longitude
            if (!Schema::hasColumn('users', 'latitude')) {
                $table->double('latitude')->nullable()->after('location');
            }
            if (!Schema::hasColumn('users', 'longitude')) {
                $table->double('longitude')->nullable()->after('latitude');
            }
            
            // إضافة points
            if (!Schema::hasColumn('users', 'points')) {
                $table->integer('points')->default(0)->after('longitude');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            if (Schema::hasColumn('users', 'photo')) {
                $table->dropColumn('photo');
            }
            if (Schema::hasColumn('users', 'latitude')) {
                $table->dropColumn('latitude');
            }
            if (Schema::hasColumn('users', 'longitude')) {
                $table->dropColumn('longitude');
            }
            if (Schema::hasColumn('users', 'points')) {
                $table->dropColumn('points');
            }
        });
    }
};

