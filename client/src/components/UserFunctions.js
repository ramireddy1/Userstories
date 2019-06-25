import axios from "axios";
//import { privateEncrypt } from "crypto";

export const register = newUser => {
  return axios
    .post("users/register", {
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email,
      password: newUser.password
    })
    .then(res => {
      console.log("Registered");
    });
};

export const login = user => {
  return axios
    .post("users/login", {
      email: user.email,
      password: user.password
    })
    .then(res => {
      localStorage.setItem("usertoken", res.data);
      return res.data;
    })
    .catch(err => {
      console.log(err);
    });
};

export const createproject = project => {
  return axios
    .post("projects/base/createproject", {
      //sno: project.sno,
      PID: project.PID,
      Project_Title: project.Project_Title,
      Project_desc: project.Project_desc,
      Teamsize: project.Teamsize,
      email: project.email,
      shared: project.shared
    })
    .then(res => {
      console.log("Created a project");
    });
};

//Editing Project
export const editProject = project => {
  return axios
    .put("projects/base/editproject", {
      //sno: project.sno,
      PID: project.PID,
      Project_Title: project.Project_Title,
      Project_desc: project.Project_desc,
      Teamsize: project.Teamsize,
      //email: project.email,
      shared: project.shared
      //createdBy: "ramis"
    })
    .then(res => {
      console.log("PROJECT SHARING is");
      console.log("PROJECT DESC1 is" + project.PID);
    })
    .catch(err => {
      console.log("The PROJECT123 edit error is " + err);
    });
};

export const createus = userstory => {
  return axios
    .post("userstories/base/createus", {
      //sno: project.sno,
      createdBy: userstory.email,
      usID: userstory.usID,
      asA: userstory.asA,
      iWant: userstory.iWant,
      soThat: userstory.soThat,
      usDesc: userstory.usDesc,
      priority: userstory.priority,
      usFlag: userstory.usFlag,
      projectID: userstory.projectID,
      parentID: userstory.parentID
    })
    .then(res => {
      console.log("Priority is" + userstory.priority);
      console.log("email is " + userstory.email);
      console.log("Created a user story");
    })
    .catch(err => {
      console.log("The createus error is" + err);
    });
};

//Editing user story
export const editus = userstory => {
  return axios
    .put("userstories/base/editus", {
      //sno: project.sno,
      usID: userstory.usID,
      asA: userstory.asA,
      iWant: userstory.iWant,
      soThat: userstory.soThat,
      usDesc: userstory.usDesc,
      priority: userstory.priority
      //createdBy: "ramis"
    })
    .then(res => {
      console.log("usstory is" + userstory.iWant);
      console.log("usstory is" + userstory.priority);
      console.log("usstory is" + userstory.usID);
      console.log("User Story Updated");
    })
    .catch(err => {
      console.log("The editus error is" + err);
    });
};

//Deleting user story
export const deleteus = userstory => {
  return axios
    .post("userstories/base/deleteus", {
      //sno: project.sno,
      usID: userstory.usID,
      asA: userstory.asA,
      iWant: userstory.iWant,
      soThat: userstory.soThat,
      usDesc: userstory.usDesc,
      priority: userstory.priority

      //createdBy: "ramis"
    })
    .then(res => {
      //console.log("usstory is" + userstory.iWant);
      //console.log("usstory is" + userstory.priority);
      console.log("usstory is" + userstory.usID);
      console.log("User Story Deleted");
    })
    .catch(err => {
      //console.log("usstory is" + userstory.usID);
      console.log("The editus error is" + err);
    });
};

export const parentinfo = userstory => {
  return axios
    .get("/userstories/base/getparentinfo", {
      usID: userstory.usID
    })
    .then(console.log("it is called"))
    .catch(error => {
      console.log("your error is" + error);
    });
};

/** 
export const allprojects = project => {
  return (
    axios
      .get("projects/base/allprojects")
      
      .then(res => {
        localStorage.setItem("usertokens", res.data);
        return res.data;
        
      })
      .catch(error => {
        console.log(error);
      })
  );
};

*/
