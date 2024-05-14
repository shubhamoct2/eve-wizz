<?php

namespace Modules\Owner\Venue\Actions {

    use Modules\Abstracts\Actions\Action as ParentAction;
    use Modules\Abstracts\Exceptions\Resource\CreateResourceFailedException;
    use Modules\Owner\Venue\Repositories\VenueRepository;
    use Modules\Owner\Venue\Events\VenueStoredEvent;
    use Illuminate\Support\Facades\Log;
    use function json_encode;

    class StoreVenuesAction extends ParentAction
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
            $data = [
                'user_id' => auth()->user()->id,
                'name' => $request->get('name'),
                'description' =>$request->get('description'),
                'contact' => $request->get('phone'),
                'email' => $request->get('email'),
                'featured_image' => $request->get('featured_image'),
                'address' => $request->get('address'),
            ];

            try {
                $venue = $this->repository->create($data);
                VenueStoredEvent::dispatch($venue);
                Log::info('CreateVenueAction' .  json_encode($data));
                return $venue;
            } catch (\Exception $e) {
                Log::info('CreateVenueAction' .   $e->getMessage());
                throw new CreateResourceFailedException();
            }
        }
    }
}
