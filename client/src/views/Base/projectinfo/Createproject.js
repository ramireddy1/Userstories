import React from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { createproject } from "../../../components/UserFunctions";
import jwt_decode from "jwt-decode";

export default class Createproject extends React.Component {
  constructor() {
    super();
    this.state = {
      //sno: "",
      PID: "",
      Project_Title: "",
      Project_desc: "",
      Teamsize: "",
      email: "",
      shared: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmits = this.onSubmits.bind(this);
    //this.submitData = this.submitData.bind(this);
    this.onValidate = this.onValidate.bind(this);
  }
  componentDidMount() {
    const token = localStorage.usertoken;
    const decoded = jwt_decode(token);
    this.setState({
      //first_name: decoded.first_name,
      //last_name: decoded.last_name,
      email: decoded.email
    });
  }

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
  onSubmits(e) {
    if (!this.onValidate()) {
      e.preventDefault();

      const oneproject = {
        // sno: this.state.sno,
        PID: this.state.PID,
        Project_Title: this.state.Project_Title,
        Project_desc: this.state.Project_desc,
        Teamsize: this.state.Teamsize,
        email: this.state.email,
        shared: this.state.shared
      };

      createproject(oneproject).then(res => {
        this.props.history.push(`/base/allprojects`);
      });
    } else {
      this.setState({
        errors: "Enter all details"
      });
    }
  }

  render() {
    return (
      <Form style={{ width: "60%" }}>
        <FormGroup>
          <h1>Create a project</h1>
          <p className="text-muted">
            <font style={{ color: "red" }}>{this.state.errors}</font>
          </p>
          <Label for="Project Title">Project Title</Label>
          <Input
            type="text"
            name="Project_Title"
            id="project_title"
            placeholder="Project Title"
            value={this.state.Project_Title}
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
            value={this.state.PID}
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
            value={this.state.Teamsize}
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
            value={this.state.shared}
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
            value={this.state.Project_desc}
            onChange={this.onChange}
          />
        </FormGroup>
        <FormGroup>
          <Button onClick={this.onSubmits} color="primary" size="lg" block>
            Create project
          </Button>
        </FormGroup>
      </Form>
    );
  }
}

//export default Createproject;
