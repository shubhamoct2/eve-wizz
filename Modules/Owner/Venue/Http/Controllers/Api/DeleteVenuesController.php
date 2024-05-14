<?php

namespace Modules\Owner\Venue\Http\Controllers\Api {
    use Modules\Abstracts\Controllers\ApiController;
    use Modules\Owner\Venue\Transformers\VenueTransformer;
    use Symfony\Component\HttpFoundation\Response;

    class DeleteVenuesController extends ApiController
    {
        public function __invoke(DeleteVenuesRequest $request, DeleteVenueAction $action)
        {
            try {
                $data = $request->all();
                $entity = $action->handle($data);
                return $this->created($this->transform($entity, VenueTransformer::class));
            } catch (\Exception $e) {
                return response()->error($e->getMessage(), Response::HTTP_UNAUTHORIZED);
            }
        }
    }
}
