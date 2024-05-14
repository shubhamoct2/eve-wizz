<?php

namespace Modules\Owner\Venue\Http\Controllers\Api {

    use Modules\Abstracts\Controllers\ApiController;

    use Modules\Owner\Venue\Http\Requests\StoreVenuesRequest;
    use Modules\Owner\Venue\Actions\StoreVenuesAction;

    use Modules\Owner\Venue\Transformers\VenueTransformer;
    use Symfony\Component\HttpFoundation\Response;

    class StoreVenuesController extends ApiController
    {
        public function __invoke(StoreVenuesRequest $request, StoreVenuesAction $action)
        {
            try {
                $entity = $action->handle($request);
                $data = $this->transform($entity->toArray(), VenueTransformer::class);
                dd($data);

                return $this->created();
            } catch (\Exception $e) {
                return response()->error($e->getMessage(), Response::HTTP_UNAUTHORIZED);
            }
        }
    }
}
