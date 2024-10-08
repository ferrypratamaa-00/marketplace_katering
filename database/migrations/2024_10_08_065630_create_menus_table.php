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
        Schema::create('menus', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('category_menu_id')->foreign('category_menu_id')
                  ->references('id')
                  ->on('category_menus')
                  ->onDelete('cascade');
            $table->string('name');
            $table->string('description');
            $table->string('photo');
            $table->decimal('price', total:10, places:2);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('menus');
    }
};
