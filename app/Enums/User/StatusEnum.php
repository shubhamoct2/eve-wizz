<?php

namespace App\Enums\User {

    use Kongulov\Traits\InteractWithEnum;

    enum StatusEnum: string
    {
        use InteractWithEnum;

        case Pending = 'pending';
        case Active = 'active';
        case Inactive = 'inactive';
    }
}