<?php

namespace Modules\Owner\Venue\Repositories {

    use Modules\Abstracts\Repositories\Repository as ParentRepository;
    use Illuminate\Support\Facades\DB;
    use Illuminate\Support\Facades\Log;

    class VenueRepository extends ParentRepository
    {
        protected $fieldSearchable = [
            'id' => '=',
            'name' => 'like',
            'description' => 'like',
            'email' => '=',
            'contact' => '=',
            'status' => '=',
            'created_at' => 'like',
            'updated_at' => 'like',
        ];

        public function model(): string
        {
            return \App\Models\Venue\Venue::class;
        }

        public function storeVenue($venue)
        {
            try {
                return DB::transaction(function () use ($venue) {
                    $venue = $this->model->create($venue);
                });
            } catch (\Exception $e) {
                Log::info('storeVenue ' . $e->getMessage());
            }
        }
    }
}
