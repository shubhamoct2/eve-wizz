<?php

namespace Modules\Abstracts\Traits {

    use Modules\Abstracts\Traits\HasResourceKeyTrait;
    use Illuminate\Database\Eloquent\Factories\HasFactory;

    trait ModelTrait
    {
        // use HashIdTrait;
        // use CanOwnTrait;
        // use HashedRouteBindingTrait;
        use HasResourceKeyTrait;
        use HasFactory;
        //  FactoryLocatorTrait {
        //     FactoryLocatorTrait::newFactory insteadof HasFactory;
        // }
    }
}
