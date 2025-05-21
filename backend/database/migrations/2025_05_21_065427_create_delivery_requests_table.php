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
        Schema::create('delivery_requests', function (Blueprint $table) {
            $table->id();
            // delivery info
            $table->string('pickup_address');
            $table->string('pickup_name');
            $table->string('pickup_contact_no');
            $table->string('pickup_email');
            $table->string('delivery_address');
            $table->string('delivery_name');
            $table->string('delivery_contact_no');
            $table->string('delivery_email');
            $table->enum('type_of_good', ['Document', 'Parcel'])->default('Document');
            $table->enum('delivery_provider', ['DHL', 'STARTRACK', 'ZOOM2U', 'TGE'])->default('DHL');
            $table->timestamp('pickup_date_time')->nullable();

            // package info
            $table->text('package_description');
            $table->integer('weight')->default(0);
            $table->integer('length')->default(0);
            $table->integer('width')->default(0);
            $table->integer('height')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('delivery_requests');
    }
};
