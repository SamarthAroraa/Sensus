import React, { useState, useEffect, useRef } from "react";
import "../assets/scss/login-form.scss";
import Switch from "react-bootstrap-switch";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../actions/authActions";
import classnames from "classnames";

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
  Row,
  Col,
  Form,
} from "reactstrap";
import {
  FacebookLoginButton,
  GoogleLoginButton,
} from "react-social-login-buttons";

const SignUp = (props) => {
  const danger = {
    color: "#ff0000",
  };

  const [errors, setErrors] = useState({});
  const [defaultPname, setDefaultPname] = useState(false);
  const [userCredentials, setUserCredentials] = useState({
    firstName: "",
    password: "",
    password2: "",
    email: "",
    lastName: "",
    penName: "",
    // defaultPname: false,
  });
  const {
    firstName,
    password,
    password2,
    email,
    lastName,
    penName,
    // defaultPname,
  } = userCredentials;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserCredentials({ ...userCredentials, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      password2: password2,
      penName: penName,
      defaultPname: defaultPname,
    };
    props.registerUser(newUser, props.history);
  };

  useEffect(() => {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (props.auth.isAuthenticated) {
      this.props.history.push("/admin/new-entry");
    }
  });
  useEffect(() => {
    if (props.errors) {
      setErrors(props.errors);
    }
  }, [props]);

  return (
    <form className="login-form" noValidate onSubmit={onSubmit}>
      <Card className="form-component mt-4">
        <CardBody className="p-4 ">
          <CardTitle>
            <h1>Sign Up</h1>
          </CardTitle>

          <FormGroup>
            <Label>
              Your name <span style={danger}>*</span>
            </Label>
            <Row>
              <Col>
                <Input
                  onChange={handleChange}
                  error={errors.firstName}
                  value={firstName}
                  type="text"
                  className={classnames("", {
                    invalid: errors.firstName,
                  })}
                  placeholder="First name"
                  name="firstName"
                  required
                />
                <FormText color="danger">{errors.firstName}</FormText>
              </Col>
              <Col>
                <Input
                  onChange={handleChange}
                  error={errors.lastName}
                  value={lastName}
                  className={classnames("", {
                    invalid: errors.lastName,
                  })}
                  type="text"
                  placeholder="Last name"
                  name="lastName"
                  required
                />
                <FormText color="danger">{errors.lastName}</FormText>
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Label for="email">
              Email address <span style={danger}>*</span>
            </Label>

            <Input
              onChange={handleChange}
              value={email}
              error={errors.email}
              type="email"
              name="email"
              className={classnames("", {
                invalid: errors.email,
              })}
              id="email"
              required
              placeholder="Enter email"
            />
            <FormText color="danger">{errors.email}</FormText>

            <FormText color="muted">
              We'll never share your email with anyone else.
            </FormText>
          </FormGroup>

          <FormGroup>
            <Row>
              <Col>
                <Label for="pen-name">Pen Name</Label>
                <Input
                  onChange={handleChange}
                  type="text"
                  name="penName"
                  value={penName}
                  id="pen-name"
                  placeholder="You can use a Pen name too!"
                />
              </Col>
            </Row>
            <FormText color="muted">
              This is an optional field. You can change it later.
            </FormText>
          </FormGroup>

          <FormGroup check>
            <Label check>
              <Input
                type="checkbox"
                checked={defaultPname}
                onChange={() => setDefaultPname(!defaultPname)}
                name="defaultPname"
              />
              Use Pen name as the default
              <span className="form-check-sign">
                <span className="check"></span>
              </span>
            </Label>
          </FormGroup>
          <FormGroup></FormGroup>
          <Label for="password">
            Password <span style={danger}>*</span>
          </Label>
          <Row className="">
            <Col>
              <Input
                type="password"
                name="password"
                value={password}
                className={classnames("", {
                  invalid: errors.password,
                })}
                onChange={handleChange}
                error={errors.password}
                id="password"
                required
                placeholder="Password"
                autoComplete="off"
              />
              <FormText color="danger">{errors.password}</FormText>
            </Col>
            <Col>
              <Input
                onChange={handleChange}
                type="password"
                value={password2}
                name="password2"
                error={errors.password2}
                className={classnames("", {
                  invalid: errors.password2,
                })}
                required
                id="confirmPassword"
                placeholder="Confirm Password"
                autoComplete="off"
              />
              <FormText color="danger">{errors.password2}</FormText>
            </Col>
          </Row>
          <FormGroup></FormGroup>
          <Button color="primary" className="animation-on-hover" type="submit">
            Sign up
          </Button>

          {/* <div className="text-center pt-3">
            Or sign up with your social accounts
          </div>
          <FormGroup className="justify-content-center d-flex pt-2">
            <Button className="btn-icon btn-round mr-3" color="danger">
              <i className="fab fa-google" />
            </Button>
            <Button className="btn-icon btn-round ml-3" color="info">
              <i className="fab fa-facebook-f" />
            </Button>
          </FormGroup> */}
          <div className="text-center pt-1 ">
            <Link to="/login">Already a member? Login</Link>
          </div>
        </CardBody>
      </Card>
    </form>
  );
};

SignUp.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { registerUser })(withRouter(SignUp));
