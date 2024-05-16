<?php

namespace Modules\Abstracts\Controllers {

    use Modules\Abstracts\Traits\ResponseTrait;

    abstract class ApiController extends Controller
    {
//         use ResponseTrait;

        public string $requestType = 'api';
    }
}
