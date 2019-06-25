import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
//import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import StarIcon from "@material-ui/icons/Star";
import { MDBBadge } from "mdbreact";
//import Fab from "@material-ui/core/Fab";

var x = 0;

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      datas: [],
      Projectdatas: [],
      numCount: "0"
    };
    this.getList = this.getList.bind(this);
    this.getSubList = this.getSubList.bind(this);
    this.getProjectList = this.getProjectList.bind(this);
    this.getCount = this.getCount.bind(this);
  }

  componentDidMount() {
    axios
      .get("/userstories/base/viewproject")
      .then(res => {
        this.setState({ datas: res.data });
        console.log("success");
      })
      .catch(error => {
        console.log("your error is" + error);
      });
    //const rami = localStorage.getItem("projecttoken");
    //console.log("project token is with " + rami);
    axios
      .get("/projects/base/allprojects")
      .then(res => {
        this.setState({ Projectdatas: res.data });
        console.log("success in project");
      })
      .catch(error => {
        console.log("your error is" + error);
      });

    const token = localStorage.usertoken;
    const decoded = jwt_decode(token);
    this.setState({
      first_name: decoded.first_name,
      last_name: decoded.last_name,
      email: decoded.email
      //ptoken: rami
    });
    console.log("registered email is " + this.state.email);
  }

  getCount() {
    //this.setState({ numCount: this.state.numCount + 1 });
    var y = 1;
    x = x + y;

    //x: x + 1;
    //this.state.numCount : this.state.numCount + 1;
    console.log("count is" + x);
  }

  getList(project) {
    console.log("registered email in getList " + this.state.email);
    x = 0;

    return (
      //this.state.datas

      this.state.datas

        //.filter(row => row.projectID === this.state.ptoken)
        // .filter(row => row.priority === priorityValue)
        //.filter(row => row.createdBy === this.state.email)
        .filter(row => row.projectID.replace(/['"]+/g, "") === project.PID)

        .map((row, index) => (
          // if (row.email === this.state.email) {
          <div>
            <ListItem button style={{ backgroundColor: "#768181" }}>
              <ListItemIcon>
                <StarIcon />
              </ListItemIcon>{" "}
              <h4>
                {index + 1}
                .&nbsp;As a {row.asA}, I want to {row.iWant} so that{" "}
                {row.soThat}.{" "}
                <MDBBadge
                  style={{ backgroundColor: "#ed7709", alignItems: "flex-end" }}
                >
                  {row.priority}
                </MDBBadge>
                &nbsp;
              </h4>
              <ListItemText inset />
              {row.priority === "High" ? this.getCount() : ""}
            </ListItem>
            {this.getSubList(row)}
          </div>
        ))
    );
  }

  getSubList(parent) {
    return (
      //this.state.datas

      this.state.datas

        //.filter(row => row.projectID === this.state.ptoken)
        // .filter(row => row.priority === priorityValue)
        //.filter(row => row.createdBy === this.state.email)
        .filter(row => row.parentID.replace(/['"]+/g, "") === parent.usID)

        .map((row, index) => (
          // if (row.email === this.state.email) {

          <div>
            <ListItem button style={{ backgroundColor: "#768181" }}>
              <ListItemIcon />
              <h4>
                &emsp;&emsp;&emsp;{index + 1}.&nbsp;hiAs a {row.asA}, I want to{" "}
                {row.iWant} so that {row.soThat}.{" "}
                <MDBBadge style={{ backgroundColor: "#f4424b" }}>
                  {row.priority}
                </MDBBadge>
                &nbsp;
              </h4>
              {row.priority === "High" ? this.getCount() : ""}
              <ListItemText />
            </ListItem>
          </div>
        ))
    );
  }

  getProjectList() {
    return (
      //this.state.datas

      this.state.Projectdatas.filter(
        row =>
          row.email === this.state.email ||
          row.shared.includes(this.state.email) === true
      )
        // .filter(row => row.priority === priorityValue)
        //.filter(row => row.email === this.state.ptoken)
        //.filter(row => row.parentID.replace(/['"]+/g, "") === parent.usID)

        .map((row, index) => (
          // if (row.email === this.state.email) {
          <div>
            <ListItem button style={{ backgroundColor: "#4286f4" }}>
              <ListItemIcon />
              <h4>
                {index + 1}.&nbsp;{row.Project_Title} : {row.PID}{" "}
                &emsp;&emsp;&emsp;
              </h4>
              <ListItemText />
            </ListItem>{" "}
            {this.getList(row)}
            <ListItem button style={{ backgroundColor: "#a8a786" }}>
              <ListItemIcon />
              <h4>
                <MDBBadge style={{ backgroundColor: "#fc0000" }}>TODO</MDBBadge>
                &nbsp;High priority user stories are:&nbsp;&nbsp;
                {x}
              </h4>
              <ListItemText />
            </ListItem>
            <br />
          </div>
        ))
    );
  }

  render() {
    return (
      <div>
        <h2>
          Hi {this.state.first_name} {this.state.last_name}, <br />
          Here are your projects and user stories...
        </h2>
        <br />

        <div>{this.getProjectList()}</div>
      </div>
    );
  }
}

export default Dashboard;
