<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {

    private $tableName = 'email_templates';

    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create($this->tableName, function (Blueprint $table) {
            
            $table->id();
            
            $table->string('name');
            $table->string('code');
            $table->string('for');

            $table->string('from')->nullable();
            $table->string('to')->nullable();

            $table->string('title');
            $table->longText('subject')->nullable();
            $table->longText('situation')->nullable();
            $table->longText('banner')->nullable();
            $table->longText('message_body')->nullable();

            $table->string('button_link')->nullable();
            $table->string('button_level')->nullable();

            $table->string('footer_body')->nullable();
            $table->string('bottom_status')->nullable();
            $table->string('shortcodes')->nullable();

            $table->tinyInteger('status')->default(1);
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists($this->tableName);
    }
};
