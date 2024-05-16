<?php

namespace Modules\Owner\Venue\Actions {
    use Modules\Abstracts\Actions\Action as ParentAction;
    use Modules\Abstracts\Exceptions\Resource\CreateResourceFailedException;
    use Modules\Owner\Venue\Repositories\VenueRepository;
    use Modules\Owner\Venue\Events\VenueStoredEvent;
    use Modules\Owner\Venue\Events\VenueUpdatedEvent;
    use Illuminate\Support\Facades\Log;
    use function json_encode;
    use Modules\Owner\Venue\Enums\StatusEnum;

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
                "user_id" => auth()->user()->id,
                "name" => $request->get("name"),
                "description" => $request->get("description"),
                "phone" => $request->get("phone"),
                "email" => $request->get("email"),
                "featured_image" => $request->get("featured_image"),
                "address" => $request->get("address"),
                "status" => "0",
            ];

            try {
                $venueExists = $this->repository->venueExists($data);
                $venue= $this->repository->venueWithMedia($venueExists->id);
                return ($venue);
                if ($venueExists) {
                    $data= [
                        "venue" => collect($venueExists)->toArray(),
                        "media" => $this->repository->getVenueMedia($venueExists->id),
                    ];
                    return collect($data)->collapse();
                    \Log::info($venueExists . " VENUE - EXISTS");
                } else {
                    \Log::info($venueExists . " VENUE DONT - EXISTS");
                    $venue = $this->repository->create($data);
                    //Upload-Logo
                    if (
                        $request->hasFile("logo") &&
                        $request->file("logo")->isValid()
                    ) {
                        $venue
                            ->addMediaFromRequest("logo")
                            ->withCustomProperties([
                                'type'=>'logo'
                            ])
                            ->toMediaCollection("venue");
                    }
                    //Upload-LandingPage
                    if (
                        $request->hasFile("landingPage") &&
                        $request->file("landingPage")->isValid()
                    ) {
                        $venue
                            ->addMediaFromRequest("landingPage")
                            ->withCustomProperties([
                                'type'=>'landingPage'
                            ])
                            ->toMediaCollection("venue");
                    }
                    VenueStoredEvent::dispatch($venue);
                    \Log::info("CreateVenueAction" . json_encode($data));
                    $media = $this->repository->getVenueMedia($venue->id);

                    \Log::info("properties" .  json_encode($media ));
                    return array_values(array_merge(collect($venue)->toArray(),$media));
                }
            } catch (\Exception $e) {
                Log::info("CreateVenueActionError" . $e->getMessage());
                throw new CreateResourceFailedException();
            }
        }
    }
}
