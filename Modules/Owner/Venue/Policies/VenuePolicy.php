<?php

namespace Modules\Owner\Venue\Policies {

    use App\Models\Venue\Venue;
    use Modules\Abstracts\Policies\Policy as ParentPolicy;
    use Modules\Owner\Venue\Repositories\VenueRepository;

    class VenuePolicy extends ParentPolicy
    {
        public function __construct(private readonly VenueRepository $repository)
        {
        }

        public static function all(): bool
        {
            $isOwner = auth()->user()->isOwner;
            return (null !== $isOwner) ? $isOwner : true;
        }

        public function delete(): bool
        {
            return false;
        }

        public function show(): bool
        {
            return false;
        }

        public function index(): bool
        {
            return false;
        }

        public function update(Venue $venue, int $id): bool
        {
            $entity = $this->repository->findBy('id', $id);

            return $venue->is($entity);
        }
    }
}
