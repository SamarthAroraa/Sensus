import axios from "axios";
import qs from "querystring";
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
	const [focused, setFocused] = useState("");
	const [email, setEmail] = useState("");
	const [disableButton, setDisableButton] = useState(false);
	const [displayMessage, setDisplayMessage] = useState("");
	const [messageClass, setMessageClass] = useState("");

	const onFocus = () => {
		setFocused("input-group-focus");
	};

	const onBlur = () => {
		setFocused("");
	};

	const onSubmit = async (event) => {
		event.preventDefault();

		setDisableButton(true);

		try {
			let res = await axios.patch(
				process.env.REACT_APP_API_URI + "forgot-password",
				qs.stringify({ email: email })
			);
			console.log(res.data);
			setDisplayMessage(res.data.displayMessage);
			setMessageClass("success");
		} catch (err) {
			console.log(err.response.data);
			setDisplayMessage(err.response.data.displayMessage);
			setMessageClass("danger");
			setDisableButton(false);
		}
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
							value={email}
							onChange={(event) => {
								setEmail(event.target.value);
							}}
						/>
					</InputGroup>
					<FormText color={messageClass}>{displayMessage}</FormText>
				</CardBody>

				<CardFooter>
					<Button
						color="primary"
						className="animation-on-hover btn-block"
						type="submit"
						disabled={disableButton}
					>
						Send Password
					</Button>
				</CardFooter>
			</Card>
		</form>
	);
};

export default ForgotPassword;
