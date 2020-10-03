import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// reactstrap components
import {
	Button,
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	CardText,
	FormGroup,
	Form,
	Input,
	Row,
	Col,
} from "reactstrap";

const qs = require("querystring");

const NewEntry = (props) => {
	// constructor(props) {
	//conversion of date in the required format
	var today = new Date();
	var dd = today.getDate();
	// 0 indexed months so added 1

	var mm = today.getMonth() + 1;
	var yyyy = today.getFullYear();
	if (dd < 10) {
		dd = "0" + dd;
	}

	if (mm < 10) {
		mm = "0" + mm;
	}
	today = dd + "/" + mm + "/" + yyyy;

	const [currentDate, setCurrentDate] = useState(today);
	const [entryText, setEntryText] = useState("");
	const [borderColor, setBorderColor] = useState("transparent");
	const [entryTitle, setEntryTitle] = useState(
		"Hi, " + props.auth.user.defaultName + ". Give your entry a title!"
	);
	const [prompt, setPrompt] = useState("");
	const [disableSaveBtn, setDisableSaveBtn] = useState(false);

	var newEntry = {};

	//function that saves/updates the entry
	const save = async () => {
		newEntry = {
			user_id: props.auth.user.id,
			title: entryTitle,
			text: entryText,
			date: today,
		};
		console.log(newEntry);

		setDisableSaveBtn(true);

		await axios
			.post(
				process.env.REACT_APP_API_URI+"api/v1/entries/create-update",
				qs.stringify(newEntry)
			)
			// .then((res) => res.json())
			.then((res) => {
				console.log(res);
			});

		window.location.reload(true);
	};

	//

	useEffect(() => {
		fetch(process.env.REACT_APP_API_URI+"app-utils/daily-prompts")
			.then((response) => response.json())
			.then((response) => {
				setPrompt(response.prompt);
			});

		let url =
		process.env.REACT_APP_API_URI+"api/v1/entries/find?" +
			"user_id=" +
			props.auth.user.id +
			"&date=" +
			today;
		axios.get(url).then((res) => {
			if (res.data.exists) {
				setEntryText(res.data.entry.text);
				setEntryTitle(res.data.entry.title);
				setBorderColor(res.data.entry.mood);
			}
		});
		console.log("mounting");

		return () => {
			newEntry = {
				user_id: props.auth.user.id,
				title: entryTitle,
				text: entryText,
				date: today,
			};
			save();
		};
	}, []);

	//styles for the main textarea
	const textarea_styles = {
		maxHeight: 59 + "vh",
		height: 59 + "vh",
		border: "none",
		fontSize: 17 + "px",
	};
	//styles for the entry title
	const title_styles = {
		border: "none",
		fontSize: 32 + "px",
		overflow: "hidden",
	};

	return (
		<>
			<div className="content">
				<Row>
					<Col md="1"></Col>
					<Col md="10">
						<Card
							style={{ height: 91 + "vh", border: "20px solid " + borderColor }}
						>
							<CardHeader>
								<FormGroup>
									<Input
										style={title_styles}
										cols="80"
										value={entryTitle}
										onChange={(e) => {
											setEntryTitle(e.target.value);
										}}
										placeholder="Give your entry a title"
										rows="1"
										type="textarea"
									/>
								</FormGroup>
								{/* <hr /> */}

								<h5 className="text-muted ml-4">
									<i className="tim-icons icon-calendar-60"></i> &nbsp;
									{currentDate}
								</h5>
							</CardHeader>
							<CardBody>
								<Form>
									<Row>
										<Col md="12">
											<FormGroup>
												<Input
													style={textarea_styles}
													cols="80"
													value={entryText}
													onChange={(e) => {
														setEntryText(e.target.value);
													}}
													className="ps-child"
													placeholder={prompt}
													rows="4"
													type="textarea"
												/>
											</FormGroup>
										</Col>
									</Row>
									{/* <Row> */}
									{/* <Col sm="12"> */}
									<div className="text-right">
										<Button
											disabled={disableSaveBtn}
											onClick={() => save()}
											size="md"
											color="primary"
											className="pl-4 pr-4"
										>
											<i className="tim-icons icon-cloud-upload-94"></i> Save
										</Button>
									</div>
									{/* </Col> */}
									{/* </Row> */}
								</Form>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</div>
		</>
	);
};
const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps)(withRouter(NewEntry));
