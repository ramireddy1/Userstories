import React, { Component } from "react";
import Navbar from "./Navbar";

class Landing extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <div className="container">
          <div className="jumbotron mt-5">
            <div className="col-sm-8 mx-auto">
              <h1 className="text-center">User Story Tool</h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
