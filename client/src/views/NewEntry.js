import React, { useState, useEffect } from "react";
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

const NewEntry = (props) => {
  // constructor(props) {
  //conversion of date in the required format
  var today = new Date();
  var dd = today.getDate();

  var mm = today.getMonth();
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
  const [entryTitle, setEntryTitle] = useState(
    "Hi, " + props.auth.user.fname + ". Give your entry a title!"
  );
  const [prompt, setPrompt] = useState("");

  //

  useEffect(() => {
    fetch("http://localhost:5000/app-utils/daily-prompts")
      .then((response) => response.json())
      .then((response) => {
        setPrompt(response.prompt);
      });
  }, []);
  useEffect(() => {
    let newEntry = {
      user_id: props.auth.user.id,
      title: entryTitle,
      text: entryText,
      date: today,
    };
  }, [entryText, entryTitle]);

  //styles for the main textarea
  const textarea_styles = {
    maxHeight: 73 + "vh",
    height: 73 + "vh",
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
            <Card style={{ height: 100 + "vh" }}>
              <CardHeader>
                <FormGroup>
                  <Input
                    style={title_styles}
                    cols="80"
                    value={entryTitle}
                    onChange={(e) => {
                      setEntryTitle(e.value);
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
                            setEntryText(e.value);
                          }}
                          className="ps-child"
                          placeholder={prompt}
                          rows="4"
                          type="textarea"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
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
