<?php

namespace Modules\Owner\Venue\Http\Requests {

    use Modules\Abstracts\Requests\Request as ParentRequest;
    use Illuminate\Contracts\Auth\Access\Gate;

    class FindVenueByIdRequest extends ParentRequest
    {
        protected array $decode = [];

        protected array $urlParameters = [];

        public function rules(): array
        {
            return [
//                 'id' => ['required']
            ];
        }

        public function authorize(Gate $gate): bool
        {
            return true;
        }
    }
}
