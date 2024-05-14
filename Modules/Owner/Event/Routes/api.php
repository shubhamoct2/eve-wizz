<?php
use Modules\Owner\Event\Http\Controllers\Api\EventCategoriesController;
Route::prefix('owner')
//    ->middleware(['auth:sanctum', 'verified', 'role.owner'])
    ->middleware(['auth:sanctum', 'verified'])
    ->group(function () {
        Route::get('events', ListEventController::class)->name('owner.events.list');
        Route::get('event-categories', EventCategoriesController::class)->name('owner.events.categories');
});

