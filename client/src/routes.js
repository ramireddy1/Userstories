import React from "react";
//import Allprojects from "./views/Base/projectinfo/allprojects";
//import Createproject from "./views/Base/projectinfo/createproject";

const Allprojects = React.lazy(() =>
  import("./views/Base/projectinfo/Allprojects")
);
const Createproject = React.lazy(() =>
  import("./views/Base/projectinfo/Createproject")
);

const Editproject = React.lazy(() =>
  import("./views/Base/projectinfo/Editproject")
);

const Dashboard = React.lazy(() => import("./views/Dashboard/Dashboard"));

const Viewproject = React.lazy(() =>
  import("./views/Base/projectinfo/viewproject")
);

const Substories = React.lazy(() =>
  import("./views/Base/projectinfo/substories")
);

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },

  { path: "/base", exact: true, name: "Projects", component: Allprojects },
  { path: "/base/allprojects", name: "Allprojects", component: Allprojects },

  {
    path: "/base/createproject",
    name: "Createproject",
    component: Createproject
  },
  {
    path: "/base/editproject",
    name: "Editproject",
    component: Editproject
  },

  {
    path: "/base/viewproject",
    name: "Viewproject",
    component: Viewproject
  },

  {
    path: "/base/substories",
    name: "Substories",
    component: Substories
  }
];

export default routes;
