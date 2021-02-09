import React, {Component,Fragment} from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import cookie from "js-cookie";

class Navbar extends Component {
    handleLogout = (e) => {
        e.preventDefault();
        this.props.logout();
        cookie.remove("token")
    };

    render() {
        return (
            <div className="bg-light">
                <nav className="navbar d-flex w-100">
                    <div className="p-2">
                        <h2 className="font-weight-bold font-italic navbar-text-color">CUSTOMERS</h2>
                    </div>
                    <div className="p-2">
                        {!this.props.loggedIn ?
                            <Fragment>
                                <Link to="/login" className="p-2">
                                    Login
                                </Link>
                                <Link to="/register" className="p-2">
                                    Register
                                </Link>
                                <Link to="/register_customer" className="p-2 bg-info text-white rounded font-weight-bolder">
                                    New Customer
                                </Link>
                            </Fragment>
                            :
                            <Fragment>
                                <Link to="/logout" className="p-2" onClick={this.handleLogout}>
                                    Logout
                                </Link>
                            </Fragment>
                        }

                    </div>
                </nav>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        loggedIn: state.auth.loggedIn
    }
};
const mapDispatchToProps = dispatch => {
    return {
        logout: () => {dispatch({type:"SET_LOGOUT"})}
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(Navbar);