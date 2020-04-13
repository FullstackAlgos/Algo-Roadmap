const Question = require("./Question");
const Tag = require("./Tag");
const User = require("./user");
const UserQuestion = require("./userQuestion");
const Like = require("./like");
const ProposeQuestion = require("./proposeQuestion");

Question.belongsTo(Tag);
ProposeQuestion.belongsTo(Tag);
ProposeQuestion.belongsTo(User);

User.belongsToMany(Question, { through: UserQuestion });
Question.belongsToMany(User, { through: UserQuestion });

User.hasMany(Like);
Question.hasMany(Like);
Like.belongsTo(User);
Like.belongsTo(Question);

module.exports = {
  Question,
  Tag,
  User,
  UserQuestion,
  Like,
  ProposeQuestion,
};
