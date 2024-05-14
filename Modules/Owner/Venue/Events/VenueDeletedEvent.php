<?php

namespace Modules\Owner\Venue\Events {

    use App\Models\Venue\Venue;
    use Illuminate\Broadcasting\Channel;
    use Illuminate\Broadcasting\InteractsWithSockets;
    use Illuminate\Broadcasting\PresenceChannel;
    use Illuminate\Broadcasting\PrivateChannel;
    use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
    use Illuminate\Foundation\Events\Dispatchable;
    use Illuminate\Queue\SerializesModels;

    class VenueDeletedEvent
    {
        use Dispatchable, InteractsWithSockets, SerializesModels;

        public $venue = null;

        /**
         * Create a new event instance.
         */
        public function __construct(Venue $venue)
        {
            $this->venue = $venue;
        }

        /**
         * Get the channels the event should broadcast on.
         *
         * @return array<int, \Illuminate\Broadcasting\Channel>
         */
        public function broadcastOn(): array
        {
            return [
                new PrivateChannel('channel-name'),
            ];
        }
    }
}
