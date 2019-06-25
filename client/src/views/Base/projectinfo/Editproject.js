import React from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { editProject } from "../../../components/UserFunctions";
import jwt_decode from "jwt-decode";
import axios from "axios";

export default class Editproject extends React.Component {
  constructor() {
    super();
    this.state = {
      //sno: "",
      PID: "",
      Project_Title: "",
      Project_desc: "",
      Teamsize: "",
      email: "",
      shared: "",
      sno: "",
      ptoken: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmitsEdit = this.onSubmitsEdit.bind(this);
    //this.submitData = this.submitData.bind(this);
    this.onValidate = this.onValidate.bind(this);
    this.getEdit = this.getEdit.bind(this);
    this.handleEditProject = this.handleEditProject.bind(this);
    //this.getDetails = this.getDetails.bind(this);
    //this.onChange = this.onChange.bind(this);
    //this.ramireddy = this.ramireddy.bind(this);
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

    const rami = localStorage.getItem("projecttoken");
    console.log("project token is with me " + rami);

    const token = localStorage.usertoken;
    const decoded = jwt_decode(token);
    //more project

    const decoded2 = localStorage.getItem("projectTitle");
    console.log("Title token is with me " + decoded2);

    const decoded3 = localStorage.getItem("projectSize");

    const decoded4 = localStorage.getItem("projectShared");

    const decoded5 = localStorage.getItem("projectDesc");
    //end of more

    this.setState({
      //first_name: decoded.first_name,
      //last_name: decoded.last_name,
      email: decoded.email,
      ptoken: rami,
      Project_Title: decoded2.replace(/['"]+/g, ""),
      Teamsize: decoded3.replace(/['"]+/g, ""),
      shared: decoded4.replace(/['"]+/g, ""),
      Project_desc: decoded5.replace(/['"]+/g, "")
    });

    // this.handleEditProject();
    //this.handleEditProject();
    //this.ramireddy();
  }

  //componentDidUpdate(props) {
  //this.handleEditProject(props);
  //}

  onValidate(e) {
    // true means invalid, so our conditions got reversed
    if (
      this.state.PID.length === 0 ||
      this.state.Project_Title.length === 0 ||
      this.state.Project_desc.length === 0 ||
      this.state.Teamsize.length === 0
    ) {
      return true;
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  //Edit functionality
  onSubmitsEdit(e) {
    e.preventDefault();
    //this.setState({ show: false, showModal2: false });
    const proData = {
      PID: this.state.ptoken.replace(/['"]+/g, ""),
      // PID: this.state.PID,
      Project_Title: this.state.Project_Title,
      Project_desc: this.state.Project_desc,
      Teamsize: this.state.Teamsize,
      //email: this.state.email,
      shared: this.state.shared
    };
    console.log("updated one is" + proData.Project_desc);
    editProject(proData).then(res => {
      //this.handleShow();
      //console.log(usData.priority);
      //remove all localStorages
      localStorage.removeItem("projectTitle");
      localStorage.removeItem("projectSize");
      localStorage.removeItem("projectShared");
      localStorage.removeItem("projectDesc");
      //Updating all local storages
      localStorage.setItem(
        "projectTitle",
        JSON.stringify(this.state.Project_Title)
      );
      console.log("UPDATED" + this.state.Project_Title);

      localStorage.setItem("projectSize", JSON.stringify(this.state.Teamsize));
      localStorage.setItem("projectShared", JSON.stringify(this.state.shared));
      localStorage.setItem(
        "projectDesc",
        JSON.stringify(this.state.Project_desc)
      );
      this.props.history.push(`/base/dashboard`);
      this.props.history.push("/base/viewproject");
    });
  }

  getEdit() {
    if (!this.state.datas) return null; //added this line
    //const classes = "tooltip-inner";
    const temp = this.state.ptoken;
    console.log("this is" + this.state.ptoken);
    console.log("testing in edit project is" + this.state.datas);

    return (
      this.state.datas
        //.filter(row => row.email === this.state.email)

        .filter(row => row.PID === temp.replace(/['"]+/g, ""))
        .map((row, index) => (
          // if (row.email === this.state.email) {

          <div>
            <Form style={{ width: "60%" }}>
              <FormGroup>
                <h1>Edit the project</h1>

                <p className="text-muted">
                  <font style={{ color: "red" }}>{this.state.errors}</font>
                </p>
                <Label for="Project Title">Project Title</Label>
                <Input
                  type="text"
                  name="Project_Title"
                  id="project_title"
                  placeholder="Project Title"
                  defaultValue={row.Project_Title}
                  onChange={this.onChange}
                />
              </FormGroup>

              <FormGroup>
                <Label for="Project ID">Project ID</Label>
                <Input
                  type="text"
                  name="PID"
                  id="exampleNumber"
                  placeholder="Project ID"
                  value={row.PID}
                  onChange={this.onChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="Project ID">Team Size</Label>
                <Input
                  type="text"
                  name="Teamsize"
                  id="exampleNumber"
                  placeholder="Team Size ID"
                  defaultValue={row.Teamsize}
                  onChange={this.onChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="Project team">Share with</Label>
                <Input
                  type="textarea"
                  name="shared"
                  id="shared"
                  placeholder="sharing"
                  defaultValue={row.shared}
                  onChange={this.onChange}
                />
              </FormGroup>

              <FormGroup>
                <Label for="exampleText">Project Description</Label>
                <Input
                  type="textarea"
                  name="Project_desc"
                  id="exampleText"
                  placeholder="write project description here.."
                  defaultValue={row.Project_desc}
                  onChange={this.onChange}
                />
              </FormGroup>
              <FormGroup>
                <Button
                  onClick={this.onSubmitsEdit}
                  // onClick={() => this.handleEditProject(row)}
                  color="primary"
                  size="lg"
                  block
                >
                  Save Changes
                </Button>
              </FormGroup>
            </Form>
          </div>
        ))
    );
  }

  handleEditProject = row => {
    console.log("im here..in handleEditProject");

    this.setState({
      PID: row.PID,
      Project_Title: row.Project_Title,
      Project_desc: row.Project_desc,
      Teamsize: row.Teamsize,
      email: row.email
    });

    console.log("im here..in handleEditProject" + this.state.email);
  };

  render() {
    return <div>{this.getEdit()}</div>;
  }
}

//export default Createproject;
