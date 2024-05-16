<?php


use Illuminate\Support\Facades\Route;
use Modules\Owner\Venue\Http\Controllers\Api\ListVenuesController;
use Modules\Owner\Venue\Http\Controllers\Api\StoreVenuesController;
use Modules\Owner\Venue\Http\Controllers\Api\FindVenuesController;
use Modules\Owner\Venue\Http\Controllers\Api\UpdateVenuesController;
use Modules\Owner\Venue\Http\Controllers\Api\DeleteVenuesController;
use Modules\Owner\Venue\Http\Controllers\Api\DraftVenuesController;

Route::prefix('owner')
//     ->middleware(['auth:sanctum', 'verified', 'role.owner'])
    ->middleware(['auth:sanctum', 'verified'])
    ->group(function () {
        Route::get('venues/drafts', DraftVenuesController::class)->name('owner.venues.drafts');
        Route::get('venues', ListVenuesController::class)->name('owner.venues.list');
        Route::post('venues', StoreVenuesController::class)->name('owner.venues.store');
        Route::get('venues/{venue}', FindVenuesController::class)->name('owner.venues.show');
        // Route::get('venues/{key}',FindVenuesController::class)->name('owner.venues.show');
        Route::put('venues/{venue}', UpdateVenuesController::class)->name('owner.venues.update');
        Route::delete('venues/{venue}', DeleteVenuesController::class)->name('owner.venues.destroy');

});
