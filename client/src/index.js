import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import AdminLayout from "layouts/Admin/Admin.js";
import RTLLayout from "layouts/RTL/RTL.js";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import Login from "../src/views/Login";
import SignUp from "../src/views/signUp";
import PrivateRoute from "./components/private-route/PrivateRoute";

import "assets/scss/black-dashboard-react.scss";
// import 'react-big-calendar/lib/css/react-big-calendar.css'
import "../node_modules/react-big-calendar/lib/sass/styles.scss";
import "assets/demo/demo.css";
import "assets/css/nucleo-icons.css";
import ForgotPassword from "views/ForgotPassword";

const hist = createBrowserHistory();

// Check for token to keep user logged in
if (localStorage.jwtToken) {
	// Set auth token header auth
	const token = localStorage.jwtToken;
	setAuthToken(token);
	// Decode token and get user info and exp
	const decoded = jwt_decode(token);
	// Set user and isAuthenticated
	store.dispatch(setCurrentUser(decoded));
	// Check for expired token
	const currentTime = Date.now() / 1000; // to get in milliseconds
	if (decoded.exp < currentTime) {
		// Logout user
		store.dispatch(logoutUser());
		// Redirect to login
		window.location.href = "./login";
	}
}

ReactDOM.render(
	<Provider store={store}>
		<Router history={hist}>
			<Switch>
				<Route exact path="/login" render={(props) => <Login {...props} />} />
				<Route
					exact
					path="/sign-up"
					render={(props) => <SignUp {...props} />}
				/>
				<Route
					exact
					path="/forgot-password"
					render={(props) => <ForgotPassword {...props} />}
				/>
				<PrivateRoute
					path="/admin"
					component={(props) => <AdminLayout {...props} />}
				/>
				<Redirect from="/" to="/admin/new-entry" />
			</Switch>
		</Router>
	</Provider>,
	document.getElementById("root")
);
