const express = require("express");
const projects = express.Router();
const cors = require("cors");
//const jwt = require("jsonwebtoken");
//const bcrypt = require("bcrypt");

const Project = require("../models/Project");
projects.use(cors());

//process.env.SECRET_KEY = "secret";

projects.post("/base/createproject", (req, res) => {
  const today = new Date().toDateString();
  const projectData = {
    // sno: req.body.sno,
    PID: req.body.PID,
    Project_Title: req.body.Project_Title,
    Project_desc: req.body.Project_desc,
    Created: today,
    Teamsize: req.body.Teamsize,
    email: req.body.email,
    shared: req.body.shared
  };

  Project.findOne({
    where: {
      PID: req.body.PID
    }
  })
    .then(project => {
      if (!project) {
        //bcrypt.hash(req.body.Project_Title, 10, (err, hash) => {
        //projectData.Project_Title = hash;
        Project.create(projectData)
          .then(project => {
            res.json({ status: project.PID + " registered" });
          })
          .catch(err => {
            res.send("error: " + err);
          });
        //});
      } else {
        res.json({ error: "Project already exists" });
      }
    })
    .catch(err => {
      res.send("error: " + err);
    });
});

projects.get("/base/allprojects", (req, res) => {
  Project.findAll()
    .then(project => res.json(project))
    .catch(err => {
      res.send("error: " + err);
    });
});

projects.put("/base/editproject", (req, res) => {
  let updateValues = {
    //PID: req.body.PID,
    Project_Title: req.body.Project_Title,
    Project_desc: req.body.Project_desc,
    //Created: today,
    Teamsize: req.body.Teamsize,
    //email: req.body.email,
    shared: req.body.shared
  };
  Project.update(updateValues, { where: { PID: req.body.PID } }).then(
    result => {
      // here your result is simply an array with number of affected rows
      console.log(result);
      res.json(result);
      // [ 1 ]
    }
  );
});

module.exports = projects;
