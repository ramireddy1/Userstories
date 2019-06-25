import React, { Component } from "react";
import { withRouter } from "react-router-dom";
//import { allprojects } from "./../../../components/UserFunctions";
//import TableRow from "@material-ui/core/TableRow";
//import TableCell from "@material-ui/core/TableCell";
//import TableBody from "@material-ui/core/TableBody";
//import jwt_decode from "jwt-decode";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { Button, CardText } from "reactstrap";
//import { findDOMNode } from "react-dom";
//import ReactTooltip from "react-tooltip";
//import { mapToCssModules } from "../../../src/utils";
//import classNames from "classnames";

//import TableRowColumn from "@material-ui/core/TableRow";
import {
  //Badge,
  Card,
  //CardBody,
  //CardFooter,
  //CardHeader,
  Col,
  Row
  //Collapse,
  //Fade
} from "reactstrap";
//import { AppSwitch } from "@coreui/react";

class Allprojects extends Component {
  constructor(props) {
    super(props);
    /** if (localStorage.getItem("usertoken") === null) {
      this.props.history.push("/login");
      
    }
    */

    //this.toggle = this.toggle.bind(this);
    //this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      datas: [],
      email: "",
      tooltipOpen: false
      //forTest: "",
      // name: "rami"
    };

    this.getTable1 = this.getTable1.bind(this);
    this.getTable2 = this.getTable2.bind(this);
  }

  componentDidMount() {
    axios
      .get("/projects/base/allprojects")
      .then(res => {
        //localStorage.setItem("usertokens", res.data);
        this.setState({ datas: res.data });
        //return res.data;
      })
      .catch(error => {
        console.log(error);
      });

    //
    // const tokens = localStorage.usertokens;
    // const decodeds = jwt_decode(tokens);

    //
    localStorage.removeItem("projecttoken");
    const token = localStorage.usertoken;
    const decoded = jwt_decode(token);
    this.setState({
      //first_name: decoded.first_name,
      //last_name: decoded.last_name,
      email: decoded.email
      // forTest: decodeds.PID
    });

    this.projectView = this.projectView.bind(this);
  }

  projectView(row) {
    console.log("Title id is " + row.Project_Title);
    localStorage.removeItem("projecttoken");
    localStorage.removeItem("projectTitle");
    localStorage.removeItem("projectSize");
    localStorage.removeItem("projectShared");
    localStorage.removeItem("projectDesc");
    //localStorage.removeItem("usertoken");
    localStorage.setItem("projecttoken", JSON.stringify(row.PID));

    localStorage.setItem("projectTitle", JSON.stringify(row.Project_Title));
    localStorage.setItem("projectSize", JSON.stringify(row.Teamsize));
    localStorage.setItem("projectShared", JSON.stringify(row.shared));
    localStorage.setItem("projectDesc", JSON.stringify(row.Project_desc));

    localStorage.removeItem("sharedtoken");
    //localStorage.removeItem("usertoken");
    localStorage.setItem("sharedtoken", JSON.stringify(row.shared));
    this.props.history.push(`/base/viewproject`);
  }

  projectView2(row) {
    console.log("Title id is " + row.Project_Title);
    localStorage.removeItem("shareclick");
    localStorage.setItem("shareclick", "ABCD");
    localStorage.removeItem("projecttoken");
    localStorage.removeItem("projectTitle");
    localStorage.removeItem("projectSize");
    localStorage.removeItem("projectShared");
    localStorage.removeItem("projectDesc");
    //localStorage.removeItem("usertoken");
    localStorage.setItem("projecttoken", JSON.stringify(row.PID));

    localStorage.setItem("projectTitle", JSON.stringify(row.Project_Title));
    localStorage.setItem("projectSize", JSON.stringify(row.Teamsize));
    localStorage.setItem("projectShared", JSON.stringify(row.shared));
    localStorage.setItem("projectDesc", JSON.stringify(row.Project_desc));

    localStorage.removeItem("sharedtoken");
    //localStorage.removeItem("usertoken");
    localStorage.setItem("sharedtoken", JSON.stringify(row.shared));
    this.props.history.push(`/base/viewproject`);
  }

  toggle() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  }

  getTable1() {
    if (!this.state.datas) return null; //added this line
    //const classes = "tooltip-inner";
    console.log("this is" + this.state.email);
    localStorage.removeItem("shareclick");

    return (
      this.state.datas
        //.filter(row => row.email === this.state.email)
        .filter(
          row => row.email === this.state.email
          //row.shared.includes(this.state.email) === true
        )
        .map((row, index) => (
          // if (row.email === this.state.email) {

          <Col xs="12" sm="6" md="4">
            <Card
              body
              inverse
              //color="danger"
              style={{ backgroundColor: "#515A5A" }}
            >
              <CardText>
                <h4>{row.Project_Title}</h4>
              </CardText>
              <CardText>&nbsp;&nbsp;&nbsp;&nbsp;{row.Project_desc}</CardText>
              <br />
              <CardText>
                <h5>Project ID: {row.PID}</h5>
              </CardText>
              <CardText>
                <h6 style={{ color: "#ebebe0" }}>CREATED BY: {row.email}</h6>
                <h6 style={{ color: "#ebebe0" }}>SHARED WITH: {row.shared}</h6>
              </CardText>

              <Button
                onClick={() => this.projectView(row)}
                color="primary"
                size="lg"
                active
              >
                View project details
              </Button>
            </Card>
          </Col>
        ))
    );
  }

  getTable2() {
    if (!this.state.datas) return null; //added this line
    //const classes = "tooltip-inner";
    //const sharedclick = "rami";

    console.log("this is" + this.state.email);

    return (
      this.state.datas
        //.filter(row => row.email === this.state.email)
        .filter(
          row =>
            //row.email === this.state.email ||
            row.shared.includes(this.state.email) === true
        )
        .map((row, index) => (
          // if (row.email === this.state.email) {

          <Col xs="12" sm="6" md="4">
            <Card
              body
              inverse
              //color="danger"
              style={{ backgroundColor: "#515A5A" }}
            >
              <CardText>
                <h4>{row.Project_Title}</h4>
              </CardText>
              <CardText>&nbsp;&nbsp;&nbsp;&nbsp;{row.Project_desc}</CardText>
              <br />
              <CardText>
                <h5>Project ID: {row.PID}</h5>
              </CardText>
              <CardText>
                <h6 style={{ color: "#ebebe0" }}>CREATED BY: {row.email}</h6>
                <h6 style={{ color: "#ebebe0" }}>SHARED WITH: {row.shared}</h6>
              </CardText>

              <Button
                onClick={() => this.projectView2(row)}
                color="primary"
                size="lg"
                active
              >
                View project details
              </Button>
            </Card>
          </Col>
        ))
    );
  }

  render() {
    //const { data } = this.state;

    return (
      //
      <div className="animated fadeIn">
        <h2>You as a admin: </h2>
        <Row>{this.getTable1()}</Row>
        <h2>Shared with you: </h2>
        <Row>{this.getTable2()}</Row>
      </div>
    );
  }
}

export default withRouter(Allprojects);
