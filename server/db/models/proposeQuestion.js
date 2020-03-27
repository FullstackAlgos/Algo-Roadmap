const Sequelize = require("sequelize");
const db = require("../db");

const ProposeQuestion = db.define("proposeQuestion", {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT
  },
  difficulty: {
    type: Sequelize.INTEGER,
    allowNull: false,
    min: 1,
    max: 5
  },
  link: {
    type: Sequelize.STRING
  },
  ratedDifficulty: {
    type: Sequelize.FLOAT,
    min: 1.0,
    max: 5.0
  }
});

ProposeQuestion.beforeCreate(question => {
  question.ratedDifficulty = question.difficulty;
});

module.exports = ProposeQuestion;
