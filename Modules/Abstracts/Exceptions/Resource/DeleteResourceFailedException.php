<?php

namespace Modules\Abstracts\Exceptions\Resource {

    use Modules\Abstracts\Exceptions\Exception;
    use Symfony\Component\HttpFoundation\Response;

    class DeleteResourceFailedException extends Exception
    {
        protected $code = Response::HTTP_EXPECTATION_FAILED;
        protected $message = 'Failed to delete Resource.';
    }
}
