<?php

namespace Modules\Owner\Venue\Actions {

  use Illuminate\Http\Response;
  use Modules\Abstracts\Actions\Action as ParentAction;
  use Modules\Abstracts\Exceptions\UnauthorizedUserException;
  use Modules\Owner\Venue\Policies\VenuePolicy;
  use Modules\Owner\Venue\Repositories\VenueRepository;

  class ListVenuesAction extends ParentAction
  {
    private $repository;

    public function __construct(VenueRepository $repository)
    {
      $this->repository = $repository;
    }

    /**
     * @throws UnauthorizedUserException
     */
    public function handle()
    {
      try {

        authorize('all', VenuePolicy::class);

        return $this->repository->with(['events', 'owner'])->all();
      } catch (UnauthorizedUserException $e) {
        return response()->error($e->getMessage(), Response::HTTP_UNAUTHORIZED);
      }
    }
  }
}
