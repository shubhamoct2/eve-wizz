<?php

namespace Modules\Owner\Venue\Commands {


    use Modules\Owner\Venue\Policies\VenuePolicy;

    class DestroyVenueCommand implements CommandInterface
    {
        private CompanyRepositoryInterface $repository;

        public function __construct(
            private readonly int $venue_id
        )
        {
            $this->repository = app()->make(CompanyRepositoryInterface::class);
        }

        public function execute(): void
        {
            authorize('delete', VenuePolicy::class);
            $this->repository->delete($this->venue_id);
        }
    }
}
