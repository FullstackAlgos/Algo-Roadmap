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
    link: "https://leetcode.com/problems/number-of-steps-to-reduce-a-number-to-zero/",
    tagId: 5
  },
  {
    name: "Find The Majority Element",
    description:
      "Given an array with n elements, find the element that appears n/2 times or more. It's guaranteed that there will be an element that appears n/2 times or more.",
    difficulty: 1,
    link: "https://leetcode.com/problems/majority-element/",
    tagId: 1
  },
  {
    name: "Same Tree",
    description:
      "Given two binary trees, write a function to check if they are the same or not. Two binary trees are considered the same if they are structurally identical and the nodes have the same value.",
    difficulty: 1,
    link: "https://leetcode.com/problems/same-tree/",
    tagId: 6
  },
  {
    name: "Two Sum",
    description: "Given an array of integers and a target number, return the indices of two elements in the array that sum up to the target number. This problem is one of, if not the most, commonly asked.",
    difficulty: 1,
    link: "https://leetcode.com/problems/two-sum/",
    tagId: 2
  },
  {
    name: "Single Number",
    description: "Given an array in which all elements appear twice except one (of them), return the one which appears only once.",
    difficulty: 1,
    link: "https://leetcode.com/problems/single-number/",
    tagId: 1
  },
  {
    name: "Find All Numbers Disappeared In Array",
    description: "Given an array that has some elements from 1 to n (where n is the length of the array), find the elements from 1 to n that it is missing. Ex. Given [1,2,2,4], return 3",
    difficulty: 1,
    link: "https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array/",
    tagId:1
  },
  {
    name: "Peak Index In Mountain Array",
    description: "Given a mountain array (i.e. an array that only increases on one side and only decreases on the other), find the peak index (index of the top of the mountain). See the problem for detailed info.",
    difficulty: 1,
    link: "https://leetcode.com/problems/peak-index-in-a-mountain-array/",
    tagId: 1
  },
  {
    name: "Monotonic Array",
    description: "Given an array, return whether or not its elements are increasing or decreasing. Note that [1,2,2,4] still counts as increasing.",
    difficulty: 1,
    link: "https://leetcode.com/problems/monotonic-array/",
    tagId: 1
  },
  {
    name: "Max Consecutive 1s",
    description: "Given an array of 1s and 0s, return the max length of consecutive 1s",
    difficulty: 1,
    link: "https://leetcode.com/problems/max-consecutive-ones/",
    tagId: 1
  },
  {
    name: "Minimum Absolute Difference",
    description: "Given an array of distinct integers, find and return all pairs of elements that have the minimum absolute difference.",
    difficulty: 2,
    link: "https://leetcode.com/problems/minimum-absolute-difference/",
    tagId: 1
  },
  {
    name: "Toeplitz Matrix",
    description: "Traverse a 2D matrix diagonally. A look at the problem should make it clear.",
    difficulty: 2,
    link: "https://leetcode.com/problems/toeplitz-matrix/",
    tagId: 1
  },
  {
    name: "Island Perimeter",
    description: "Find the ‘perimeter’ of ‘islands’ in a matrix. The problem description has a picture and a good explanation!",
    difficulty: 2,
    link: "https://leetcode.com/problems/island-perimeter/",
    tagId: 1
  },
  {
    name: "Partition Array Into Three Equal Sum Parts",
    description: "Given an array, return whether or not its possible to partition it into three non-empty, equal-sum parts.",
    difficulty: 2,
    link: "https://leetcode.com/problems/partition-array-into-three-parts-with-equal-sum/",
    tagId: 1
  },
  {
    name: "Find Pivot Index",
    description: "Given an array of integers, find an index at which all the sum of elements to the right of the index equals the sum of elements to the left of the index",
    difficulty: 2,
    link: "https://leetcode.com/problems/find-pivot-index/",
    tagId: 1
  },
  {
    name: "Plus One",
    description: "Given an array of integers representing a number, return an array with the digits of that number plus 1.",
    difficulty: 2,
    link: "https://leetcode.com/problems/plus-one/",
    tagId: 1
  },
  {
    name: "Count Negative Numbers In Sorted Matrix",
    description:"Given a matrix of integers with each row and column sorted in descending order, return the number of negative numbers in the matrix.",
    link: "https://leetcode.com/problems/count-negative-numbers-in-a-sorted-matrix/",
    difficulty: 2,
    tagId: 1
  },
  {
    name: "Count Numbers Smaller Than Current Number",
    description: "Given an array of numbers, return an array in which each element denotes the number of elements in the input array that are strictly smaller than the current element.",
    difficulty: 2,
    link: "https://leetcode.com/problems/how-many-numbers-are-smaller-than-the-current-number/",
    tagId: 1
  },
  {
    name: "Search In Rotated Sorted Array",
    difficulty: 3,
    description: "Given an array that’s been sorted in ascending order then rotated some amount and a target number, return the index of the target number in the array or -1 if the target is not present",
    link: "https://leetcode.com/problems/search-in-rotated-sorted-array/",
    tagId: 1
  },
  {
    name: "First and Last Position of Element In Sorted Array",
    description: "Given a sorted array and a target, find the target’s first and last index in the array. If it’s not found return [-1,-1]",
    link: "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/",
    difficulty: 3,
    tagId: 1
  },
  {
    name: "Spiral Matrix",
    description: "Given a 2D matrix, return an array that contains the elements of the matrix in a clockwise-outside-to-inside spiral order",
    link: "https://leetcode.com/problems/spiral-matrix/",
    difficulty: 3,
    tagId: 1
  },
  {
    name: "Maximum Subarray",
    description: "Given an array of integers, return the subarray with the maximum sum.",
    link: "https://leetcode.com/problems/maximum-subarray/",
    difficulty: 3,
    tagId: 1
  },
  {
    name: "Product Of Array Except Self",
    description: "Given an array of numbers, return an array of the product of all numbers in the array except the current element itself without using division.",
    link: "https://leetcode.com/problems/product-of-array-except-self/",
    difficulty: 3,
    tagId: 1
  },
  {
    name: "Interval List Intersections",
    description: "Given two arrays of intervals sorted by starting point, return an array of the intersections between the two intervals.",
    link: "https://leetcode.com/problems/interval-list-intersections/",
    difficulty: 3,
    tagId: 1
  },
  {
    name: "Find the Duplicate Number",
    description: "Given an array of numbers with elements of values 1 to n+1 (where n is the length of the array), return the duplicate element",
    link: "https://leetcode.com/problems/find-the-duplicate-number/",
    difficulty: 4,
    tagId: 1
  },
  {
    name: "Search a 2D Matrix",
    description: "Given a 2D matrix with sorted rows and sorted columns and a target number, return whether or not the matrix contains the target number.",
    link: "https://leetcode.com/problems/search-a-2d-matrix-ii/",
    difficulty: 4,
    tagId: 1
  },
  {
    name: "First Missing Positive",
    description: "Given an unsorted array of integers, find the first missing positive number in the array. 0 is NOT counted as a positive number.",
    link: "https://leetcode.com/problems/first-missing-positive",
    difficulty: 5,
    tagId: 1
  },
  {
    name: "Subarray Sum Equals K",
    description: "Given an array of integers and a target sum K, return the number of subarrays that equal K",
    link: "https://leetcode.com/problems/subarray-sum-equals-k/",
    difficulty: 3,
    tagId: 1
  },
  {
    name: "Binary Subarrays With Sum",
    description: "Given a 2D matrix of 0s and 1s and a target number S, return the number of subarrays in the matrix that sum up to S.",
    link: "https://leetcode.com/problems/binary-subarrays-with-sum/",
    difficulty: 3,
    tagId: 1
  },
  {
    name: "Subarray Sums Divisible By K",
    description: "Given an array of integers and target factor, return the number of subarrays divisible by the target factor",
    link: "https://leetcode.com/problems/subarray-sums-divisible-by-k",
    difficulty: 4,
    tagId: 1
  },
  {
    name: "Product of Last K Numbers",
    description: "Write a data structure that supports adding elements to the end and return the product of the last K numbers.",
    link: "https://leetcode.com/problems/product-of-the-last-k-numbers/",
    difficulty: 4,
    tagId: 1
  },
  {
    name: "Move Zeroes",
    description: "Move all the zeroes in an array to the end of that array",
    link: "https://leetcode.com/problems/move-zeroes/",
    difficulty: 1,
    tagId: 1
  },
  {
    name: "Sort Array By Parity",
    description: "Given an array of integers, move all the even elements to the start of the array and all the odd elements to the end of the array",
    link: "https://leetcode.com/problems/sort-array-by-parity/",
    difficulty: 2,
    tagId: 1
  },
  {
    name: "Flipping An Image",
    description: "Given a 2D matrix with elements of 1 or 0, flip it horizontally, then turn all 1s to 0s and vice versa",
    link: "https://leetcode.com/problems/flipping-an-image/",
    difficulty: 2,
    tagId: 1
  },
  {
    name: "Pascal's Triangle",
    description: "Given an integer n, generate the first n rows of a Pascal’s triangle",
    link: "https://leetcode.com/problems/pascals-triangle/",
    difficulty: 2,
    tagId: 1
  },
  {
    name: "Rotate Image",
    description: "Given a 2D matrix, rotate it by 90 degrees clockwise",
    link: "https://leetcode.com/problems/rotate-image/",
    difficulty: 3,
    tagId: 1
  },
  {
    name: "Spiral Matrix II",
    description: "Given an integer, return a matrix containing elements from 1 to n^2 in a clockwise spiral.",
    link: "https://leetcode.com/problems/spiral-matrix-ii/",
    difficulty: 3,
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
