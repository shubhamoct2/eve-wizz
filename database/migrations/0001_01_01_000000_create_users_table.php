<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Enums\User\StatusEnum;
use App\Enums\User\GenderEnum;


return new class extends Migration {

    private string $usersTable = 'users';
    private string $usersProfileTable = "users_profile";
    private string $resetTokenTable = 'password_reset_tokens';
    private string $sessionsTable = "sessions";

    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create($this->usersTable, function (Blueprint $table) {
            $table->id();
            $table->uuid('_key')->index()->nullable();
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            //            $table->string('role')->default('owner');
            $table->enum('status', StatusEnum::values())->default(StatusEnum::Pending->value);
            $table->rememberToken();
            $table->timestamps();
        });


        Schema::create($this->usersProfileTable, function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained();
            $table->string('avatar')->nullable()->default('_avatar.png');

            $table->string('first_name')->nullable();
            $table->string('last_name')->nullable();
            $table->enum('gender', GenderEnum::values())->default(GenderEnum::Male->value);

            $table->mediumText('address')->nullable();
            $table->date('date_of_birth')->nullable();

            $table->string('phone')->nullable();
            $table->string('country')->nullable();
            $table->string('city')->nullable();
            $table->string('pin_code')->nullable();


            $table->string('last_ip')->nullable();
            $table->timestamp('last_login_date')->nullable();

            $table->timestamps();

        });


        Schema::create($this->resetTokenTable, function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        Schema::create($this->sessionsTable, function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('user_id')->nullable()->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists($this->usersProfileTable);
        Schema::dropIfExists($this->resetTokenTable);
        Schema::dropIfExists($this->sessionsTable);
        Schema::dropIfExists($this->usersTable);

    }
};