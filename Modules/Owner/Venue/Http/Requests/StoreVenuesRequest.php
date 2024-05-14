<?php

namespace Modules\Owner\Venue\Http\Requests {

    use Modules\Abstracts\Requests\Request as ParentRequest;
    use Illuminate\Contracts\Auth\Access\Gate;

    class StoreVenuesRequest extends ParentRequest
    {
        protected array $decode = [];

        protected array $urlParameters = [];

        public function rules(): array
        {
            return [
                'name'      => ['required', 'min:4', 'max:255'],
                'contact'   => ['required', 'min:4', 'max:255'],
                'email'     => ['required', 'email', 'unique:venues,email,' . ($this->id)],
                'address'   => ['required', 'min:4', 'max:255']
            ];
        }

        public function authorize(Gate $gate): bool
        {
            return true;
        }



        public function messages()
        {
            return [
                'email.required' => 'Venue email is required'
            ];
        }
    }
}
