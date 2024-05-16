<?php

namespace App\Providers;

use Illuminate\Support\Facades\Response;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Support\ServiceProvider;
use Symfony\Component\HttpFoundation\Response as HttpResponse;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        ResetPassword::createUrlUsing(function (object $notifiable, string $token) {
            return config('app.frontend_url')."/password-reset/$token?email={$notifiable->getEmailForPasswordReset()}";
        });

                Response::macro('success', function ($data, $code = HttpResponse::HTTP_OK) {
                    if ($data instanceof \JsonSerializable) {
                        $data = $data->jsonSerialize();
                    }
                    return response()->json($data, $code);
                });

                Response::macro('error', function ($message, $code = HttpResponse::HTTP_BAD_REQUEST) {
                    return response()->json(['error' => $message], $code);
                });
    }
}
