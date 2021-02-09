import React from 'react';
import './App.css';
import Panel from './Pages/Panel';
import Navbar from './Component/Navbar';
import Login from './Pages/Login';
import Register from './Pages/Register';
import RegisterCustomer from './Pages/RegisterCustomer';
import GuestRoute from './Component/GuestRoute';
import AuthRoute from './Component/AuthRoute';
import {BrowserRouter as Router } from "react-router-dom";
import CustomerRegistered from "./Pages/CustomerRegistered";

function App() {
  return (
    <Router>
      <Navbar/>
      <GuestRoute path="/login" exact component={Login}/>
      <GuestRoute path="/register" exact component={Register}/>
      <GuestRoute path="/register_customer" exact component={RegisterCustomer}/>
      <GuestRoute path="/customer_registered" exact component={CustomerRegistered}/>
      <AuthRoute path="/panel" component={Panel}/>
    </Router>
  );
}

export default App;
