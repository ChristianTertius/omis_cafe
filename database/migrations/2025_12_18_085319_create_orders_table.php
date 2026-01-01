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
        Schema::create('orders', function (Blueprint $table) {
            $table->foreignId('user_id')->constrained('users');
            $table->string('order_id')->unique()->after('id');
            $table->string('snap_token')->nullable()->after('order_id');
            $table->enum('payment_status', ['pending', 'paid', 'failed'])
                ->default('pending')
                ->after('snap_token');
            $table->decimal('total_amount', 15, 2)->after('payment_status');
            $table->string('customer_name')->after('total_amount');
            $table->string('customer_email')->after('customer_name');
            $table->string('customer_phone')->after('customer_email');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropColumn([
                'order_id',
                'snap_token',
                'payment_status',
                'total_amount',
                'customer_name',
                'customer_email',
                'customer_phone',
            ]);
        });
    }
};
