import React from "react";
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

const ForgotPassword = (props) => {
	const onSubmit = (event) => {
		event.preventDefault();
	};

	return (
		<form className="login-form" noValidate onSubmit={onSubmit}>
			<Card className="form-component">
				<CardBody>
					<CardTitle style={{ textAlign: "center" }}>
						<i
							style={{ display: "block", color: "#e9b000" }}
							className="fas fa-lock fa-6x"
						></i>
						<br></br>
						<h2>Trouble Logging In?</h2>
						<h5>
							Enter your email and we'll send you a link to get back into your
							account.
						</h5>
					</CardTitle>
					<div class="input-group">
						<div class="input-group-prepend">
							<div class="input-group-text">
								<i class="fas fa-envelope"></i>
							</div>
						</div>
						<input
							type="text"
							class="form-control"
							placeholder="Email Address"
						/>
					</div>
				</CardBody>
			</Card>
		</form>
	);
};

export default ForgotPassword;
