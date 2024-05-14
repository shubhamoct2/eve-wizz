<?php

namespace Modules\Owner\Venue\Providers {

    use Illuminate\Support\ServiceProvider as LaravelAppServiceProvider;
    use Illuminate\Support\Facades\Route;

    class VenueServiceProvider extends LaravelAppServiceProvider
    {
        public function boot()
        {
            Route::middleware('api')->prefix('api')->group(function () {

                $this->loadRoutesFrom(base_path('Modules/Owner/Venue/Routes/api.php'));

            });
        }

        public function register()
        {
        }
    }
}
