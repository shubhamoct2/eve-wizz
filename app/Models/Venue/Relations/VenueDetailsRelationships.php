<?php

namespace App\Models\Venue\Relations;

use App\Models\Venue\Venue as VenueModel;

trait VenueDetailsRelationships
{
    /**
     * Venue Details belongsTo to venue
     */
    public function venue()
    {
        return $this->belongsTo(VenueModel::class);
    }
}
