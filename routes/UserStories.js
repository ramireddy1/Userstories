const express = require("express");
const userstories = express.Router();
const cors = require("cors");
//const jwt = require("jsonwebtoken");
//const bcrypt = require("bcrypt");

const UserStory = require("../models/UserStory");
userstories.use(cors());

//process.env.SECRET_KEY = "secret";

userstories.post("/base/createus", (req, res) => {
  const today = new Date().toDateString();
  const usData = {
    usID: req.body.usID,
    asA: req.body.asA,
    iWant: req.body.iWant,
    soThat: req.body.soThat,
    usDesc: req.body.usDesc,
    //usFlag: req.body.usFlag,
    priority: req.body.priority,
    createdBy: req.body.createdBy,
    usFlag: req.body.usFlag,
    projectID: req.body.projectID,
    //createdOn: today,
    //projectID: req.body.projectID,
    parentID: req.body.parentID
  };
  //console.log("I entered here");
  UserStory.findOne({
    where: {
      usID: req.body.usID
    }
  })
    .then(userstory => {
      if (!userstory) {
        //bcrypt.hash(req.body.Project_Title, 10, (err, hash) => {
        //projectData.Project_Title = hash;
        UserStory.create(usData)
          .then(userstory => {
            res.json({ status: userstory.usID + " registered" });
          })
          .catch(err => {
            res.send("error: " + err);
          });
        //});
      } else {
        res.json({ error: "UserID already exists" });
      }
    })
    .catch(err => {
      res.send("error is in this file: " + err);
    });
});

//End of post of userstories

userstories.put("/base/editus", (req, res) => {
  let updateValues = {
    asA: req.body.asA,
    iWant: req.body.iWant,
    soThat: req.body.soThat,
    usDesc: req.body.usDesc,
    priority: req.body.priority
  };
  UserStory.update(updateValues, { where: { usID: req.body.usID } }).then(
    result => {
      // here your result is simply an array with number of affected rows
      console.log(result);
      res.json(result);
      // [ 1 ]
    }
  );
});

userstories.get("/base/viewproject", (req, res) => {
  UserStory.findAll()
    .then(userstory => res.json(userstory))
    .catch(err => {
      res.send("error: " + err);
    });
});

//get parent info
userstories.get("/base/getparentinfo", (req, res) => {
  UserStory.findOne({
    where: {
      usID: req.body.usID
    }
  })
    .then(userstory => res.json(userstory))
    .catch(err => {
      res.send("error: " + err);
    });
});

//Deleting userstory
userstories.post("/base/deleteus", (req, res) => {
  UserStory.destroy({ where: { usID: req.body.usID } }).then(result => {
    // here your result is simply an array with number of affected rows
    console.log(result);
    res.json(result);
    // [ 1 ]
  });
});

module.exports = userstories;
