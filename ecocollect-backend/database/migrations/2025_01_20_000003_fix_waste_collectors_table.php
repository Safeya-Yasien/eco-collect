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
            // إضافة rating
            if (!Schema::hasColumn('waste_collectors', 'rating')) {
                $table->double('rating')->default(0.0)->after('longitude');
            }
        });
        
        // إضافة phone_verified_at (يتم إضافتها عادة في migration منفصلة لكن سنضيفها هنا)
        if (!Schema::hasColumn('waste_collectors', 'phone_verified_at')) {
            Schema::table('waste_collectors', function (Blueprint $table) {
                $table->timestamp('phone_verified_at')->nullable()->after('rating');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('waste_collectors', function (Blueprint $table) {
            if (Schema::hasColumn('waste_collectors', 'rating')) {
                $table->dropColumn('rating');
            }
            if (Schema::hasColumn('waste_collectors', 'phone_verified_at')) {
                $table->dropColumn('phone_verified_at');
            }
        });
    }
};

