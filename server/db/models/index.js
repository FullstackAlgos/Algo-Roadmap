const Problem = require("./Problem");
const Tag = require("./Tag");
const User = require("./user");

Problem.belongsToMany(Tag, { through: "ProblemTag" });
Tag.belongsToMany(Problem, { through: "ProblemTag" });

// join table to see which problems the user has done and liked
User.hasMany(Problem);
Problem.belongsToMany(User, { through: "UserProblem" });

module.exports = {
  Problem,
  Tag,
  User
};