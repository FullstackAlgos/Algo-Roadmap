const Question = require("./Question");
const Tag = require("./Tag");
const User = require("./user");
const QuestionTag = require("./QuestionTag");
const UserQuestion = require("./userQuestion");

Question.belongsToMany(Tag, { through: QuestionTag });
Tag.belongsToMany(Question, { through: QuestionTag });

// join table to see which question the user has done and liked
User.belongsToMany(Question, { through: UserQuestion });
Question.belongsToMany(User, { through: UserQuestion });

module.exports = {
  Question,
  Tag,
  User,
  QuestionTag,
  UserQuestion
};
