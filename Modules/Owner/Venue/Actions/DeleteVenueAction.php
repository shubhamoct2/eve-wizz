<?php

namespace Modules\Owner\Venue\Actions {

    use Modules\Abstracts\Actions\Action as ParentAction;
    use Modules\Abstracts\Exceptions\Resource\CreateResourceFailedException;
    use Modules\Owner\Venue\Commands\DestroyVenueCommand;
    use Modules\Owner\Venue\Events\VenueDeletedEvent;
    use Modules\Owner\Venue\Repositories\VenueRepository;
    use Illuminate\Support\Facades\Log;
    use function json_encode;

    class DeleteVenueAction extends ParentAction
    {
        private $repository;

        public function __construct(VenueRepository $repository)
        {
            $this->repository = $repository;
        }

        /**
         * @throws CreateResourceFailedException
         */
        public function handle($request, $venue_id)
        {

            $venue = $this->repository->find($venue_id);

            try {
                (new DestroyVenueCommand($venue_id))->execute();
                VenueDeletedEvent::dispatch($venue);
                return $venue;
            } catch (\Exception $e) {
                Log::info('CreateVenueAction' . $e->getMessage());
                throw new DeleteResource();
            }
        }
    }
}
