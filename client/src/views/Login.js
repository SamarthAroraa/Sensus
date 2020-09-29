import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";
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

					<Button color="primary" className="animation-on-hover" type="submit">
						Login
					</Button>
					{/* <div className="text-center pt-3">
            Or log in with your social accounts
          </div>
          <FormGroup className="justify-content-center d-flex pt-2">
            <Button className="btn-icon btn-round mr-3" color="danger">
              <i className="fab fa-google" />
            </Button>
            <Button className="btn-icon btn-round ml-3" color="info">
              <i className="fab fa-facebook-f" />
            </Button>
          </FormGroup> */}
					<div className="text-center">
						<Link to="/sign-up">New to Sensus? Sign Up</Link>
					</div>
				</CardBody>
			</Card>
		</form>
	);
};

Login.propTypes = {
	loginUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors,
});
export default connect(mapStateToProps, { loginUser })(Login);
