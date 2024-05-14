<?php

namespace Modules\Abstracts\Actions {

    use Modules\Abstracts\Traits\HasRequestCriteriaTrait;

    abstract class Action
    {
        use HasRequestCriteriaTrait;

        protected string $ui;

        public function transactionalRun(...$arguments)
        {
            return DB::transaction(function () use ($arguments) {
                return static::run(...$arguments);
            });
        }

    }
}
