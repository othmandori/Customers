import React from 'react';
import CustomersTable from './CustomersTable';
import AverageCustomers from './AverageCustomers';
import Sidebar from "../Component/Sidebar";
import Profile from "./Profile";
import AuthRoute from "../Component/AuthRoute";

function Panel() {
    return (
            <div className="d-flex" id="wrapper">
                <Sidebar/>
                <AuthRoute path="/panel/profile" exact component={Profile}/>
                <AuthRoute path="/panel/customers/list" exact component={CustomersTable}/>
                <AuthRoute path="/panel/customers/average" exact component={AverageCustomers}/>
            </div>
    );
}

export default Panel;