<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class LogOutController extends Controller
{
    /**
     * Destroy an authenticated session.
     */
    public function __invoke(Request $request)
    {
        if ($request->user() && $request->user()->currentAccessToken()) {
            $request->user()->currentAccessToken()->delete();
            return response()->json([
                'status' => 200,
                'message' => 'Session destroyed, please login to access API.'
            ]);
        }
        return response()->json([
            'status' => 500,
            'message' => 'Something went wrong, please try again.'
        ]);
    }
}
