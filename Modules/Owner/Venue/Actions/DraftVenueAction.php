<?php

namespace Modules\Owner\Venue\Actions {
    use Modules\Abstracts\Actions\Action as ParentAction;
    use Modules\Abstracts\Exceptions\Resource\CreateResourceFailedException;
    use Modules\Owner\Venue\Commands\DestroyVenueCommand;
    use Modules\Owner\Venue\Events\VenueDeletedEvent;
    use Modules\Owner\Venue\Repositories\VenueRepository;
    use Illuminate\Support\Facades\Log;
    use function json_encode;

    class DraftVenueAction extends ParentAction
    {
        private $repository;

        public function __construct(VenueRepository $repository)
        {
            $this->repository = $repository;
        }

        /**
         * @throws CreateResourceFailedException
         */
        public function handle($request)
        {
            try {
               $venues= $this->repository->findDraftVenues();

                return $venues;
            } catch (\Exception $e) {
                Log::info("DraftFetchedAction" . $e->getMessage());
               return null;
            }
        }
    }
}
