const userBulk = [
  { email: "james@algo.com", name: "James", isAdmin: true, password: "123" },
  { email: "jasen@algo.com", name: "Jasen", password: "123" },
  { email: "peter@a.com", name: "Peter", password: "123" },
];

const likeBulk = [
  { status: "like", userId: 1, questionId: 1 },
  { status: "dislike", userId: 1, questionId: 2 },
  { status: "like", userId: 2, questionId: 3 },
  { status: "like", userId: 3, questionId: 4 },
];

module.exports = { userBulk, likeBulk };
