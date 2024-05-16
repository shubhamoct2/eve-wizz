<?php

namespace Modules\Owner\Venue\Repositories {
    use Modules\Abstracts\Repositories\Repository as ParentRepository;
    use Illuminate\Support\Facades\DB;
    use Illuminate\Support\Facades\Log;

    class VenueRepository extends ParentRepository
    {
        protected $fieldSearchable = [
            "id" => "=",
            "name" => "like",
            "description" => "like",
            "email" => "=",
            "phone" => "=",
            "status" => "=",
            "created_at" => "like",
            "updated_at" => "like",
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
                Log::info("storeVenue " . $e->getMessage());
            }
        }

        public function findDraftVenues()
        {
            return $this->model->where("status", "0")->get();
        }

        public function venueExists($data)
        {
            return $this->model
                ->where("email", $data["email"])
                ->where("user_id", $data["user_id"])
                ->first();
        }

        public function getVenueMedia($id)
        {
            $venue = $this->model->find($id);
            if ($venue->exists() && ($media = $venue->getMedia("venue"))) {
               return collect($media)->flatMap(function($m){
                   return [
                              $m->custom_properties['type'] => $m->original_url
                     ];
                   });
            }
            return null;
        }

    public function venueWithMedia($id){
   return $this->model->has('media')->find($id);
    }
    }
}
