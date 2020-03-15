const Sequelize = require("sequelize");
const db = require("../db");

const Problem = db.define("problem", {
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

Problem.beforeCreate((problem, options) => {
  problem.ratedDifficulty = problem.difficulty;
});

module.exports = Problem;
