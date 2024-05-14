<?php

namespace Modules\Owner\Event\Providers {

    use Illuminate\Cache\RateLimiting\Limit;
    use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
    use Illuminate\Http\Request;
    use Illuminate\Support\Facades\RateLimiter;
    use Illuminate\Support\Facades\Route;
    use function base_path;

    class RouteServiceProvider extends ServiceProvider
    {

        public function boot()
        {
            $this->configureRateLimiting();
            $this->routes(function () {
                Route::prefix('api')
                    ->middleware('api')
                    ->namespace('Modules\Owner\Event\Http\Controllers\Api')
                    ->group(base_path('Modules/Owner/Event/Routes/api.php'));
            });
        }
        /**
        * Configure the rate limiters for the application.
        *
        * @return void
        */
        protected function configureRateLimiting()
        {
            RateLimiter::for('api', function (Request $request) {
                return Limit::perMinute(60)->by($request->user()?->id ?: $request->ip());
            });
        }
    }
}
