<?php

use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\VecinoController;
use App\Http\Controllers\Api\MailController;
use App\Http\Controllers\Api\FileController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//mail
Route::controller(MailController::class)->group(function () {
    Route::get('/mails', 'index');
    Route::post('/mail', 'store');
    Route::get('/mail/{id}', 'show');
    Route::put('/mail/{id}', 'update');
    Route::delete('/mail/{id}', 'destroy');
    Route::get('mailList/{id}', 'listById');
});
//USERS
Route::controller(UserController::class)->group(function () {
    Route::post('register', 'register');
    Route::post('login',  'login');
    Route::get('index',  'index');
    Route::delete('destroy/{id}',  'destroy');
    Route::put('update/{id}',  'update');
    Route::get('show/{id}',  'show');
});

//Protected routes SANCTUM
Route::group(['middleware' => ["auth:sanctum"]], function () {
    //Rutas user auth
    Route::get('logout', [UserController::class, 'logout']);
    Route::get('user-profile', [UserController::class, 'userProfile']);
    //Rutas mails
    Route::post('create-mail', [MailController::class, 'createMail']);
    Route::get('list-mail', [MailController::class, 'listMail']);
    Route::get('show-mail/{id}', [MailController::class, 'showMail']);
    Route::delete('delete-mail/{id}', [MailController::class, 'destroy']);
});
