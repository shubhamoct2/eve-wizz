<?php

namespace Modules\Owner\Venue\Listeners {

    use Illuminate\Contracts\Queue\ShouldQueue;
    use Illuminate\Queue\InteractsWithQueue;
    use Modules\Owner\Venue\Events\VenueUpdatedEvent;

    class VenueUpdatedEventListener
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
        public function handle(VenueUpdatedEvent $event): void
        {
            dd($event);
        }
    }
}
