import React, {Component} from 'react';
import axios from "axios";
import cookie from "js-cookie";
import Error from "../Component/Error";
import Recaptcha from 'react-recaptcha'

class Register extends Component {
    constructor (props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            password: "",
            confirm_password: "",
            is_verified: false,
            errors: {},
        }
    }

    handleInputChange = (e,page) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleFormSubmit = (e) => {
        e.preventDefault();
        const data = {name: this.state.name ,email: this.state.email,password: this.state.password,confirm_password:this.state.confirm_password};
        if (this.state.is_verified){
            axios.post("/auth/register",data)
                .then(res => {
                    cookie.set("token",res.data.access_token);
                    cookie.set("user",res.data.user);
                    this.props.history.push("/panel");
                })
                .catch(e => this.setState({errors: e.response.data.errors}));
        }
        else {
            alert("Please Verify You are a Human");
        }


    };

    verifyRecaptcha = (response) => {
        if (response){
            this.setState({
                is_verified: true
            })
        }
    }

    render () {
        return (
            <div className="d-flex justify-content-center mt-5 text-dark">
                <form className="bg-white rounded border p-3">
                    <div className="col-md-12 form-group ">
                        <h4 className="navbar-text-color">Register </h4>
                        <hr/>
                    </div>
                    <div className="form-group ">
                        <div className="col-md-12">
                            <label htmlFor="name"> Name</label>
                        </div>
                        <div className="col-md-12">
                            <input type="text" className="form-control" name="name" value={this.state.name} id="email" onChange={this.handleInputChange}/>
                            <Error error={this.state.errors['name'] ?this.state.errors['name'] :null }/>
                        </div>
                    </div>
                    <div className="form-group ">
                        <div className="col-md-12">
                            <label htmlFor="email"> Email</label>
                        </div>
                        <div className="col-md-12">
                            <input type="email" className="form-control" name="email" value={this.state.email} id="email" onChange={this.handleInputChange}/>
                            <Error error={this.state.errors['email'] ?this.state.errors['email'] :null }/>
                        </div>
                    </div>
                    <div className="form-group ">
                        <div className="col-md-12">
                            <label htmlFor="password"> Password</label>
                        </div>
                        <div className="col-md-12">
                            <input type="password" className="form-control" name="password" value={this.state.password} id="password" onChange={this.handleInputChange}/>
                            <Error error={this.state.errors['password'] ?this.state.errors['password'] :null }/>
                        </div>
                    </div>
                    <div className="form-group ">
                        <div className="col-md-12">
                            <label htmlFor="confirm_password">Confirm Password</label>
                        </div>
                        <div className="col-md-12">
                            <input type="password" className="form-control" name="confirm_password" value={this.state.confirm_password} id="confirm_password" onChange={this.handleInputChange}/>
                            <Error error={this.state.errors['confirm_password'] ?this.state.errors['confirm_password'] :null }/>
                        </div>
                    </div>
                    <div className="form-group col-md-12 justify-content-center" onClick={this.handleFormSubmit}>
                        <button className="btn btn-info w-100"> Submit </button>
                    </div>
                    <Recaptcha
                        sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                        render="explicit"
                        verifyCallback={this.verifyRecaptcha}
                    />
                </form>
            </div>
        )
    }
}

export default Register;