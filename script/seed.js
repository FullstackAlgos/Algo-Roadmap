const db = require("../server/db");
const {
  Problem,
  User,
  Tag,
  ProblemTag,
  UserProblem
} = require("../server/db/models");

const userBulk = [
  { email: "steve@a.com", name: "Steve", password: "123" },
  { email: "peter@a.com", name: "Peter", password: "123" }
];

const problemBulk = [
  {
    name: "Steps To Reduce A Number To 0",
    description:
      "Given a number n, divide n by 2 if its even and subtract one from n if its odd. Return the number of those operations needed to reduce n to 0.",
    difficulty: 1,
    link:
      "https://leetcode.com/problems/number-of-steps-to-reduce-a-number-to-zero/",
    likes: 0,
    dislikes: 0,
    ratedDifficulty: 1.0
  },
  {
    name: "Find The Majority Element",
    description:
      "Given an array with n elements, find the element that appears n/2 times or more. It's guaranteed that there will be an element that appears n/2 times or more.",
    difficulty: 1,
    link: "https://leetcode.com/problems/majority-element/",
    likes: 0,
    dislikes: 0,
    ratedDifficulty: 1.0
  },
  {
    name: "Same Tree",
    description:
      "Given two binary trees, write a function to check if they are the same or not. Two binary trees are considered the same if they are structurally identical and the nodes have the same value.",
    difficulty: 1,
    link: "https://leetcode.com/problems/same-tree/",
    likes: 0,
    dislikes: 0,
    ratedDifficulty: 1.0
  }
];

const tagBulk = [
  {
    name: "Array"
  },
  {
    name: "HashMap"
  },
  {
    name: "String"
  },
  {
    name: "Linked List"
  },
  {
    name: "Bit Manipulation"
  },
  {
    name: "Tree"
  }
];

const probTagBulk = [
  { problemId: 1, tagId: 5 },
  { problemId: 2, tagId: 1 },
  { problemId: 3, tagId: 6 }
];

const userProbBulk = [
  { userId: 1, problemId: 1 },
  { userId: 1, problemId: 2 },
  { userId: 2, problemId: 3 }
];

async function seed() {
  await db.sync({ force: true });

  await User.bulkCreate(userBulk);
  await Problem.bulkCreate(problemBulk);
  await Tag.bulkCreate(tagBulk);
  await ProblemTag.bulkCreate(probTagBulk);
  await UserProblem.bulkCreate(userProbBulk);

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
