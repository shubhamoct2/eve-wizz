<?php


namespace App\Models\Auth\Scopes {

    use App\Enums\User\StatusEnum as Status;
    use Illuminate\Database\Query\Builder;

    trait UserIsActive

    {
        public function scopeActive(Builder $query): Builder
        {
            return $query->where($this->getActiveColumnName(), '=', Status::Active->value);
        }

        private function getActiveColumnName(): string
        {
            return 'status';
        }

    }

}
