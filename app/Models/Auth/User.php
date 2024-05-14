<?php

namespace App\Models\Auth {

    use App\Models\Auth\Attributes\UserAttributes;
    use App\Models\Auth\Scopes\UserIsActive;
    use Illuminate\Contracts\Auth\MustVerifyEmail;
    use Illuminate\Database\Eloquent\Factories\HasFactory;
    use Illuminate\Foundation\Auth\User as Authenticatable;
    use Illuminate\Notifications\Notifiable;
    use Laravel\Sanctum\HasApiTokens;
    use App\Notifications\Auth\EmailVerificationNotification;
    use App\Models\Auth\Relation\UserProfile as ProfileRelation;
    use App\Models\Auth\Relation\UserVenue as VenueRelation;
    use Spatie\Permission\Traits\HasRoles;

    class User extends Authenticatable implements MustVerifyEmail
    {
        use HasFactory, HasApiTokens, Notifiable;

        use HasRoles;

        //relatoins
        use ProfileRelation;
        use VenueRelation;

        //scopes
        use UserIsActive;

        // attributes
        use UserAttributes;

        /**
         * The attributes that are mass assignable.
         *
         * @var array<int, string>
         */
        protected $fillable = [
            'name',
            'email',
            'password',
        ];

        /**
         * The attributes that should be hidden for serialization.
         *
         * @var array<int, string>
         */
        protected $hidden = [
            'password',
            'remember_token',
        ];

        /**
         * Get the attributes that should be cast.
         *
         * @return array<string, string>
         */
        protected function casts(): array
        {
            return [
                'email_verified_at' => 'datetime',
                'password' => 'hashed',
            ];
        }

        protected $appends = ['full_name'];

        //        protected $appends = ['is_admin', 'is_owner', 'is_customer']; // related functions are stored in attributes folder

        // Method to send email verification
        public function sendEmailVerificationNotification()
        {
            // We override the default notification and will use our own
            $this->notify(new EmailVerificationNotification());
        }
    }
}