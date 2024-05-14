<?php

namespace App\Models\Venue{


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\Venue\Relations\VenueDetailsRelationships;

class VenueDetails extends Model {
    use HasFactory,VenueDetailsRelationships;

        /**
         * Fillable.
         *
         * @var array
         */
        protected $fillable = [
            '_key',
            'user_id',
            'name',
            'slug',
            'description',
            'contact',
            'email',
            'address',
            'status',
            'featured_image',
            'created_by',
            'updated_by',
        ];


    }
}
