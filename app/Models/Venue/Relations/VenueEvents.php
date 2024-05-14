<?php

namespace App\Models\Venue\Relations;

use App\Models\Venue\Venue as VenueModel;
use App\Models\Event\Event as EventModel;

trait VenueEvents
{
    /**
     * Venue Details belongsTo to venue
     */
    public function events()
    {
        return $this->hasMany(EventModel::class);
    }
}
