<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/send', function () {
    $date = new DateTime();
    $new_customers = DB::table("customers")
        ->whereDate("created_at", "=",$date)
        ->count();
    dd($new_customers);
//    $details = [
//        "title" => "New Customers ",
//        "body" => "this is test ",
//    ];
//    \Illuminate\Support\Facades\Mail::to("othmandori@gmail.com")->send(new App\Mail\DailyCustomersMail($details));
//    echo "done";
});

