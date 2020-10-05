import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loginUser, googleOAuth2 } from "../actions/authActions";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import classnames from "classnames";

import { Link } from "react-router-dom";
import "../assets/scss/login-form.scss";

import {
  FormGroup,
  Label,
  Input,
  FormText,
  Button,
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap";
import {
  FacebookLoginButton,
  GoogleLoginButton,
} from "react-social-login-buttons";

const Login = (props) => {
  const [errors, setErrors] = useState({});
  const [userCredentials, setUserCredentials] = useState({
    password: "",
    email: "",
  });
  const danger = {
    color: "#ff0000",
  };
  const { password, email } = userCredentials;
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserCredentials({ ...userCredentials, [name]: value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email: email,
      password: password,
    };

    props.loginUser(userData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
  };
  const LoggedIn = (props) => (
    <GoogleLogout
      clientId="YOUR_CLIENT_ID"
      buttonText="Logout"
      onLogoutSuccess={props.googleOAuth2}
    />
  );

  const LoggedOut = (props) => <Login />;

  const HandleAuth = (props) => {
    const isLoggedIn = props.isLoggedIn;
    if (isLoggedIn) {
      props.history.push("/admin/new-entry");
    }
  };
  useEffect(() => {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (props.auth.isAuthenticated) {
      props.history.push("/admin/new-entry");
    }
  });

  useEffect(() => {
    if (props.auth.isAuthenticated) {
      props.history.push("/admin/new-entry"); // push user to dashboard when they login
    }
    if (props.errors) {
      setErrors(props.errors);
    }
  }, [props]);

  return (
    // <HandleAuth isLoggedIn={typeof props.googleReducer !== 'undefined'}>
    <form className="login-form" noValidate onSubmit={onSubmit}>
      <Card className="form-component">
        <CardBody className="p-4">
          <CardTitle>
            <h1>Login</h1>
          </CardTitle>

          <FormGroup>
            <Label for="exampleEmail">Email address</Label>
            <Input
              onChange={handleChange}
              value={email}
              error={errors.email}
              type="email"
              name="email"
              className={classnames("", {
                invalid: errors.email || errors.emailnotfound,
              })}
              id="exampleEmail"
              placeholder="Enter email"
            />
            <FormText color="danger">
              {errors.email}
              {errors.emailnotfound}
            </FormText>
            <FormText color="muted">
              We'll never share your email with anyone else.
            </FormText>
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className={classnames("", {
                invalid: errors.password || errors.passwordincorrect,
              })}
              value={password}
              onChange={handleChange}
              error={errors.password}
              autoComplete="off"
            />
            <FormText style={{ textAlign: "right" }}>
              <Link to="/forgot-password">Forgot Password?</Link>
            </FormText>
            <FormText color="danger">
              {errors.password}
              {errors.passwordincorrect}
            </FormText>
          </FormGroup>

          <Button
            color="primary"
            style={{ display: "block", margin: "0 auto 10px" }}
            className="animation-on-hover"
            type="submit"
          >
            Login
          </Button>
          {/* <div className="text-center pt-3">
            Or log in with your social accounts
          </div>
          <FormGroup className="justify-content-center d-flex pt-2">
           
            <GoogleLogin
              clientId="309790979574-35mv41mmp1eqm5tdrnils1eqk6lau2j0.apps.googleusercontent.com"
              buttonText="Sign in with Google"
              onSuccess={props.googleOAuth2}
              onFailure={props.googleOAuth2}
              cookiePolicy={"single_host_origin"}
              isSignedIn={true}
            />
          </FormGroup> */}
          <div className="text-center">
            <Link to="/sign-up">New to Sensus? Sign Up</Link>
          </div>
        </CardBody>
      </Card>
    </form>
    // </HandleAuth>
  );
};

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  googleReducer: state.googleReducer,
  errors: state.errors,
});
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ googleOAuth2, loginUser }, dispatch);
};
export default connect(mapStateToProps, { loginUser })(Login);
