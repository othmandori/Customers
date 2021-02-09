<?php

namespace App\Console\Commands;

use App\Mail\DailyCustomersMail;
use DateTime;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

class DailyNewCustomers extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'schedule:new-customers';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send Daily New Registered Customers';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     */
    public function handle()
    {
        // get current date and use to get all the new customers registered in this date
        $date = new DateTime();
        $new_customers_counter = DB::table("customers")
            ->whereDate("created_at", "=",$date)
            ->count();
        $details = [
            "title" => "New Customers Registered",
            "body" => "You Have $new_customers_counter new Customers ",
        ];
        // fill the ADMIN_EMAIL in the env file to send the result
        Mail::to(env("ADMIN_EMAIL"))->send(new DailyCustomersMail($details));
        $this->info("New Daily Customers Registered Has Been Sent");
    }
}
