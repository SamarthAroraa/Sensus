import React, { useState } from "react";

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

const UserProfile = () => {
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

  const [firstName, setFirstName] = useState("Mike");
  const [lastName, setLastName] = useState("Andrew");
  const [penName, setPenName] = useState("");
  const [penNameDefault, setPenNameDefault] = useState(false);
  const [country, setCountry] = useState("");
  const [about, setAbout] = useState(
    "Do not be scared of the truth because we need to restart the human foundation in truth And I love you like Kanye loves Kanye I love Rick Owens’ bed design but the back is..."
  );
  const [facebookURL, setFacebookURL] = useState("");
  const [twitterURL, setTwitterURL] = useState("");
  const [instagramURL, setInstagramURL] = useState("");
  const [linkedinURL, setLinkedinURL] = useState("");

  const handleSave = () => {
    setFirstName(fname);
    setLastName(lname);
    setPenName(pname);
    setPenNameDefault(pnamedef);
    setCountry(co);
    setAbout(abt);
    setFacebookURL(fburl);
    setTwitterURL(turl);
    setInstagramURL(iurl);
    setLinkedinURL(liurl);
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
                src={require("assets/img/emilyz.jpg")}
              />{" "}
              <h3 className="title">
                {firstName} {lastName} {penName == "" ? "" : `(${penName})`}
              </h3>{" "}
            </a>{" "}
            <p className="description"> {username} </p>{" "}
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
                    // value={fname}
                    onChange={(event) => {
                      console.log(event.target.value);
                      fname = event.target.value;
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
                    // value={lname}
                    onChange={(event) => {
                      lname = event.target.value;
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
                    // value={pname}
                    onChange={(event) => {
                      pname = event.target.value;
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
                      // value={pnamedef}
                      onClick={(event) => {
                        pnamedef = !pnamedef;
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
                    // value={co}
                    onChange={(event) => {
                      co = event.target.value;
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
                    // value={abt}
                    onChange={(event) => {
                      abt = event.target.value;
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
                    // value={fburl}
                    onChange={(event) => {
                      fburl = event.target.value;
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
                    // value={turl}
                    onChange={(event) => {
                      turl = event.target.value;
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
                    // value={iurl}
                    onChange={(event) => {
                      iurl = event.target.value;
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
                    // value={liurl}
                    onChange={(event) => {
                      liurl = event.target.value;
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
              type="submit"
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

export default UserProfile;
