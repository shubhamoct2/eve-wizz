<?php

namespace Modules\Owner\Venue\Http\Controllers\Api {

    use Modules\Abstracts\Controllers\ApiController;
    use Modules\Owner\Venue\Actions\FindVenueByIdAction;
    use Modules\Owner\Venue\Http\Requests\FindVenueByIdRequest;
    use Modules\Owner\Venue\Transformers\VenueTransformer;

    class FindVenuesController extends ApiController
    {

        protected $action;

        public function __construct(FindVenueByIdAction $action)
        {
            $this->action = $action;
        }

        public function __invoke(
            FindVenueByIdRequest $request,$id
        ) {
            $venue = $this->action->handle($request);
            return $this->transform($venue, VenueTransformer::class);
        }
    }
}
