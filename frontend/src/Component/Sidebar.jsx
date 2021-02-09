import React, {Component} from 'react';
import {connect} from "react-redux";

class Navbar extends Component {
    render() {
        return (
            <div className="bg-light border-right" id="sidebar-wrapper">
                <div className="list-group list-group-flush">
                    <a href="/panel/profile" className="list-group-item list-group-item-action bg-light">Profile</a>
                    <a href="/panel/customers/list" className="list-group-item list-group-item-action bg-light">Customers</a>
                    <a href="/panel/customers/average" className="list-group-item list-group-item-action bg-light">Average Customers</a>
                </div>
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