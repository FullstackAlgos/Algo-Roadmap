const Sequelize = require("sequelize");
const db = require("../db");

const Question = db.define("question", {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
  },
  difficulty: {
    type: Sequelize.INTEGER,
    allowNull: false,
    min: 1,
    max: 5,
  },
  link: {
    type: Sequelize.STRING,
    unique: true,
  },
});

module.exports = Question;
