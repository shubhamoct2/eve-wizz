<?php

namespace Modules\Owner\Venue\Http\Requests {

    use Modules\Abstracts\Requests\Request as ParentRequest;
    use Illuminate\Contracts\Auth\Access\Gate;

    class DeleteVenuesRequest extends ParentRequest
    {
        protected array $decode = [];

        protected array $urlParameters = [];

        public function rules(): array
        {
            return [];
        }

        public function authorize(Gate $gate): bool
        {
            return true;
        }
    }
}
