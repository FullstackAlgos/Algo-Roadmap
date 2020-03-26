const db = require("../server/db");
const {
  Question,
  User,
  Tag,
  QuestionTag,
  UserQuestion,
  Like
} = require("../server/db/models");

const userBulk = [
  { email: "james@a.com", name: "James", isAdmin: true, password: "123" },
  { email: "jasen@a.com", name: "Jasen", isAdmin: true, password: "123" },
  { email: "peter@a.com", name: "Peter", password: "123" }
];

const questionBulk = [
  {
    name: "Steps To Reduce A Number To 0",
    description:
      "Given a number n, divide n by 2 if its even and subtract one from n if its odd. Return the number of those operations needed to reduce n to 0.",
    difficulty: 1,
    link:
      "https://leetcode.com/problems/number-of-steps-to-reduce-a-number-to-zero/",
    ratedDifficulty: 1.0,
    tagId: 5
  },
  {
    name: "Find The Majority Element",
    description:
      "Given an array with n elements, find the element that appears n/2 times or more. It's guaranteed that there will be an element that appears n/2 times or more.",
    difficulty: 1,
    link: "https://leetcode.com/problems/majority-element/",
    ratedDifficulty: 1.0,
    tagId: 1
  },
  {
    name: "Same Tree",
    description:
      "Given two binary trees, write a function to check if they are the same or not. Two binary trees are considered the same if they are structurally identical and the nodes have the same value.",
    difficulty: 1,
    link: "https://leetcode.com/problems/same-tree/",
    ratedDifficulty: 1.0,
    tagId: 6
  },
  {
    name: "Two Sum",
    description:
      "Given an array of integers and a target number, return the indices of two elements in the array that sum up to the target number. This problem is one of, if not the most, commonly asked.",
    difficulty: 1,
    link: "https://leetcode.com/problems/two-sum/",
    ratedDifficulty: 1.0,
    tagId: 2
  }
];

const tagBulk = [
  {
    name: "Array",
    ranking: 1
  },
  {
    name: "HashMap",
    ranking: 3
  },
  {
    name: "String",
    ranking: 2
  },
  {
    name: "Linked List",
    ranking: 4
  },
  {
    name: "Bit Manipulation",
    ranking: 10
  },
  {
    name: "Tree",
    ranking: 5
  }
];

const questTagBulk = [
  { questionId: 1, tagId: 5 },
  { questionId: 2, tagId: 1 },
  { questionId: 3, tagId: 6 },
  { questionId: 4, tagId: 2 }
];

const likeBulk = [
  { status: "like", userId: 1, questionId: 1 },
  { status: "dislike", userId: 1, questionId: 2 },
  { status: "like", userId: 2, questionId: 3 },
  { status: "like", userId: 3, questionId: 4 }
];

const userQuestBulk = [
  { userId: 1, questionId: 1 },
  { userId: 1, questionId: 2 },
  { userId: 2, questionId: 3 },
  { userId: 3, questionId: 4 }
];

async function seed() {
  await db.sync({ force: true });

  await User.bulkCreate(userBulk);
  await Tag.bulkCreate(tagBulk);
  await Question.bulkCreate(questionBulk);
  // await QuestionTag.bulkCreate(questTagBulk);
  await UserQuestion.bulkCreate(userQuestBulk);
  await Like.bulkCreate(likeBulk);

  console.log(`seeded successfully`);
}

async function runSeed() {
  console.log("seeding...");

  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

if (module === require.main) runSeed();
