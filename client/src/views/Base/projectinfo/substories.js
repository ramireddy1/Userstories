import React, { Component } from "react";
//import { withRouter } from "react-router-dom";
//import { allprojects } from "./../../../components/UserFunctions";
//import TableRow from "@material-ui/core/TableRow";
//import TableCell from "@material-ui/core/TableCell";
//import TableBody from "@material-ui/core/TableBody";
//import jwt_decode from "jwt-decode";
//import jwt_decode from "jwt-decode";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { Button } from "reactstrap";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
//import CardMedia from "@material-ui/core/CardMedia";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import Fab from "@material-ui/core/Fab";
//import Icon from "@material-ui/core/Icon";
//import NavigationIcon from "@material-ui/icons/Navigation";
import AddIcon from "@material-ui/icons/Add";

import Typography from "@material-ui/core/Typography";
import { Form, Jumbotron } from "reactstrap";

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

import Modal from "react-bootstrap/Modal";
//import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.css";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import "../../../styles/modal.css";
import { createus, editus, deleteus } from "../../../components/UserFunctions";
import { red } from "@material-ui/core/colors";
//import jwt_decode from "jwt-decode";

const bgcolor = {
  backgroundColor: "#FFFFFF"
};

const priorities = [
  {
    value: "Low",
    label: "Low"
  },
  {
    value: "Medium",
    label: "Medium"
  },
  {
    value: "High",
    label: "High"
  }
];
const pStyle = {
  display: "inline-block"
};
const lowerCaseCreate = {
  textTransform: "none",
  fontSize: "125%"
};

const paraStyle = {
  fontSize: "120%"
};

const horLineStyle = {
  color: red
};

class Substories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      emailRegistered: "",
      datas: [],
      // parentarray: [],
      email: "",
      priorities: "Low",
      show: false,
      showModal1: false,
      showModal2: false,
      showModal3: false,
      usFlag: "0",

      usID1: "",
      asA1: "",
      iWant1: "",
      soThat1: "",
      usDesc1: "",
      priority1: "",
      usID: "",
      asA: "",
      iWant: "",
      soThat: "",
      usDesc: "",
      priority: "",
      stoken: "",

      showEdit2: false
    };

    this.getTable = this.getTable.bind(this);
    this.getParent = this.getParent.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmitsCreate = this.onSubmitsCreate.bind(this);
    this.onSubmitsEdit = this.onSubmitsEdit.bind(this);
    this.onSubmitsDelete = this.onSubmitsDelete.bind(this);
    //this.getModal = this.getModal.bind(this);
    //this.getNewModal = this.getNewModal.bind(this);
  }

  componentDidMount() {
    axios
      .get("/userstories/base/viewproject")
      .then(res => {
        this.setState({ datas: res.data });
        console.log("got parent ID");
      })
      .catch(error => {
        console.log("your error is" + error);
      });

    const ramis = localStorage.getItem("storytoken");
    console.log("User token is with " + ramis);

    const token = localStorage.usertoken;
    const decoded = jwt_decode(token);
    this.setState({
      //first_name: decoded.first_name,
      //last_name: decoded.last_name,
      emailRegistered: decoded.email,
      stoken: ramis
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmitsCreate(e) {
    e.preventDefault();

    //const today = new Date().toDateString();
    const today = new Date();
    const time = today.getTime();

    this.setState({ show: false, showModal1: false });

    const usData = {
      // sno: this.state.sno,
      email: this.state.emailRegistered,
      usID: "project" + time,
      asA: this.state.asA1,
      iWant: this.state.iWant1,
      soThat: this.state.soThat1,
      usDesc: this.state.usDesc1,
      priority: this.state.priority1,
      usFlag: this.state.usFlag,
      parentID: this.state.stoken
    };
    console.log("in view" + usData.email);
    createus(usData).then(res => {
      //this.handleShow();
      //console.log(usData.priority);
      this.props.history.push(`/base/dashboard`);
      this.props.history.push("/base/substories");
    });
  }

  //Edit functionality
  onSubmitsEdit(e) {
    e.preventDefault();
    this.setState({ show: false, showModal2: false });
    const usData = {
      usID: this.state.usID,
      asA: this.state.asA,
      iWant: this.state.iWant,
      soThat: this.state.soThat,
      usDesc: this.state.usDesc,
      priority: this.state.priority
    };
    //console.log(usData.priority);
    editus(usData).then(res => {
      //this.handleShow();
      //console.log(usData.priority);
      this.props.history.push(`/base/dashboard`);
      this.props.history.push("/base/substories");
    });
  }

  //Delete functionality
  onSubmitsDelete(e) {
    e.preventDefault();
    this.setState({ show: false, showModal2: false, showModal3: false });
    const usData = {
      usID: this.state.usID,
      asA: this.state.asA,
      iWant: this.state.iWant,
      soThat: this.state.soThat,
      usDesc: this.state.usDesc,
      priority: this.state.priority
    };
    //console.log(usData.priority);
    deleteus(usData).then(res => {
      //this.handleShow();
      //console.log(usData.priority);
      this.props.history.push(`/base/dashboard`);
      this.props.history.push("/base/substories");
    });
  }

  getParent() {
    if (!this.state.datas) return null;
    const temp = this.state.stoken;

    // console.log("stoken check vek" + vek);
    // console.log("stoken check stoken" + this.state.stoken);
    return (
      //this.state.datas

      this.state.datas
        .filter(row => row.usID === temp.replace(/['"]+/g, ""))
        .map((row, index) => (
          // if (row.email === this.state.email) {
          <div>
            <Jumbotron>
              <h1 className="display-20">
                As a {row.asA}, I want to {row.iWant} so that {row.soThat}.
              </h1>
              <p className="lead">Created on {row.createdOn}</p>
              <hr className="my-2" />
              <p>You can create an manage sub stories</p>
              <p className="lead" />
              <Button color="primary" onClick={() => this.handleEdit(row)}>
                Edit it
              </Button>{" "}
              <br />
              <br />
              <div>{this.getNewModal()}</div>
            </Jumbotron>
          </div>

          // <h5>{row.asA}</h5>
        ))
    );
  }

  getTable(priorityValue) {
    //const { classes } = props;

    if (priorityValue === "High") {
      var styleHigh = {
        maxWidth: 345,
        backgroundColor: "#F74700"
      };
    }
    if (priorityValue === "Medium") {
      styleHigh = {
        maxWidth: 345,
        backgroundColor: "#2E86C1"
      };
    }
    if (priorityValue === "Low") {
      styleHigh = {
        maxWidth: 345,
        backgroundColor: "#194d33"
      };
    }

    console.log("Story token in substory page " + this.state.stoken);

    // const stylesCardTest = "stylesCard" + priorityValue;
    //console.log("Testing is " + stylesCardTest);
    if (!this.state.datas) return null; //added this line

    return (
      //this.state.datas

      this.state.datas
        //.filter(row => row.createdBy === this.state.emailRegistered)
        //.filter(row => row.priority === "High")
        .filter(row => row.priority === priorityValue)
        .filter(row => row.parentID === this.state.stoken)
        //.filter(row => row.email === this.state.email)

        .map((row, index) => (
          // if (row.email === this.state.email) {

          <Col xs="12" sm="6" md="3">
            <Card style={styleHigh}>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    <font style={{ color: "#E5E8E8" }}>
                      As a {row.asA}, I want to {row.iWant} so that {row.soThat}
                      .
                    </font>
                  </Typography>
                  <Typography component="p" style={paraStyle}>
                    <b style={{ color: "#D7DBDD" }}>Desc: </b>
                    {row.usDesc}.
                  </Typography>
                  <Typography component="h4" style={paraStyle}>
                    <br />
                    <font style={{ fontWeight: "100" }}>
                      {" "}
                      Last edited: &nbsp;{row.createdOn}
                    </font>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <IconButton
                  aria-label="Edit"
                  className="editIcon"
                  onClick={() => this.handleEdit(row)}
                >
                  <EditIcon fontSize="large" />
                </IconButton>
                <IconButton
                  aria-label="Delete"
                  className="deleteIcon"
                  variant="extended"
                  onClick={() => this.handleDelete(row)}
                >
                  {" "}
                  <DeleteIcon fontSize="large" />
                </IconButton>
              </CardActions>
            </Card>
          </Col>
        ))
    );
  }

  getNewModal() {
    return (
      <div>
        <Form>
          <Fab
            color="secondary"
            variant="extended"
            aria-label="Add"
            onClick={this.handleShow}
            style={lowerCaseCreate}
          >
            Create Sub User Story &nbsp;
            <AddIcon />
          </Fab>

          <Modal show={this.state.showModal1} onHide={this.handleClose}>
            <Modal.Header className="modalheader" closeButton>
              <Modal.Title>Create User Story </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="rowC">
                <h5>As a &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h5>
                <TextField
                  style={pStyle}
                  required
                  id="outlined-required"
                  fullWidth
                  name="asA1"
                  label="type of user"
                  value={this.state.asA1}
                  onChange={this.onChange}
                  margin="normal"
                  variant="outlined"
                />
              </div>
              <div className="rowC">
                <h5>I want &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h5>
                <TextField
                  required
                  id="outlined-required"
                  fullWidth
                  label="some goal"
                  name="iWant1"
                  value={this.state.iWant1}
                  onChange={this.onChange}
                  margin="normal"
                  variant="outlined"
                />
              </div>
              <div className="rowC">
                <h5>So that &nbsp;&nbsp;&nbsp;&nbsp;</h5>
                <TextField
                  required
                  id="outlined-required"
                  fullWidth
                  label="some reason"
                  name="soThat1"
                  value={this.state.soThat1}
                  onChange={this.onChange}
                  margin="normal"
                  variant="outlined"
                />
              </div>
              <div className="rowC">
                <h5>Priority &nbsp;&nbsp;</h5>
                <TextField
                  id="outlined-select-currency"
                  select
                  name="priority1"
                  value={this.state.priority1}
                  onChange={this.onChange}
                  //onChange={this.handleChange("currency")}
                  helperText="Please select the priority"
                  margin="normal"
                  variant="outlined"
                >
                  {priorities.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>

              <h5>User Story Description</h5>
              <div className="rowC">
                <h5>&emsp;&emsp;&emsp;&emsp;</h5>
                <TextField
                  id="outlined-multiline-static"
                  fullWidth
                  label="User Story Description"
                  multiline
                  rows="4"
                  name="usDesc1"
                  value={this.state.usDesc1}
                  onChange={this.onChange}
                  margin="normal"
                  variant="outlined"
                />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={this.onSubmitsCreate}>
                Create
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Modal to edit */}

          <Modal show={this.state.showModal2} onHide={this.handleClose}>
            <Modal.Header className="modalheader" closeButton>
              <Modal.Title>Edit User Story</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="rowC">
                <h5>As a &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h5>
                <TextField
                  style={pStyle}
                  required
                  id="outlined-required"
                  fullWidth
                  label="type of user"
                  name="asA"
                  defaultValue={this.state.asA}
                  onChange={this.onChange}
                  margin="normal"
                  variant="outlined"
                />
              </div>
              <div className="rowC">
                <h5>I want &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h5>
                <TextField
                  required
                  id="outlined-required"
                  fullWidth
                  label="some goal"
                  name="iWant"
                  defaultValue={this.state.iWant}
                  onChange={this.onChange}
                  margin="normal"
                  variant="outlined"
                />
              </div>
              <div className="rowC">
                <h5>So that &nbsp;&nbsp;&nbsp;&nbsp;</h5>
                <TextField
                  required
                  id="outlined-required"
                  fullWidth
                  label="some reason"
                  name="soThat"
                  defaultValue={this.state.soThat}
                  onChange={this.onChange}
                  margin="normal"
                  variant="outlined"
                />
              </div>
              <div className="rowC">
                <h5>Priority&nbsp;&nbsp;</h5>
                <TextField
                  id="outlined-select-currency"
                  select
                  name="priority"
                  value={this.state.priority}
                  onChange={this.onChange}
                  //onChange={this.handleChange("currency")}
                  helperText="Please select the priority"
                  margin="normal"
                  variant="outlined"
                >
                  {priorities.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>

              <h5>User Story Description</h5>
              <div className="rowC">
                <h5>&emsp;&emsp;&emsp;&emsp;</h5>
                <TextField
                  id="outlined-multiline-static"
                  fullWidth
                  label="User Story Description"
                  multiline
                  rows="4"
                  name="usDesc"
                  defaultValue={this.state.usDesc}
                  onChange={this.onChange}
                  margin="normal"
                  variant="outlined"
                />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={this.onSubmitsEdit}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Modal to Delete */}
          <Modal show={this.state.showModal3} onHide={this.handleClose}>
            <Modal.Header className="modalheader" closeButton>
              <Modal.Title>Delete User Story</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="rowC">
                <h5>
                  As a {this.state.asA}, I want to {this.state.iWant} so that{" "}
                  {this.state.soThat}
                </h5>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={this.onSubmitsDelete}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
        </Form>
      </div>
    );
  }

  handleClose() {
    this.setState({
      show: false,
      showModal1: false,
      showModal2: false,
      showModal3: false
    });
  }

  handleEdit(row) {
    this.setState({
      show: true,
      showModal2: true,
      showModal1: false,
      usID: row.usID,
      asA: row.asA,
      iWant: row.iWant,
      soThat: row.soThat,
      usDesc: row.usDesc,
      priority: row.priority
    });
    //this.getModal();
    //return <di>{this.getModal}</di>;
  }

  handleDelete(row) {
    this.setState({
      show: false,
      showModal2: false,
      showModal1: false,
      showModal3: true,
      usID: row.usID,
      asA: row.asA,
      iWant: row.iWant,
      soThat: row.soThat,
      usDesc: row.usDesc,
      priority: row.priority
    });
    //this.getModal();
    //return <di>{this.getModal}</di>;
  }

  handleShow() {
    this.setState({
      show: true,
      showModal1: true,
      showModal2: false,
      showModal3: false
    });
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    //const { data } = this.state;
    const Medium = "Medium";
    const Low = "Low";
    const High = "High";

    return (
      //
      <div className="animated fadeIn" style={bgcolor}>
        <div>
          {this.getParent()} <br />
        </div>

        <h2>High Priority </h2>
        <Row>{this.getTable(High)}</Row>
        <hr style={horLineStyle} />
        <h2>Medium Priority </h2>
        <Row>{this.getTable(Medium)}</Row>

        <hr style={horLineStyle} />
        <h2>Low Priority</h2>
        <Row>{this.getTable(Low)}</Row>
      </div>
    );
  }
}

export default Substories;
