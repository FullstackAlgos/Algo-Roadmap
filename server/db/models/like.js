const Sequelize = require("sequelize");
const db = require("../db");

const Like = db.define("like", {
  status: {
    type: Sequelize.STRING,
    validate: {
      isIn: [["like", "dislike"]]
    }
  }
});

module.exports = Like;
