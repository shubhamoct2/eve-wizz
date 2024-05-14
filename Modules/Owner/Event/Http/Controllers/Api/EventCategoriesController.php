<?php

namespace Modules\Owner\Event\Http\Controllers\Api {
    use Modules\Abstracts\Controllers\ApiController;
    use Illuminate\Support\Facades\Request;

    class EventCategoriesController extends ApiController
    {
        public function __invoke(Request $request)
        {
            return response()->json([
                "status" => 200,
                "categories" => [
                    [
                        "id" => 1,
                        "value" => "Apple",
                    ],
                    [
                        "id" => 2,
                        "value" => "Banana",
                    ],
                    [
                        "id" => 3,
                        "value" => "Grapes",
                    ],
                    [
                        "id" => 4,
                        "value" => "Orange",
                    ],
                    [
                        "id" => 5,
                        "value" => "PineApple",
                    ],
                    [
                        "id" => 6,
                        "value" => "Mango",
                    ],
                ],
            ]);
        }
    }
}
