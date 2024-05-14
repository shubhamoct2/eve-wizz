<?php

namespace App\Models\Auth\Attributes {

    use Illuminate\Database\Eloquent\Casts\Attribute;

    trait UserAttributes
    {

        /**
         * Determine if the user is an administrator.
         */
        protected function isAdmin(): Attribute
        {
            return new Attribute(
                get: fn() => ($this->attributes['role'] == 'admin'),
            );
        }

        protected function isOwner(): Attribute
        {
            return new Attribute(
                get: fn() => ($this->attributes['role'] == 'owner')
            );
        }

        protected function isCustomer(): Attribute
        {
            return new Attribute(
                get: fn() => ($this->attributes['role'] == 'customer')
            );
        }

        public function getFullNameAttribute()
        {
            return $this->profile->first_name . ' ' . $this->profile->last_name;
        }
    }
}