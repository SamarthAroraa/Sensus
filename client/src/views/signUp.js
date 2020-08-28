import React from "react";
import "../assets/scss/login-form.scss";
import Switch from "react-bootstrap-switch";

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
const SignUp = () => {
  const danger = {
    color: "#ff0000",
  };
  return (
    <form className="login-form">
      <Card className="form-component">
        <CardBody className="p-4">
          <CardTitle>
            <h1>Sign Up</h1>
          </CardTitle>

          <FormGroup>
            <Label>
              Your name <span style={danger}>*</span>
            </Label>
            <Row>
              <Col>
                <Input type="text" placeholder="First name" />
              </Col>
              <Col>
                <Input type="text" placeholder="Last name" />
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Label for="exampleEmail">
              Email address <span style={danger}>*</span>
            </Label>
            <Input
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
            <Row>
              <Col>
                <Label for="pen-name">Pen Name</Label>
                <Input
                  type="text"
                  name="pen-name"
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
              <Input type="checkbox" />
              Use Pen name as the default
              <span className="form-check-sign">
                <span className="check"></span>
              </span>
            </Label>
          </FormGroup>
          <FormGroup></FormGroup>
          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Input
              type="password"
              name="password"
              id="examplePassword"
              placeholder="Password"
              autoComplete="off"
            />
          </FormGroup>
          <FormGroup check></FormGroup>
          <Button color="primary" className="animation-on-hover" type="submit">
            Sign up
          </Button>

          <div className="text-center pt-3">
            Or sign up with your social accounts
          </div>
          <FormGroup className="justify-content-center d-flex pt-2">
            <Button className="btn-icon btn-round mr-3" color="danger">
              <i className="fab fa-google" />
            </Button>
            <Button className="btn-icon btn-round ml-3" color="info">
              <i className="fab fa-facebook-f" />
            </Button>
          </FormGroup>
          <div className="text-center pt-1 ">
            <a href="/login">Already a member? Login.</a>
          </div>
        </CardBody>
      </Card>
    </form>
  );
};

export default SignUp;
