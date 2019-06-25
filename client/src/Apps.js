import React, { Component } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
// import { renderRoutes } from 'react-router-config';
import "./Apps.scss";
import LoadingDots from "./containers/Loadingdots";
import "./styles/client.css";
//import Landing from "./components/Landing";

const loading = () => (
  <div className="center-div">
    <h1 style={{ alignSelf: "flex-end" }}>Loading</h1>
    <LoadingDots />
  </div>
);

// Containers
const DefaultLayout = React.lazy(() =>
  import("./containers/DefaultLayout/DefaultLayout")
);

// Pages
const Login = React.lazy(() => import("./components/Login"));
const Register = React.lazy(() => import("./components/Register"));
const Landing = React.lazy(() => import("./components/Landing"));
//const Page404 = React.lazy(() => import("./views/Pages/Page404"));
//const Page500 = React.lazy(() => import("./views/Pages/Page500"));

class Apps extends Component {
  render() {
    return (
      <HashRouter>
        <React.Suspense fallback={loading()}>
          <Switch>
            <Route
              exact
              path="/"
              name="Home"
              render={props => <Landing {...props} />}
            />
            <Route
              exact
              path="/login"
              name="Login Page"
              render={props => <Login {...props} />}
            />
            <Route
              exact
              path="/register"
              name="Register Page"
              render={props => <Register {...props} />}
            />
            <Route
              path="/dashboard"
              name="Dashboard"
              render={props => <DefaultLayout {...props} />}
            />
            <Route
              path="/base/allprojects"
              name="All projects"
              render={props => <DefaultLayout {...props} />}
            />
            <Route
              path="/base/createproject"
              name="Create Project"
              render={props => <DefaultLayout {...props} />}
            />
            <Route
              path="/base/editproject"
              name="Edit Project"
              render={props => <DefaultLayout {...props} />}
            />
            <Route
              path="/base/viewproject"
              name="View Project"
              render={props => <DefaultLayout {...props} />}
            />
            <Route
              path="/base/substories"
              name="Sub stories"
              render={props => <DefaultLayout {...props} />}
            />
          </Switch>
        </React.Suspense>
      </HashRouter>
    );
  }
}

export default Apps;
