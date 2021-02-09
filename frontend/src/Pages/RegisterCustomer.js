import React, {Component} from 'react';
import Error from "../Component/Error";
import axios from "axios";
import Recaptcha from "react-recaptcha";

class RegisterCustomer extends Component {
    constructor (props) {
        super(props);
        this.state = {
            first_name: "",
            last_name: "",
            email: "",
            phone_number: "",
            is_verified: false,
            errors: {},
        }
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleFormSubmit = (e) => {
        e.preventDefault();
        if (this.state.is_verified) {
            const data = {
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                email: this.state.email,
                password: this.state.password,
                phone_number: this.state.phone_number
            };
            axios.post("/customers/register", data)
                .then(res => {
                    this.props.history.push("/customer_registered");
                })
                .catch(e => this.setState({errors: e.response.data.errors}));
        }
        else {
            alert("Please Verify You are a Human")
        }
    };

    verifyRecaptcha = (response) => {
        if (response){
            this.setState({
                is_verified: true
            })
        }
    };

    render() {
        return (
            <div className="d-flex justify-content-center mt-5 text-dark">
                <form className="bg-white rounded border p-3">
                    <div className="col-md-12 form-group ">
                        <h4 className="navbar-text-color">Register Customer</h4>
                        <hr/>
                    </div>
                    <div className="form-group ">
                        <div className="col-md-12">
                            <label htmlFor="first_name"> First Name</label>
                        </div>
                        <div className="col-md-12">
                            <input type="text" className="form-control" name="first_name" value={this.state.first_name} id="first_name" onChange={this.handleInputChange}/>
                            <Error error={this.state.errors['first_name'] ?this.state.errors['first_name'] :null }/>
                        </div>
                    </div>
                    <div className="form-group ">
                        <div className="col-md-12">
                            <label htmlFor="last_name"> Last Name</label>
                        </div>
                        <div className="col-md-12">
                            <input type="text" className="form-control" name="last_name" value={this.state.last_name} id="first_name" onChange={this.handleInputChange}/>
                            <Error error={this.state.errors['last_name'] ?this.state.errors['last_name'] :null }/>
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
                            <label htmlFor="phone_number"> Phone Number</label>
                        </div>
                        <div className="col-md-12">
                            <input type="number" className="form-control" name="phone_number" value={this.state.phone_number} id="phone_number" onChange={this.handleInputChange}/>
                            <Error error={this.state.errors['phone_number'] ?this.state.errors['phone_number'] :null }/>
                        </div>
                    </div>
                    <div className="form-group col-md-12 justify-content-center" onClick={this.handleFormSubmit}>
                        <Recaptcha
                            sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                            render="explicit"
                            verifyCallback={this.verifyRecaptcha}
                        />
                        <button className="btn btn-info w-100"> Register </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default RegisterCustomer;