<?php

namespace App\Http\Controllers\Api\Auth {

    use App\Http\Controllers\ApiController;
    use App\Http\Requests\Auth\LoginRequest;
    use Illuminate\Http\Request;
    use App\Models\Auth\User;
    use Illuminate\Contracts\Auth\MustVerifyEmail;
    use Illuminate\Support\Facades\Log;
    use Illuminate\Support\Facades\Hash;
//    use Log;
    class LoginController extends ApiController
    {
        public function __invoke(Request $request)
        {
            try {
                $user = User::where("email", $request->email)->first();
                Log::info("$user".$user);
                if ($user) {
                    //check if email is verified
                    if ($user instanceof MustVerifyEmail && !$user->hasVerifiedEmail()) {
                        return response()->json([
                            'status' => 409,
                            'data' => null,
                            'errors' => [
                                	"email" => [
                                "Your email address is not verified."
                            ]],
                            'message' => 'Your email address is not verified.'
                        ],
                            409
                        );
                    }
                    // * Match password
                    if (!Hash::check($request->password, $user->password)) {
                        return response()->json([
				             'status' => 401,
                            'data' => null,
                            'errors' => null,
                            "message" => "Invalid credentials.",
                        ]);
                    }
                    $token = $user->createToken("web")->plainTextToken;
                    $authRes = array_merge($user->toArray(), ["token" => $token]);
                    return response()->json([
                        "status" => 200,
                        "message" => "Logged in successfully!",
                        "data" => [
                            "user" => $authRes,
                            "token"=>$token
                        ],
                        "errors"=>null
                    ]);
                }
                return response()->json(["status" => 401, "message" => "No account found with these credentials."]);
            } catch (\Exception $err) {
                Log::info("LoginController::login =>" . $err->getMessage());
                return response()->json(["status" => 500, "message" => "Something went wrong!"], 500);
            }
        }
    }
}
