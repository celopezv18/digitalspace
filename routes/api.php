<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function() {
    Route::get('logout',[AuthController::class,'logout']);

    //obtiene data de usuario para mostrar en el front
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    //route para obtener todos los usuarios
    Route::apiResource('/users',UserController::class);
    //route para obtener todos los productos
    Route::apiResource('/products', ProductController::class);
});


//routes de creación de usuarios, login y registro
Route::post('users',[UserController::class,'store']);
Route::post('login',[AuthController::class,'login']);
Route::post('register',[AuthController::class,'register']);