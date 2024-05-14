<?php

namespace Modules\Owner\Venue\Actions {

    use Modules\Abstracts\Actions\Action as ParentAction;
    use Modules\Abstracts\Exceptions\UnauthorizedUserException;
    use Modules\Owner\Venue\Repositories\VenueRepository;

    class FindVenueByIdAction extends ParentAction
    {

        private $repository;

        public function __construct(VenueRepository $repository)
        {
            $this->repository = $repository;
        }

        public function handle($request)
        {
            try {
                return $this->repository->find($request->id);
            } catch (UnauthorizedUserException $e) {
                return response()->error($e->getMessage(), Response::HTTP_UNAUTHORIZED);
            }
        }
    }
}
