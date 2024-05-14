<?php

namespace App\Notifications\Auth {


    use Carbon\Carbon;
    use Illuminate\Auth\Notifications\VerifyEmail;
    use Illuminate\Notifications\Messages\MailMessage;
    use Illuminate\Support\Facades\Config;
    use Illuminate\Support\Facades\URL;

    class EmailVerificationNotification extends VerifyEmail
    {
        public function __construct()
        {
            //
        }

        /**
         * Get the notification's delivery channels.
         *
         * @param mixed $notifiable
         * @return array
         */
        public function via($notifiable)
        {
            return ['mail'];
        }

        /**
         * Get the mail representation of the notification.
         *
         * @param mixed $notifiable
         * @return MailMessage
         */
        public function toMail($notifiable)
        {
            $verificationUrl = $this->verificationUrl($notifiable);
            return (new MailMessage)
                ->subject('Verify Email Address')
                ->line('Please click the button below to verify your email address.')
                ->action('Verify Email Address', $verificationUrl)
                ->line('If you did not create an account, no further action is required.');
        }

        protected function verificationUrl($notifiable)
        {
            return str_replace(
                '{{id}}',
                $notifiable->getKey(),
                str_replace(
                    '{{hash}}',
                    sha1($notifiable->getEmailForVerification()),
                    config('app.frontend_url') . '/auth/verify-email/{{id}}/{{hash}}'
                )
            );
        }


        public function url($route, $parameters = [], $absolute = true)
        {
            return config('app.frontend_url') . '/' . ltrim($route, '/');
        }


        /**
         * Get the array representation of the notification.
         *
         * @param mixed $notifiable
         * @return array
         */
        public function toArray($notifiable)
        {
            return [
                //
            ];
        }
    }
}