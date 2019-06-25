const Sequelize = require("sequelize");
const db = require("../database/db");

module.exports = db.sequelize.define(
  "userstories",
  {
    usID: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    asA: {
      type: Sequelize.STRING
    },
    iWant: {
      type: Sequelize.STRING
    },
    soThat: {
      type: Sequelize.STRING
    },
    usDesc: {
      type: Sequelize.STRING
    },
    usFlag: {
      type: Sequelize.INTEGER
    },
    priority: {
      type: Sequelize.STRING
    },
    createdBy: {
      type: Sequelize.STRING
    },
    createdOn: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    projectID: {
      type: Sequelize.STRING
    },
    parentID: {
      type: Sequelize.STRING
    }
  },
  {
    timestamps: false
  }
);
