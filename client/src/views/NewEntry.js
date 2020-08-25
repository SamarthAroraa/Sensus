import React from "react";
import axios from "axios";

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

class NewEntry extends React.Component {
  constructor(props) {
    //conversion of date in the required format
    var today = new Date();
    var dd = today.getDate();

    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }

    if (mm < 10) {
      mm = "0" + mm;
    }
    today = dd + "/" + mm + "/" + yyyy;

    super(props);
    this.state = {
      prompt: null,
      currentDate: today,
    };
  }

  componentDidMount() {
    fetch("http://localhost:5000/app-utils/daily-prompts")
      .then((response) => response.json())
      .then((response) => {
        this.setState({ prompt: response.prompt });
        console.log(response);
      });
  }
  render() {
    //styles for the main textarea
    const textarea_styles = {
      maxHeight: 70 + "vh",
      height: 70 + "vh",
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
              <Card style={{ height: 90 + "vh" }}>
                <CardHeader>
                  <FormGroup>
                    <Input
                      style={title_styles}
                      cols="80"
                      defaultValue="Entry Title"
                      placeholder="Give your entry a title"
                      rows="1"
                      type="textarea"
                    />
                  </FormGroup>
                  <h5 className="text-muted ml-4">
                    <i className="tim-icons icon-calendar-60"></i> &nbsp;
                    {this.state.currentDate}
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
                            defaultValue=""
                            className="ps-child"
                            placeholder={this.state.prompt}
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
  }
}

export default NewEntry;
