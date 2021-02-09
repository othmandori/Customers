<?php

namespace App\Http\Controllers;

use App\Model\Customer;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class CustomerController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['register']]);
    }

    /**
     * Register a new Customer
     * @param Request $request
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function register(Request $request){
        $request->validate([
            "first_name"=>["required","min:3","max:255"],
            "last_name"=>["required","min:3","max:255"],
            "email"=>["required","email","unique:customers"],
            "phone_number"=>["required","min:8","max:11"],
        ]);

        Customer::create([
            'first_name' => $request['first_name'],
            'last_name' => $request['first_name'],
            'email' => $request['email'],
            'phone_number' => $request['phone_number'],
        ]);
        return response("Customer Created",Response::HTTP_ACCEPTED);
    }

    /**
     * List the Customers per page and by per page size
     * @param Request $request
     * @return JsonResponse
     */
    public function show(Request $request){
        $customers = Customer::query()->orderByDesc("created_at")->paginate($request->get("size_per_page"));
        return new JsonResponse($customers);
    }

    /**
     * get the average date of the customers according to a specific period
     * @param Request $request
     * @return JsonResponse
     * @throws \Exception
     */
    public function average(Request $request){
        $date = new DateTime();
        $average_type = $request->get("average_type");
        $average_types = [
            "24-hours" => "-24 hours",
            "week" => "-1 week",
            "month" => "-1 month",
            "3-months" => "-3 month",
            "1-year" => "-1 year",
        ];
        $date->modify($average_types[$average_type]);
        $average_customers_date = DB::table("customers")
            ->selectRaw('FROM_UNIXTIME(AVG(UNIX_TIMESTAMP(created_at))) as AvgTime')
            ->whereDate("created_at", ">=",$date)
            ->get();
        $average_time = $average_customers_date[0]->AvgTime;
        $average_time = $average_time == null ? 0 : $average_time;
        return new JsonResponse($average_time);
    }
}
