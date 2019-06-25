var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var app = express();
var port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

var Users = require("./routes/Users");
var Projects = require("./routes/Projects");
var UserStories = require("./routes/UserStories");

app.use("/users", Users);
app.use("/projects", Projects);
app.use("/userstories", UserStories);

app.listen(port, () => {
  console.log("Server is running on port: " + port);
});
