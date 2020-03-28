const db = require("../server/db");
const {
  Question,
  User,
  Tag,
  UserQuestion,
  Like,
  ProposeQuestion
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
  },
  {
    name: "Single Number",
    description: "Given an array in which all elements appear twice except one (of them), return the one which appears only once.",
    difficulty: 1,
    link: "https://leetcode.com/problems/single-number/",
    ratedDifficulty: 1.0,
    tagId: 1
  },
  {
    name: "Find All Numbers Disappeared In Array",
    description: "Given an array that has some elements from 1 to n (where n is the length of the array), find the elements from 1 to n that it is missing. Ex. Given [1,2,2,4], return 3",
    difficulty: 1,
    link: "https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array/",
    ratedDifficulty: 1.0,
    tagId:1
  },
  {
    name: "Peak Index In Mountain Array",
    description: "Given a mountain array (i.e. an array that only increases on one side and only decreases on the other), find the peak index (index of the top of the mountain). See the problem for detailed info.",
    difficulty: 1,
    link: "https://leetcode.com/problems/peak-index-in-a-mountain-array/",
    ratedDifficulty: 1.0,
    tagId: 1
  },
  {
    name: "Monotonic Array",
    description: "Given an array, return whether or not its elements are increasing or decreasing. Note that [1,2,2,4] still counts as increasing.",
    difficulty: 1,
    link: "https://leetcode.com/problems/monotonic-array/",
    ratedDifficulty: 1.0,
    tagId: 1
  },
  {
    name: "Max Consecutive 1s",
    description: "Given an array of 1s and 0s, return the max length of consecutive 1s",
    difficulty: 1,
    link: "https://leetcode.com/problems/max-consecutive-ones/",
    ratedDifficulty: 1.0,
    tagId: 1
  },
  {
    name: "Minimum Absolute Difference",
    description: "Given an array of distinct integers, find and return all pairs of elements that have the minimum absolute difference.",
    difficulty: 2,
    link: "https://leetcode.com/problems/minimum-absolute-difference/",
    ratedDifficulty: 2.0,
    tagId: 1
  },
  {
    name: "Toeplitz Matrix",
    description: "Traverse a 2D matrix diagonally. A look at the problem should make it clear.",
    difficulty: 2,
    link: "https://leetcode.com/problems/toeplitz-matrix/",
    ratedDifficulty: 2.0,
    tagId: 1
  },
  {
    name: "Island Perimeter",
    description: "Find the ‘perimeter’ of ‘islands’ in a matrix. The problem description has a picture and a good explanation!",
    difficulty: 2,
    link: "https://leetcode.com/problems/island-perimeter/",
    ratedDifficulty: 2.0,
    tagId: 1
  },
  {
    name: "Partition Array Into Three Equal Sum Parts",
    description: "Given an array, return whether or not its possible to partition it into three non-empty, equal-sum parts.",
    difficulty: 2,
    link: "https://leetcode.com/problems/partition-array-into-three-parts-with-equal-sum/",
    ratedDifficulty: 2.0,
    tagId: 1
  },
  {
    name: "Find Pivot Index",
    description: "Given an array of integers, find an index at which all the sum of elements to the right of the index equals the sum of elements to the left of the index",
    difficulty: 2,
    link: "https://leetcode.com/problems/find-pivot-index/",
    ratedDifficulty: 2.0,
    tagId: 1
  },
  {
    name: "Plus One",
    description: "Given an array of integers representing a number, return an array with the digits of that number plus 1.",
    difficulty: 2,
    link: "https://leetcode.com/problems/plus-one/",
    ratedDifficulty: 2.0,
    tagId: 1
  },
  {
    name: "Count Negative Numbers In Sorted Matrix",
    description:"Given a matrix of integers with each row and column sorted in descending order, return the number of negative numbers in the matrix.",
    link: "https://leetcode.com/problems/count-negative-numbers-in-a-sorted-matrix/",
    difficulty: 2,
    ratedDifficulty: 2.0,
    tagId: 1
  },
  {
    name: "Count Numbers Smaller Than Current Number",
    description: "Given an array of numbers, return an array in which each element denotes the number of elements in the input array that are strictly smaller than the current element.",
    difficulty: 2,
    ratedDifficulty: 2.0,
    link: "https://leetcode.com/problems/how-many-numbers-are-smaller-than-the-current-number/",
    tagId: 1
  },
  {
    name: "Search In Rotated Sorted Array",
    difficulty: 3,
    ratedDifficulty: 3.0,
    description: "Given an array that’s been sorted in ascending order then rotated some amount and a target number, return the index of the target number in the array or -1 if the target is not present",
    link: "https://leetcode.com/problems/search-in-rotated-sorted-array/",
    tagId: 1
  },
  {
    name: "First and Last Position of Element In Sorted Array",
    description: "Given a sorted array and a target, find the target’s first and last index in the array. If it’s not found return [-1,-1]",
    link: "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/",
    difficulty: 3,
    ratedDifficulty: 3.0,
    tagId: 1
  },
  {
    name: "Spiral Matrix",
    description: "Given a 2D matrix, return an array that contains the elements of the matrix in a clockwise-outside-to-inside spiral order",
    link: "https://leetcode.com/problems/spiral-matrix/",
    difficulty: 3,
    ratedDifficulty: 3.0,
    tagId: 1
  },
  {
    name: "Maximum Subarray",
    description: "Given an array of integers, return the subarray with the maximum sum.",
    link: "https://leetcode.com/problems/maximum-subarray/",
    difficulty: 3,
    ratedDifficulty: 3.0,
    tagId: 1
  },
  {
    name: "Product Of Array Except Self",
    description: "Given an array of numbers, return an array of the product of all numbers in the array except the current element itself without using division.",
    link: "https://leetcode.com/problems/product-of-array-except-self/",
    difficulty: 3,
    ratedDifficulty: 3.0,
    tagId: 1
  },
  {
    name: "Interval List Intersections",
    description: "Given two arrays of intervals sorted by starting point, return an array of the intersections between the two intervals.",
    link: "https://leetcode.com/problems/interval-list-intersections/",
    difficulty: 3,
    ratedDifficulty: 3.0,
    tagId: 1
  },
  {
    name: "Find the Duplicate Number",
    description: "Given an array of numbers with elements of values 1 to n+1 (where n is the length of the array), return the duplicate element",
    link: "https://leetcode.com/problems/find-the-duplicate-number/",
    difficulty: 4,
    ratedDifficulty: 4.0,
    tagId: 1
  },
  {
    name: "Search a 2D Matrix",
    description: "Given a 2D matrix with sorted rows and sorted columns and a target number, return whether or not the matrix contains the target number.",
    link: "https://leetcode.com/problems/search-a-2d-matrix-ii/",
    difficulty: 4,
    ratedDifficulty: 4.0,
    tagId: 1
  },
  {
    name: "First Missing Positive",
    description: "Given an unsorted array of integers, find the first missing positive number in the array. 0 is NOT counted as a positive number.",
    link: "https://leetcode.com/problems/first-missing-positive",
    difficulty: 5,
    ratedDifficulty: 5.0,
    tagId: 1
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
    ranking: 13
  },
  {
    name: "Tree",
    ranking: 5
  },
  {
    name: "Depth-First Search",
    ranking: 6
  },
  {
    name: "Stack/Queue",
    ranking: 7
  },
  {
    name: "Breadth-First Search",
    ranking: 8
  },
  {
    name: "Recursion/Backtracking",
    ranking: 9
  },
  {
    name: "Dynamic Programming",
    ranking: 10
  },
  {
    name: "Heap/Priority Queue",
    ranking: 11
  },
  {
    name: "Graph",
    ranking: 12
  }
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

const propQuestBulk = [
  {
    name: "Spiral Matrix",
    description: "Create array of number outputs spiraling the given array",
    difficulty: 2,
    link: "https://leetcode.com/problems/spiral-matrix/",
    tagId: 1,
    userId: 1
  }
];

async function seed() {
  await db.sync({ force: true });

  await User.bulkCreate(userBulk);
  await Tag.bulkCreate(tagBulk);
  await Question.bulkCreate(questionBulk);
  await UserQuestion.bulkCreate(userQuestBulk);
  await Like.bulkCreate(likeBulk);
  await ProposeQuestion.bulkCreate(propQuestBulk);

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
