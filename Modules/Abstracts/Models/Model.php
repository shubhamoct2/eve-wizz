<?php

namespace Modules\Abstracts\Models {


    use Modules\Abstracts\Traits\ModelTrait;
    use Illuminate\Database\Eloquent\Model as LaravelEloquentModel;

    abstract class Model extends LaravelEloquentModel
    {
        use ModelTrait;
    }
}
