import React, { Component } from 'react'
import axios from 'axios'
import cookie from "js-cookie";
import {connect} from "react-redux";
import Error from "../Component/Error";

class Login extends Component {
    constructor (props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            errors: {},
        }
    }
    handleFormSubmit = (e) => {
        e.preventDefault();
        const data = {email: this.state.email,password: this.state.password};
        axios.post("/auth/login",data)
            .then(res => {
                cookie.set("token",res.data.access_token);
                this.props.setLogin(res.data.user);
                this.props.history.push("/panel");
            })
            .catch(e => this.setState({errors: e.response.data.errors}));

    };

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    render () {
        return (
            <div className="d-flex justify-content-center mt-5 text-dark col-md-12">
                <form className="bg-white rounded border p-3">
                    <div className="col-md-12 form-group ">
                        <h4 className="navbar-text-color">Login </h4>
                        <hr/>
                    </div>
                    <div className="form-group">
                        <div className="col-md-3">
                            <label htmlFor="email" className="control-label"> Email</label>
                        </div>
                        <div className="col-md-12">
                            <input type="email" className="form-control" name="email" value={this.state.email} id="email" onChange={this.handleInputChange}/>
                            <Error error={this.state.errors['email'] ?this.state.errors['email'] :null }/>
                        </div>
                    </div>
                   <div className="form-group">
                       <div className="col-md-3">
                           <label htmlFor="password" className="control-label"> Password</label>
                       </div>
                       <div className="col-md-12">
                           <input type="password" className="form-control" name="password" value={this.state.password} id="password" onChange={this.handleInputChange}/>
                           <Error error={this.state.errors['password'] ?this.state.errors['password'] :null }/>
                       </div>
                   </div>
                   <div className="form-group col-md-12 justify-content-center" onClick={this.handleFormSubmit}>
                       <Error error={this.state.errors['status'] && this.state.errors['status'] === "Unauthorized" ? this.state.errors['status'] :null }/>
                       <button className="btn btn-info w-100"> Login </button>
                   </div>
               </form>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        setLogin: user =>  dispatch({type: "SET_LOGIN",payload: user})
    }
};

export default connect(null,mapDispatchToProps)(Login)