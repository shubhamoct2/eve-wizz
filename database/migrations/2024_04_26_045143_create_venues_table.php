<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Modules\Owner\Venue\Enums\StatusEnum;

return new class extends Migration
{

    private string $venuesTable = 'venues';
    private string $venuesDetailsTable = 'venue_details';


    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create($this->venuesTable, function (Blueprint $table) {
            $table->id();
            $table->uuid('_key')->index()->nullable();
            $table->foreignId('user_id')->constrained();
            $table->string('name');
            $table->string('slug');
            $table->longText('description');
            $table->string('phone');
            $table->string('email');
            $table->text('featured_image')->nullable();
            $table->longText('address');
            $table->enum('status', StatusEnum::values())->default(StatusEnum::Active->value);
            $table->timestamps();
        });

        Schema::create($this->venuesDetailsTable, function (Blueprint $table) {
                    $table->id();
                    $table->foreignId('venue_id')->constrained();
                    $table->mediumText('logo')->nullable();
                    $table->longText('landing_page');
                    $table->timestamps();
        });


    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists($this->venuesDetailsTable);
        Schema::dropIfExists($this->venuesTable);
    }
};
