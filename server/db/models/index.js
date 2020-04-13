const Question = require("./Question");
const Tag = require("./Tag");
const User = require("./user");
const Like = require("./like");
const ProposeQuestion = require("./proposeQuestion");

Question.belongsTo(Tag);
ProposeQuestion.belongsTo(Tag);
ProposeQuestion.belongsTo(User);

User.hasMany(Like);
Question.hasMany(Like);
Like.belongsTo(User);
Like.belongsTo(Question);

module.exports = {
  Question,
  Tag,
  User,
  Like,
  ProposeQuestion,
};
