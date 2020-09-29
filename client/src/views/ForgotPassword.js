import React, { useState } from "react";
import {
	FormGroup,
	Label,
	Input,
	InputGroup,
	InputGroupAddon,
	InputGroupText,
	FormText,
	Button,
	Card,
	CardText,
	CardBody,
	CardTitle,
	CardSubtitle,
	CardFooter,
} from "reactstrap";

const ForgotPassword = (props) => {
	const onSubmit = (event) => {
		event.preventDefault();
	};

	const [focused, setFocused] = useState("");

	const onFocus = () => {
		setFocused("input-group-focus");
	};

	const onBlur = () => {
		setFocused("");
	};
	return (
		<form className="login-form" noValidate onSubmit={onSubmit}>
			<Card className="form-component">
				<CardBody style={{ textAlign: "center" }}>
					<CardTitle>
						<i style={{ display: "block" }} className="fas fa-lock fa-6x"></i>
						<br></br>
						<h2 style={{ color: "#d725bb" }}>Trouble Logging In?</h2>
						<h5>
							Enter your email and we'll send you your new login credential to
							get back into your account.
						</h5>
					</CardTitle>
					<InputGroup className={focused}>
						<InputGroupAddon addonType="prepend">
							<InputGroupText>
								<i className="fas fa-envelope"></i>
							</InputGroupText>
						</InputGroupAddon>
						<Input
							type="text"
							placeholder="Email Address"
							onFocus={onFocus}
							onBlur={onBlur}
						/>
					</InputGroup>
				</CardBody>

				<CardFooter>
					<Button
						color="primary"
						className="animation-on-hover btn-block"
						type="submit"
					>
						Send Password
					</Button>
				</CardFooter>
			</Card>
		</form>
	);
};

export default ForgotPassword;
