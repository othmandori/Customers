import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store/index';
import {Provider} from 'react-redux';
import axios from 'axios';
import cookie from 'js-cookie';
import jwt from 'jsonwebtoken';


let token = cookie.get("token");
const jwt_secret = "hAiyEdRuyR3roCcazdVx5FW4wTGmQOm7K58ijHkMuto9hseGj7IHxpiacPBxOjMz";
const render = () => {
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('root')
    );
};
if (token) {
    // verify a token symmetric
    jwt.verify(token, jwt_secret, function(err, decoded) {
        if (err || decoded.iss !== "http://127.0.0.1:8000/api/auth/login"){
            token = null;
            cookie.remove("token")
        }
        else {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            axios.post("http://127.0.0.1:8000/api/auth/me")
                .then((res) => {
                    store.dispatch({type: "SET_LOGIN", payload: res.data});
                    render();
                });
            return;
        }
        render();
    });
}
else {
    render();
}



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
