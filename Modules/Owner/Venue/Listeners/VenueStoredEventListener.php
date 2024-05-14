<?php

namespace Modules\Owner\Venue\Listeners {

    use Modules\Owner\Venue\Events\VenueStoredEvent;
    use Illuminate\Contracts\Queue\ShouldQueue;
    use Illuminate\Queue\InteractsWithQueue;

    class VenueStoredEventListener
    {
        /**
         * Create the event listener.
         */
        public function __construct()
        {
            //
        }

        /**
         * Handle the event.
         */
        public function handle(VenueStoredEvent $event): void
        {
           dd($event);
        }
    }
}
