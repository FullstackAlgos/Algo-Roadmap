const Sequelize = require("sequelize");
const db = require("../db");

const Question = db.define("question", {
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
  likes: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  dislikes: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  ratedDifficulty: {
    type: Sequelize.FLOAT,
    min: 1.0,
    max: 5.0
  }
});

Question.beforeCreate(question => {
  question.ratedDifficulty = question.difficulty;
});

module.exports = Question;
