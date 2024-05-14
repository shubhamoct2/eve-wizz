<?php

namespace Modules\Abstracts\Exceptions{

use Modules\Abstracts\Exceptions\Exception;
use Symfony\Component\HttpFoundation\Response;

class UnsupportedFractalIncludeException extends Exception
{
    protected $code = Response::HTTP_BAD_REQUEST;
    protected $message = 'Requested a invalid Include Parameter.';
}
}
