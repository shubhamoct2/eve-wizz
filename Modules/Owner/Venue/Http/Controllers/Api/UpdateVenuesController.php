<?php

namespace Modules\Owner\Venue\Http\Controllers\Api {

    use Modules\Abstracts\Controllers\ApiController;
    use Modules\Owner\Venue\Http\Requests\ListVenuesRequest;
    use Modules\Owner\Venue\Actions\ListVenuesAction;
    use Modules\Owner\Venue\Transformers\VenueTransformer;
    use Symfony\Component\HttpFoundation\Response;

    class UpdateVenuesController extends ApiController
    {

        private $transformer;
        public function __construct(VenueTransformer $transformer)
        {

            $this->transformer = $transformer;
        }

        public function __invoke(ListVenuesRequest $request, ListVenuesAction $action)
        {

            try {
                $venues = $action->handle();
                if ($venues->count()) {
                    return $this->transformer->transform($venues, VenueTransformer::class);
                }
                return response()->json([
                    'status' => true,
                    'data' => [],
                    'message' => ''
                ]);
            } catch (\Exception $e) {
                return response()->error($e->getMessage(), Response::HTTP_UNAUTHORIZED);
            }
        }
    }
}
