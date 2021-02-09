import React from 'react'
import {Route,Redirect} from 'react-router-dom'
import {connect} from "react-redux";

// A wrapper for <Route> that redirects to the profile screen if you're authenticated.
function GuestRoute({ component:Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={ props =>
                !rest.loggedIn ? (
                    <Component {...props}/>
                ) : (
                    <Redirect
                        to={{
                            pathname: "/profile",
                            state: { from: props.location }
                        }}
                    />
                )
            }
        />
    );
}
const mapStateToProps = state =>{
    return {
        loggedIn: state.auth.loggedIn
    }
};

export default connect(mapStateToProps)(GuestRoute)