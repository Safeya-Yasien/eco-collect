<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('waste_type_current_orders', function (Blueprint $table) {
            // إضافة location_name إذا لم يكن موجوداً
            if (!Schema::hasColumn('waste_type_current_orders', 'location_name')) {
                $table->string('location_name')->nullable()->after('location_id');
            }
            
            // إضافة pickup_time إذا لم يكن موجوداً
            if (!Schema::hasColumn('waste_type_current_orders', 'pickup_time')) {
                $table->dateTime('pickup_time')->nullable()->after('arrival_time');
            }
            
            // تعديل arrival_time من date إلى datetime
            if (Schema::hasColumn('waste_type_current_orders', 'arrival_time')) {
                $table->dateTime('arrival_time')->nullable()->change();
            }
            
            // إضافة is_converted إذا لم يكن موجوداً
            if (!Schema::hasColumn('waste_type_current_orders', 'is_converted')) {
                $table->boolean('is_converted')->default(false)->after('status');
            }
        });

        // تعديل enum status ليشمل جميع الحالات المطلوبة
        DB::statement("ALTER TABLE waste_type_current_orders MODIFY COLUMN status ENUM('pending', 'scheduled', 'on_delivery', 'completed', 'rejected', 'paid') DEFAULT 'pending'");
        
        // جعل location_id nullable لأننا نستخدم location_name بدلاً منه
        Schema::table('waste_type_current_orders', function (Blueprint $table) {
            $table->foreignId('location_id')->nullable()->change();
            $table->foreignId('waste_type_id')->nullable()->change();
            $table->double('quantity')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('waste_type_current_orders', function (Blueprint $table) {
            if (Schema::hasColumn('waste_type_current_orders', 'location_name')) {
                $table->dropColumn('location_name');
            }
            if (Schema::hasColumn('waste_type_current_orders', 'pickup_time')) {
                $table->dropColumn('pickup_time');
            }
            if (Schema::hasColumn('waste_type_current_orders', 'is_converted')) {
                $table->dropColumn('is_converted');
            }
        });
        
        DB::statement("ALTER TABLE waste_type_current_orders MODIFY COLUMN status ENUM('paid', 'on_delivery', 'rejected') DEFAULT 'on_delivery'");
    }
};

