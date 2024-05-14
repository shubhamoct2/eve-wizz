<?php

namespace App\Models\Venue\Relations;

use App\Models\Venue\VenueDetails;
use App\Models\Auth\User;

trait VenueRelationships
{
    /**
     *  Venue has details
     */
    public function details()
    {
        return $this->hasOne(VenueDetails::class);
    }
    /**
     *  Venue belongs to owner/user
     */
    public function owner(){
        return $this->belongsTo(User::class);
    }
}
