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
        Schema::create('sales_pages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('product_name');
            $table->text('product_description');
            $table->text('features');
            $table->string('target_audience');
            $table->string('price');
            $table->text('usp')->nullable();
            
            // AI Output
            $table->string('headline')->nullable();
            $table->string('sub_headline')->nullable();
            $table->json('generated_content')->nullable(); // Store structured sections
            $table->longText('generated_html')->nullable(); // Store full rendered HTML
            
            $table->string('slug')->unique();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sales_pages');
    }
};
