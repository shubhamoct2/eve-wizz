<?php

namespace App\Listeners {

    use App\Events\UserRegisteredEvent;
    use Illuminate\Contracts\Auth\MustVerifyEmail;

    class SendEmailVerificationNotification
    {
        /**
         * Handle the event.
         *
         * @param  \Illuminate\Auth\Events\Registered  $event
         * @return void
         */
        public function handle(UserRegisteredEvent $event)
        {
            if ($event->user instanceof MustVerifyEmail && !$event->user->hasVerifiedEmail()) {
                $event->user->sendEmailVerificationNotification();
            }
        }
    }
}
