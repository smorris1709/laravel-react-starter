<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Tighten\Ziggy\Ziggy;

Route::get('/ziggy', fn () => response()->json(new Ziggy()));

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});


require __DIR__.'/auth.php';
