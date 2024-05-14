<?php

namespace Modules\Owner\Venue\Enums {

    use Kongulov\Traits\InteractWithEnum;

    enum StatusEnum: int
    {
        use InteractWithEnum;

        case Active = 1;
        case InActive = 0;
    }
}
