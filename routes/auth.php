<?php

use App\Http\Controllers\Api\Auth\EmailVerificationNotificationController;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\Auth\LoginController;
use App\Http\Controllers\Api\Auth\RegisterController;
use App\Http\Controllers\Api\Auth\LogOutController;
use App\Http\Controllers\Api\Auth\NewPasswordController;
use App\Http\Controllers\Api\Auth\PasswordResetLinkController;
use App\Http\Controllers\Api\Auth\VerifyEmailController;

Route::prefix("auth")->group(function () {
    Route::post("register", RegisterController::class)->name("auth.register");
    Route::post("login", LoginController::class)->name("auth.login");
    Route::post('/forgot-password', [PasswordResetLinkController::class, 'store'])->middleware('guest')->name('password.email');
    Route::post('/reset-password', [NewPasswordController::class, 'store'])->middleware('guest')->name('password.store');
    Route::get("/verify-email/{id}/{hash}", VerifyEmailController::class)
//    ->middleware(["auth", "signed", "throttle:6,1"])
        ->name("auth.verification.verify");
    Route::post('/email/verification-notification', [EmailVerificationNotificationController::class, 'store'])->middleware(['auth', 'throttle:6,1'])->name('verification.send');
    Route::post("/logout", LogOutController::class)->middleware("auth:sanctum")->name("auth.logout");
});
Route::get("login", function () {
    return response()->json([
        'status' => 413,
        'message' => 'Please login to access the api.'
    ]);
})->name("login");