<?php

namespace Modules\Owner\Venue\Http\Controllers\Api {
    use Modules\Abstracts\Controllers\ApiController;
    use Modules\Owner\Venue\Http\Requests\ListVenuesRequest;
    use Modules\Owner\Venue\Actions\DraftVenueAction;
    use Modules\Owner\Venue\Transformers\VenueTransformer;
    use Symfony\Component\HttpFoundation\Response;
    use Illuminate\Http\JsonResponse;
    use Illuminate\Http\Request;

    class DraftVenuesController extends ApiController
    {
        private $transformer;

        public function __construct(VenueTransformer $transformer)
        {

            $this->transformer = $transformer;
        }
        public function __invoke(Request $request,DraftVenueAction $action)
        {
            try {
               $drafts = $action->handle($request);
               if(count($drafts)):
                  return $this->transformer->toArray($drafts, VenueTransformer::class);
               endif;
               return response()->json([
                       'status'=>200,
                       'data'=>null,
                       'message'=>'No Venues Found'
               ]);
            } catch (\Exception $e) {
                return response()->error(
                    $e->getMessage(),
                    Response::HTTP_UNAUTHORIZED
                );
            }
        }
    }
}
