import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import AdminLayout from "layouts/Admin/Admin.js";
import RTLLayout from "layouts/RTL/RTL.js";
import Login from "../src/views/Login";
import SignUp from "../src/views/signUp";

import "assets/scss/black-dashboard-react.scss";
import "assets/demo/demo.css";
import "assets/css/nucleo-icons.css";

const hist = createBrowserHistory();

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
        <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
        <Route path="/rtl" render={(props) => <RTLLayout {...props} />} />
        <Redirect from="/" to="/admin/new-entry" />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
