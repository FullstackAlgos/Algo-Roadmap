const userBulk = [
  { email: "james@a.com", name: "James", isAdmin: true, password: "123" },
  { email: "jasen@a.com", name: "Jasen", isAdmin: true, password: "123" },
  { email: "peter@a.com", name: "Peter", password: "123" },
];

const likeBulk = [
  { status: "like", userId: 1, questionId: 1 },
  { status: "dislike", userId: 1, questionId: 2 },
  { status: "like", userId: 2, questionId: 3 },
  { status: "like", userId: 3, questionId: 4 },
];

const userQuestBulk = [
  { userId: 1, questionId: 1 },
  { userId: 1, questionId: 2 },
  { userId: 2, questionId: 3 },
  { userId: 3, questionId: 4 },
];

const propQuestBulk = [
  {
    name: "Spiral Matrix",
    description:
      "Given a matrix of m x n elements (m rows, n columns), return all elements of the matrix in spiral order.",
    difficulty: 2,
    link: "https://leetcode.com/problems/spiral-matrix/",
    tagId: 1,
    userId: 1,
  },
];

module.exports = { userBulk, likeBulk, userQuestBulk, propQuestBulk };
