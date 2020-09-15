import React, { useState, useEffect } from "react";

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
  Label,
  Row,
  Col,
} from "reactstrap";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../actions/authActions";

const UserProfile = (props) => {
  const username = "@mike_andrew123"; //This will be taken from props.

  let fname = "Mike";
  let lname = "Andrew";
  let pname = "";
  let pnamedef = false;
  let co = "";
  let abt =
    "Do not be scared of the truth because we need to restart the human foundation in truth And I love you like Kanye loves Kanye I love Rick Owens’ bed design but the back is...";
  let fburl = "";
  let turl = "";
  let iurl = "";
  let liurl = "";

  useEffect(() => {
    
    if (props.auth.user) {
      setFirstName(props.auth.user.fname);
      setLastName(props.auth.user.lname);
      setPenName(props.auth.user.penName);
      setPenNameDefault(props.auth.user.penNameDefault);
      setCountry(props.auth.user.country);
      setAbout(props.auth.user.about);
      setFacebookURL(props.auth.user.facebookURL);
      setInstagramURL(props.auth.user.instagramURL);
      setLinkedinURL(props.auth.user.linkedinURL);
    }
  }, []);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [penName, setPenName] = useState("");
  const [penNameDefault, setPenNameDefault] = useState(false);
  const [country, setCountry] = useState("");
  const [about, setAbout] = useState("Hi! I'm using Sensus");
  const [facebookURL, setFacebookURL] = useState("");
  const [twitterURL, setTwitterURL] = useState("");
  const [instagramURL, setInstagramURL] = useState("");
  const [linkedinURL, setLinkedinURL] = useState("");

  const handleSave = () => {
    let updatedObject = {
      id: props.auth.user.id,
      fname: firstName,
      lname: lastName,
      pname: penName,
      pnamedef: penNameDefault,
      abt: about,
      fburl: facebookURL,
      turl: twitterURL,
      iurl: instagramURL,
      liurl: linkedinURL,
    };
    console.log(updatedObject);
  };

  return (
    <div className="content">
      <Card className="card-user">
        <CardBody>
          <CardText />
          <div className="author">
            <div className="block block-one" />
            <div className="block block-two" />
            <div className="block block-three" />
            <div className="block block-four" />
            <a href="#pablo" onClick={(e) => e.preventDefault()}>
              <img
                alt="..."
                className="avatar"
                src={require("assets/img/anime3.png")}
              />{" "}
              <h3 className="title">
                {firstName} {lastName} {penName == "" ? "" : `(${penName})`}
              </h3>{" "}
            </a>{" "}
          </div>{" "}
          <div className="card-description">{about}</div>{" "}
        </CardBody>{" "}
        <CardFooter>
          <div className="button-container">
            {facebookURL == "" ? null : (
              <Button className="btn-icon btn-round" color="facebook">
                <a href={facebookURL}>
                  <i className="fab fa-facebook" />
                </a>
              </Button>
            )}
            {twitterURL == "" ? null : (
              <Button className="btn-icon btn-round" color="twitter">
                <a href={twitterURL}>
                  <i className="fab fa-twitter" />
                </a>
              </Button>
            )}
            {instagramURL == "" ? null : (
              <Button className="btn-icon btn-round" color="instagram">
                <a href={instagramURL}>
                  <i className="fab fa-instagram" />
                </a>
              </Button>
            )}
            {linkedinURL == "" ? null : (
              <Button className="btn-icon btn-round" color="linkedin">
                <a href={linkedinURL}>
                  <i className="fab fa-linkedin" />
                </a>
              </Button>
            )}
          </div>{" "}
        </CardFooter>{" "}
      </Card>{" "}
      <Card>
        <CardHeader>
          <h5 className="title"> Edit Profile </h5>{" "}
        </CardHeader>{" "}
        <Form>
          <CardBody>
            <Row>
              <Col className="pr-md-1" md="6">
                <FormGroup>
                  <label> First Name </label>{" "}
                  <Input
                    placeholder="First Name"
                    type="text"
                    name="fname"
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                  />
                </FormGroup>{" "}
              </Col>{" "}
              <Col className="pl-md-1" md="6">
                <FormGroup>
                  <label> Last Name </label>{" "}
                  <Input
                    placeholder="Last Name"
                    type="text"
                    name="lname"
                    value={lastName}
                    onChange={(event) => {
                      setLastName(event.target.value);
                    }}
                  />
                </FormGroup>{" "}
              </Col>{" "}
            </Row>{" "}
            <Row>
              <Col className="pr-md-1" md="6">
                <FormGroup>
                  <label> Pen Name </label>{" "}
                  <Input
                    placeholder="Pen Name"
                    type="text"
                    name="pname"
                    value={penName}
                    onChange={(event) => {
                      setPenName(event.target.value);
                    }}
                  />
                </FormGroup>{" "}
              </Col>{" "}
              <Col className="pl-md-1" md="6">
                <label> </label>
                <FormGroup check>
                  <Label check>
                    <Input
                      type="checkbox"
                      name="pnamedef"
                      defaultChecked={penNameDefault}
                      // value={pnamedef}
                      onClick={(event) => {
                        setPenNameDefault(!penNameDefault);
                      }}
                    />{" "}
                    Use pen name as default
                    <span className="form-check-sign">
                      <span className="check"></span>
                    </span>
                  </Label>
                </FormGroup>
              </Col>{" "}
            </Row>
            <Row>
              <Col className="pr-md-1" md="4">
                <FormGroup>
                  <label> Country </label>{" "}
                  <Input
                    placeholder="Country"
                    type="text"
                    name="country"
                    value={country}
                    onChange={(event) => {
                      setCountry(event.target.value);
                    }}
                  />
                </FormGroup>{" "}
              </Col>{" "}
            </Row>{" "}
            <Row>
              <Col md="8">
                <FormGroup>
                  <label> About Me </label>{" "}
                  <Input
                    cols="80"
                    placeholder="Here can be your description"
                    rows="4"
                    type="textarea"
                    name="about"
                    value={about}
                    onChange={(event) => {
                      setAbout(event.target.value);
                    }}
                  />
                </FormGroup>{" "}
              </Col>{" "}
            </Row>{" "}
          </CardBody>{" "}
          <CardHeader>
            <h5 className="title"> Social Media Links </h5>
          </CardHeader>
          <CardBody>
            <Row>
              <Col className="pr-md-1" md="4">
                <FormGroup>
                  <label> Facebook </label>{" "}
                  <Input
                    placeholder="FB ID URL"
                    type="url"
                    name="fburl"
                    value={facebookURL}
                    onChange={(event) => {
                      setFacebookURL(event.target.value);
                    }}
                  />
                </FormGroup>{" "}
              </Col>{" "}
            </Row>{" "}
            <Row>
              <Col className="pr-md-1" md="4">
                <FormGroup>
                  <label> Twitter </label>{" "}
                  <Input
                    placeholder="Twitter URL"
                    type="url"
                    name="turl"
                    value={twitterURL}
                    onChange={(event) => {
                      setTwitterURL(event.target.value);
                    }}
                  />
                </FormGroup>{" "}
              </Col>{" "}
            </Row>{" "}
            <Row>
              <Col className="pr-md-1" md="4">
                <FormGroup>
                  <label> Instagram </label>{" "}
                  <Input
                    placeholder="Instagram URL"
                    type="url"
                    name="iurl"
                    value={instagramURL}
                    onChange={(event) => {
                      setInstagramURL(event.target.value);
                    }}
                  />
                </FormGroup>{" "}
              </Col>{" "}
            </Row>{" "}
            <Row>
              <Col className="pr-md-1" md="4">
                <FormGroup>
                  <label> LinkedIn </label>{" "}
                  <Input
                    placeholder="LinkedIn URL"
                    type="url"
                    name="liurl"
                    value={linkedinURL}
                    onChange={(event) => {
                      setLinkedinURL(event.target.value);
                    }}
                  />
                </FormGroup>{" "}
              </Col>{" "}
            </Row>{" "}
          </CardBody>
          <CardFooter>
            <Button
              className="btn-fill"
              color="primary"
              // type="submit"
              onClick={handleSave}
            >
              Save{" "}
            </Button>{" "}
          </CardFooter>{" "}
        </Form>{" "}
      </Card>{" "}
    </div>
  );
};

UserProfile.propTypes = {
  auth: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { registerUser })(
  withRouter(UserProfile)
);
