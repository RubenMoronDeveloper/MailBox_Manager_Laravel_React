<?php

use App\Http\Controllers\Api\CartaController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\VecinoController;
use App\Http\Controllers\Api\FileController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
//Api Vecino
Route::controller(VecinoController::class)->group(function () {
    Route::get('/vecinos', 'index');
    Route::post('/vecino', 'store');
    Route::get('/vecino/{id}', 'show');
    Route::put('/vecino/{id}', 'update');
    Route::delete('/vecino/{id}', 'destroy');
    Route::get('/vecino', 'login');
    /*  Route::get('/vecinoCartas/{id}','innerJoin'); */
});
//CARTA
Route::controller(CartaController::class)->group(function () {
    Route::get('/cartas', 'index');
    Route::post('/carta', 'store');
    Route::get('/carta/{id}', 'show');
    Route::put('/carta/{id}', 'update');
    Route::delete('/carta/{id}', 'destroy');
    Route::get('cartaList/{id}', 'listById');
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
    //Rutas cartas
    Route::post('create-carta', [CartaController::class, 'createCarta']);
    Route::get('list-carta', [CartaController::class, 'listCarta']);
    Route::get('show-carta/{id}', [CartaController::class, 'showCarta']);
    Route::delete('delete-carta/{id}', [CartaController::class, 'destroy']);
});
