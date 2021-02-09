import React, { Component } from 'react'
import {connect} from "react-redux";
import axios from "axios";
import Error from "../Component/Error";

class Profile extends Component {
    constructor (props) {
        super(props);
        this.state = {
            name: this.props.name,
            email: this.props.email,
            submit_message: "",
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
        const data = {name:this.state.name ,email: this.state.email};
        axios.post("/auth/update",data)
            .then(res => {
               this.setState({submit_message: "Updated Successfully"})
            })
            .catch(e => this.setState({errors: e.response.data.errors}));

    };

    render () {
        return (
            <div id="page-content-wrapper">
                <div className="container-fluid">
                    <div className="d-flex mt-5 text-dark justify-content-center ">
                    <form className="bg-white rounded border p-3 col-md-6">
                        <div className="col-md-12 form-group ">
                            <h4 className="navbar-text-color">Update Profile </h4>
                            <hr/>
                        </div>
                        <div className="form-group ">
                            <div className="col-md-3">
                                <label htmlFor="name"> Name</label>
                            </div>
                            <div className="col-md-12">
                                <input type="text" className="form-control" name="name" value={this.state.name} id="email" onChange={this.handleInputChange}/>
                                <Error error={this.state.errors['name'] ?this.state.errors['name'] :null }/>
                            </div>
                        </div>
                        <div className="form-group ">
                            <div className="col-md-3">
                                <label htmlFor="email"> Email</label>
                            </div>
                            <div className="col-md-12">
                                <input type="email" className="form-control" name="email" value={this.state.email} id="email" onChange={this.handleInputChange}/>
                                <Error error={this.state.errors['email'] ?this.state.errors['email'] :null }/>
                            </div>
                        </div>
                        <div className="form-group col-md-12 justify-content-center" onClick={this.handleFormSubmit}>
                            <button className="btn btn-info w-100"> Update </button>
                            <p className="text-success mt-3">{this.state.submit_message}</p>
                        </div>
                    </form>
                </div>
                </div>
            </div>


        )
    }
}

const mapStateToProps = state => {
    return {
        name: state.auth.user.name,
        email: state.auth.user.email,
    }
};
export default connect(mapStateToProps)(Profile);