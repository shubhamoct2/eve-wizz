<?php


namespace Modules\Abstracts\Requests{
    use Illuminate\Foundation\Http\FormRequest as LaravelRequest;
    use Illuminate\Support\Arr;
    use Illuminate\Support\Facades\App;
    use Illuminate\Support\Facades\Config;
    use Illuminate\Contracts\Validation\Validator;
    use Illuminate\Http\Exceptions\HttpResponseException;

    use App\Models\Auth\User;

    abstract class Request extends LaravelRequest
    {
        public function hasAccess(User|null $user = null): bool
        {

        }
        public function failedValidation(Validator $validator)
        {
            $errors = $validator->errors();
            $response = response()->json([
                'status' => false,
                'message' => 'Invalid data send',
                'errors' => $errors->messages(),
            ], 422);
            throw new HttpResponseException($response);
        }
    }
}
