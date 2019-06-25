import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  //CardFooter,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from "reactstrap";
import { register } from "./UserFunctions";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      errors: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmits = this.onSubmits.bind(this);
    //this.submitData = this.submitData.bind(this);
    this.onValidate = this.onValidate.bind(this);
  }

  onValidate(e) {
    // true means invalid, so our conditions got reversed
    if (
      this.state.first_name.length === 0 ||
      this.state.last_name.length === 0 ||
      this.state.email.length === 0 ||
      this.state.password.length === 0
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

      const user = {
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        email: this.state.email,
        password: this.state.password
      };

      register(user).then(res => {
        if (res) {
          this.props.history.push(`/login`);
        } else {
          this.setState({
            errors: "User already exists"
          });
        }
      });
    } else {
      this.setState({
        errors: "Enter all details"
      });
    }
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form>
                      <h1>Register</h1>
                      <p className="text-muted">Create your account</p>
                      <p className="text-muted">
                        <font style={{ color: "red" }}>
                          {this.state.errors}
                        </font>
                      </p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>First Name</InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="text"
                          name="first_name"
                          placeholder="First Name"
                          value={this.state.first_name}
                          onChange={this.onChange}
                        />
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>Last Name</InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="text"
                          name="last_name"
                          placeholder="Last Name"
                          value={this.state.last_name}
                          onChange={this.onChange}
                        />
                      </InputGroup>

                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            Email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="text"
                          name="email"
                          placeholder="Email"
                          value={this.state.email}
                          onChange={this.onChange}
                        />
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>Password&nbsp;&nbsp;</InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="password"
                          name="password"
                          placeholder="Password"
                          value={this.state.password}
                          onChange={this.onChange}
                        />
                      </InputGroup>

                      <Button onClick={this.onSubmits} color="success" block>
                        Create Account
                      </Button>
                    </Form>
                  </CardBody>
                </Card>
                <Card
                  className="text-white bg-primary py-5 d-md-down-none"
                  style={{ width: "44%" }}
                >
                  <CardBody className="text-center">
                    <div>
                      <h2>Login In</h2>
                      <p>
                        Are you a existing user ? <br />
                        Login here!
                      </p>
                      <Link to="/login">
                        <Button
                          color="primary"
                          className="mt-3"
                          active
                          tabIndex={-1}
                        >
                          Login here!
                        </Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Register;
