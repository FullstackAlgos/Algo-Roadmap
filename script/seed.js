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
    description:
      "Given an array in which all elements appear twice except one (of them), return the one which appears only once.",
    difficulty: 1,
    link: "https://leetcode.com/problems/single-number/",
    ratedDifficulty: 1.0,
    tagId: 1
  },
  {
    name: "Find All Numbers Disappeared In Array",
    description:
      "Given an array that has some elements from 1 to n (where n is the length of the array), find the elements from 1 to n that it is missing. Ex. Given [1,2,2,4], return 3",
    difficulty: 1,
    link:
      "https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array/",
    ratedDifficulty: 1.0,
    tagId: 1
  },
  {
    name: "Peak Index In Mountain Array",
    description:
      "Given a mountain array (i.e. an array that only increases on one side and only decreases on the other), find the peak index (index of the top of the mountain). See the problem for detailed info.",
    difficulty: 1,
    link: "https://leetcode.com/problems/peak-index-in-a-mountain-array/",
    ratedDifficulty: 1.0,
    tagId: 1
  },
  {
    name: "Monotonic Array",
    description:
      "Given an array, return whether or not its elements are increasing or decreasing. Note that [1,2,2,4] still counts as increasing.",
    difficulty: 1,
    link: "https://leetcode.com/problems/monotonic-array/",
    ratedDifficulty: 1.0,
    tagId: 1
  },
  {
    name: "Max Consecutive 1s",
    description:
      "Given an array of 1s and 0s, return the max length of consecutive 1s",
    difficulty: 1,
    link: "https://leetcode.com/problems/max-consecutive-ones/",
    ratedDifficulty: 1.0,
    tagId: 1
  },
  {
    name: "Minimum Absolute Difference",
    description:
      "Given an array of distinct integers, find and return all pairs of elements that have the minimum absolute difference.",
    difficulty: 2,
    link: "https://leetcode.com/problems/minimum-absolute-difference/",
    ratedDifficulty: 2.0,
    tagId: 1
  },
  {
    name: "Toeplitz Matrix",
    description:
      "Traverse a 2D matrix diagonally. A look at the problem should make it clear.",
    difficulty: 2,
    link: "https://leetcode.com/problems/toeplitz-matrix/",
    ratedDifficulty: 2.0,
    tagId: 1
  },
  {
    name: "Island Perimeter",
    description:
      "Find the ‘perimeter’ of ‘islands’ in a matrix. The problem description has a picture and a good explanation!",
    difficulty: 2,
    link: "https://leetcode.com/problems/island-perimeter/",
    ratedDifficulty: 2.0,
    tagId: 1
  },
  {
    name: "Partition Array Into Three Equal Sum Parts",
    description:
      "Given an array, return whether or not its possible to partition it into three non-empty, equal-sum parts.",
    difficulty: 2,
    link:
      "https://leetcode.com/problems/partition-array-into-three-parts-with-equal-sum/",
    ratedDifficulty: 2.0,
    tagId: 1
  },
  {
    name: "Find Pivot Index",
    description:
      "Given an array of integers, find an index at which all the sum of elements to the right of the index equals the sum of elements to the left of the index",
    difficulty: 2,
    link: "https://leetcode.com/problems/find-pivot-index/",
    ratedDifficulty: 2.0,
    tagId: 1
  },
  {
    name: "Plus One",
    description:
      "Given an array of integers representing a number, return an array with the digits of that number plus 1.",
    difficulty: 2,
    link: "https://leetcode.com/problems/plus-one/",
    ratedDifficulty: 2.0,
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

const questionBulk2 = [
  // --------------- GRAPHS ---------------
  {
    name: "Redundant Connection",
    description:
      "Given an undirected graph (represented as an integer array of edges) with at least one redundant connection, return the last redundant connection.",
    difficulty: 3,
    link: "https://leetcode.com/problems/redundant-connection/",
    tagId: 13
  },
  {
    name: "Connected Network",
    description:
      "Given an undirected graph (represented as an array of edges) return the fewest number of connections you need to make to connect all of the edges in the graph.",
    difficulty: 3,
    link:
      "https://leetcode.com/problems/number-of-operations-to-make-network-connected/",
    tagId: 13
  },
  {
    name: "Accounts Merge",
    description:
      "Given a list of lists of strings representing accounts, merge the accounts with the same email and return the new list of accounts.",
    difficulty: 4,
    link: "https://leetcode.com/problems/accounts-merge/",
    tagId: 13
  },
  {
    name: "Smallest String with Swaps",
    description:
      "Given a string and a 2D array of indices representing a connected pair of characters, find the lexicographically smallest string that can be made by swapping characters in the pairs. The pairs can be swapped any number of times.",
    difficulty: 4,
    link: "https://leetcode.com/problems/smallest-string-with-swaps/",
    tagId: 13
  },
  // --------------- HEAPS ---------------
  {
    name: "Rank Teams by Votes",
    description:
      "Given an array of strings votes which is the votes of all voters in the ranking systems. Sort all teams according to the ranking system described above. Return a string of all teams sorted by the ranking system.",
    difficulty: 3,
    link: "https://leetcode.com/problems/rank-teams-by-votes/",
    tagId: 12
  },
  {
    name: "Maximum Number of Events That Can Be Attended",
    description:
      "Given an array of events where events[i] = [startDayi, endDayi]. Every event i starts at startDayi and ends at endDayi. You can attend an event i at any day d where startTimei <= d <= endTimei. Notice that you can only attend one event at any time d. Return the maximum number of events you can attend.",
    difficulty: 4,
    link:
      "https://leetcode.com/problems/maximum-number-of-events-that-can-be-attended/",
    tagId: 12
  },
  // --------------- BIT MANIPULATION ---------------
  {
    name: "Hamming Distance",
    description:
      "The Hamming distance between two integers is the number of positions at which the corresponding bits are different. Given two integers x and y, calculate the Hamming distance.",
    difficulty: 2,
    link: "https://leetcode.com/problems/hamming-distance/",
    tagId: 5
  },
  {
    name: "Minimum Flips to Make a OR b Equal to c",
    description:
      "Given 3 positives numbers a, b and c. Return the minimum flips required in some bits of a and b to make ( a OR b == c ). (bitwise OR operation). Flip operation consists of change any single bit 1 to 0 or change the bit 0 to 1 in their binary representation.",
    difficulty: 3,
    link:
      "https://leetcode.com/problems/minimum-flips-to-make-a-or-b-equal-to-c/",
    tagId: 5
  },
  // --------------- DYNAMIC PROGRAMMING ---------------
  {
    name: "Best Time to Buy and Sell Stock",
    description:
      "Say you have an array for which the ith element is the price of a given stock on day i. If you were only permitted to complete at most one transaction (i.e., buy one and sell one share of the stock), design an algorithm to find the maximum profit. Note that you cannot sell a stock before you buy one.",
    difficulty: 1,
    link: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
    tagId: 11
  },
  {
    name: "House Robber",
    description:
      "You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security system connected and it will automatically contact the police if two adjacent houses were broken into on the same night. Given a list of non-negative integers representing the amount of money of each house, determine the maximum amount of money you can rob tonight without alerting the police.",
    difficulty: 1,
    link: "https://leetcode.com/problems/house-robber/",
    tagId: 11
  },
  {
    name: "Min Cost Climbing Stairs",
    description:
      "On a staircase, the i-th step has some non-negative cost cost[i] assigned (0 indexed). Once you pay the cost, you can either climb one or two steps. You need to find minimum cost to reach the top of the floor, and you can either start from the step with index 0, or the step with index 1.",
    difficulty: 1,
    link: "https://leetcode.com/problems/min-cost-climbing-stairs/",
    tagId: 11
  }
];
