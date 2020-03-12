const db = require("../server/db");
const { Problem, User, Tag } = require("../server/db/models");

const userBulk = [
  { email: "steve@a.com", password: 123 },
  { email: "peter@a.com", password: 123 }
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
  }
];

async function seed() {
  await db.sync({ force: true });

  await User.bulkCreate(userBulk);
  await Problem.bulkCreate(problemBulk);
  await Tag.bulkCreate(tagBulk);

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
