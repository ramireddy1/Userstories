const Sequelize = require("sequelize");
const db = require("../database/db");

module.exports = db.sequelize.define(
  "project",
  {
    sno: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    PID: {
      type: Sequelize.STRING
    },
    Project_Title: {
      type: Sequelize.STRING
    },
    Project_desc: {
      type: Sequelize.STRING
    },
    Created: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    Teamsize: {
      type: Sequelize.INTEGER
    },
    email: {
      type: Sequelize.STRING
    },
    shared: {
      type: Sequelize.STRING
    }
  },
  {
    timestamps: false
  }
);
