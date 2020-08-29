import React, { useState, useEffect } from "react";

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
  const { password, email } = userCredentials;
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserCredentials({ ...userCredentials, [name]: value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      email: email,
      password: password,
    };
    console.log(newUser);
  };
  return (
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
              id="exampleEmail"
              placeholder="Enter email"
            />
            <FormText color="muted">
              We'll never share your email with anyone else.
            </FormText>
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Input
              type="password"
              name="password"
              id="examplePassword"
              placeholder="Password"
              value={password}
              onChange={handleChange}
              error={errors.password}
              autoComplete="off"
            />
          </FormGroup>

          <Button color="primary" className="animation-on-hover" type="submit">
            Login
          </Button>
          <div className="text-center pt-3">
            Or log in with your social accounts
          </div>
          <FormGroup className="justify-content-center d-flex pt-2">
            <Button className="btn-icon btn-round mr-3" color="danger">
              <i className="fab fa-google" />
            </Button>
            <Button className="btn-icon btn-round ml-3" color="info">
              <i className="fab fa-facebook-f" />
            </Button>
          </FormGroup>
          <div className="text-center">
            <Link to="/sign-up">New to Sensus? Sign Up</Link>
          </div>
        </CardBody>
      </Card>
    </form>
  );
};

export default Login;
