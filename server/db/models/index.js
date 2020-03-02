const Problem = require("./Problem");
const Tag = require("./Tag");
const User = require("./user")

Problem.belongsToMany(Tag);
Tag.belongsToMany(Problem);

// join table to see which problems the user has done and liked
User.hasMany(Problem);
Problem.belongsToMany(User);

module.exports = {
	Problem,
	Tag,
	User
}