const Sequelize = require("sequelize");
const db = require("../db");

const Problem = db.define("problem", {
	description: {
		type: Sequelize.TEXT
	},
	difficulty: {
		type: Sequelize.INTEGER,
		allowNull: false,
		min: 0,
		max: 10
	},
	link: {
		type: Sequelize.STRING
	},
	likes: {
		type: Sequelize.INTEGER,
		allowNull: false,
		defaultValue: 0
	},
	dislikes: {
		type: Sequelize.INTEGER,
		allowNull: false,
		defaultValue: 0
	},
	ratedDifficulty: {
		type: Sequelize.FLOAT,
		min: 0.0,
		max: 10.0
	}
});

Problem.beforeCreate((problem, options) => {
	problem.ratedDifficulty = problem.difficulty
})

module.exports = Problem;