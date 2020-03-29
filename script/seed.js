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
  // ------------------------- ARRAY (1) ---------------------------
  {
    name: "Find The Majority Element",
    description:
      "Given an array with n elements, find the element that appears n/2 times or more. It's guaranteed that there will be an element that appears n/2 times or more.",
    difficulty: 1,
    link: "https://leetcode.com/problems/majority-element/",
    tagId: 1
  },
  {
    name: "Single Number",
    description:
      "Given an array in which all elements appear twice except one (of them), return the one which appears only once.",
    difficulty: 1,
    link: "https://leetcode.com/problems/single-number/",
    tagId: 1
  },
  {
    name: "Find All Numbers Disappeared In Array",
    description:
      "Given an array that has some elements from 1 to n (where n is the length of the array), find the elements from 1 to n that it is missing. Ex. Given [1,2,2,4], return 3",
    difficulty: 1,
    link:
      "https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array/",
    tagId: 1
  },
  {
    name: "Peak Index In Mountain Array",
    description:
      "Given a mountain array (i.e. an array that only increases on one side and only decreases on the other), find the peak index (index of the top of the mountain). See the problem for detailed info.",
    difficulty: 1,
    link: "https://leetcode.com/problems/peak-index-in-a-mountain-array/",
    tagId: 1
  },
  {
    name: "Monotonic Array",
    description:
      "Given an array, return whether or not its elements are increasing or decreasing. Note that [1,2,2,4] still counts as increasing.",
    difficulty: 1,
    link: "https://leetcode.com/problems/monotonic-array/",
    tagId: 1
  },
  {
    name: "Max Consecutive 1s",
    description:
      "Given an array of 1s and 0s, return the max length of consecutive 1s",
    difficulty: 1,
    link: "https://leetcode.com/problems/max-consecutive-ones/",
    tagId: 1
  },
  {
    name: "Minimum Absolute Difference",
    description:
      "Given an array of distinct integers, find and return all pairs of elements that have the minimum absolute difference.",
    difficulty: 2,
    link: "https://leetcode.com/problems/minimum-absolute-difference/",
    tagId: 1
  },
  {
    name: "Toeplitz Matrix",
    description:
      "Traverse a 2D matrix diagonally. A look at the problem should make it clear.",
    difficulty: 2,
    link: "https://leetcode.com/problems/toeplitz-matrix/",
    tagId: 1
  },
  {
    name: "Island Perimeter",
    description:
      "Find the ‘perimeter’ of ‘islands’ in a matrix. The problem description has a picture and a good explanation!",
    difficulty: 2,
    link: "https://leetcode.com/problems/island-perimeter/",
    tagId: 1
  },
  {
    name: "Partition Array Into Three Equal Sum Parts",
    description:
      "Given an array, return whether or not its possible to partition it into three non-empty, equal-sum parts.",
    difficulty: 2,
    link:
      "https://leetcode.com/problems/partition-array-into-three-parts-with-equal-sum/",
    tagId: 1
  },
  {
    name: "Find Pivot Index",
    description:
      "Given an array of integers, find an index at which all the sum of elements to the right of the index equals the sum of elements to the left of the index",
    difficulty: 2,
    link: "https://leetcode.com/problems/find-pivot-index/",
    tagId: 1
  },
  {
    name: "Plus One",
    description:
      "Given an array of integers representing a number, return an array with the digits of that number plus 1.",
    difficulty: 2,
    link: "https://leetcode.com/problems/plus-one/",
    tagId: 1
  },
  {
    name: "Count Negative Numbers In Sorted Matrix",
    description:
      "Given a matrix of integers with each row and column sorted in descending order, return the number of negative numbers in the matrix.",
    difficulty: 2,
    link:
      "https://leetcode.com/problems/count-negative-numbers-in-a-sorted-matrix/",
    tagId: 1
  },
  {
    name: "Count Numbers Smaller Than Current Number",
    description:
      "Given an array of numbers, return an array in which each element denotes the number of elements in the input array that are strictly smaller than the current element.",
    difficulty: 2,
    link:
      "https://leetcode.com/problems/how-many-numbers-are-smaller-than-the-current-number/",
    tagId: 1
  },
  {
    name: "Search In Rotated Sorted Array",
    description:
      "Given an array that’s been sorted in ascending order then rotated some amount and a target number, return the index of the target number in the array or -1 if the target is not present",
    difficulty: 3,
    link: "https://leetcode.com/problems/search-in-rotated-sorted-array/",
    tagId: 1
  },
  {
    name: "First and Last Position of Element In Sorted Array",
    description:
      "Given a sorted array and a target, find the target’s first and last index in the array. If it’s not found return [-1,-1]",
    link:
      "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/",
    difficulty: 3,
    tagId: 1
  },
  {
    name: "Spiral Matrix",
    description:
      "Given a 2D matrix, return an array that contains the elements of the matrix in a clockwise-outside-to-inside spiral order",
    link: "https://leetcode.com/problems/spiral-matrix/",
    difficulty: 3,
    tagId: 1
  },
  {
    name: "Maximum Subarray",
    description:
      "Given an array of integers, return the subarray with the maximum sum.",
    link: "https://leetcode.com/problems/maximum-subarray/",
    difficulty: 3,
    tagId: 1
  },
  {
    name: "Product Of Array Except Self",
    description:
      "Given an array of numbers, return an array of the product of all numbers in the array except the current element itself without using division.",
    link: "https://leetcode.com/problems/product-of-array-except-self/",
    difficulty: 3,
    tagId: 1
  },
  {
    name: "Interval List Intersections",
    description:
      "Given two arrays of intervals sorted by starting point, return an array of the intersections between the two intervals.",
    link: "https://leetcode.com/problems/interval-list-intersections/",
    difficulty: 3,
    tagId: 1
  },
  {
    name: "Find the Duplicate Number",
    description:
      "Given an array of numbers with elements of values 1 to n+1 (where n is the length of the array), return the duplicate element",
    link: "https://leetcode.com/problems/find-the-duplicate-number/",
    difficulty: 4,
    tagId: 1
  },
  {
    name: "Search a 2D Matrix",
    description:
      "Given a 2D matrix with sorted rows and sorted columns and a target number, return whether or not the matrix contains the target number.",
    link: "https://leetcode.com/problems/search-a-2d-matrix-ii/",
    difficulty: 4,
    tagId: 1
  },
  {
    name: "First Missing Positive",
    description:
      "Given an unsorted array of integers, find the first missing positive number in the array. 0 is NOT counted as a positive number.",
    link: "https://leetcode.com/problems/first-missing-positive",
    difficulty: 5,
    tagId: 1
  },
  {
    name: "Subarray Sum Equals K",
    description:
      "Given an array of integers and a target sum K, return the number of subarrays that equal K",
    link: "https://leetcode.com/problems/subarray-sum-equals-k/",
    difficulty: 3,
    tagId: 1
  },
  {
    name: "Binary Subarrays With Sum",
    description:
      "Given a 2D matrix of 0s and 1s and a target number S, return the number of subarrays in the matrix that sum up to S.",
    link: "https://leetcode.com/problems/binary-subarrays-with-sum/",
    difficulty: 3,
    tagId: 1
  },
  {
    name: "Subarray Sums Divisible By K",
    description:
      "Given an array of integers and target factor, return the number of subarrays divisible by the target factor",
    link: "https://leetcode.com/problems/subarray-sums-divisible-by-k",
    difficulty: 4,
    tagId: 1
  },
  {
    name: "Product of Last K Numbers",
    description:
      "Write a data structure that supports adding elements to the end and return the product of the last K numbers.",
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
    description:
      "Given an array of integers, move all the even elements to the start of the array and all the odd elements to the end of the array",
    link: "https://leetcode.com/problems/sort-array-by-parity/",
    difficulty: 2,
    tagId: 1
  },
  {
    name: "Flipping An Image",
    description:
      "Given a 2D matrix with elements of 1 or 0, flip it horizontally, then turn all 1s to 0s and vice versa",
    link: "https://leetcode.com/problems/flipping-an-image/",
    difficulty: 2,
    tagId: 1
  },
  {
    name: "Pascal's Triangle",
    description:
      "Given an integer n, generate the first n rows of a Pascal’s triangle",
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
    description:
      "Given an integer, return a matrix containing elements from 1 to n^2 in a clockwise spiral.",
    link: "https://leetcode.com/problems/spiral-matrix-ii/",
    difficulty: 3,
    tagId: 1
  },
  // -------------------------- HASH MAP (3) --------------------------
  {
    name: "Two Sum",
    description:
      "Given an array of integers and a target number, return the indices of two elements in the array that sum up to the target number. This problem is one of, if not the most, commonly asked.",
    difficulty: 1,
    link: "https://leetcode.com/problems/two-sum/",
    tagId: 3
  },
  // ---------------------- TREE (5) ----------------------
  // ---------------------- DEPTH FIRST SEARCH (6) ----------------------
  {
    name: "Same Tree",
    description:
      "Given two binary trees, write a function to check if they are the same or not. Two binary trees are considered the same if they are structurally identical and the nodes have the same value.",
    difficulty: 1,
    link: "https://leetcode.com/problems/same-tree/",
    tagId: 6
  },
  // --------------- STACKS ---------------
  {
    name: "Valid Parentheses",
    description:
      "Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    difficulty: 1,
    link: "https://leetcode.com/problems/valid-parentheses/",
    tagId: 7
  },
  {
    name: "Remove Outermost Parentheses",
    description:
      "Return S after removing the outermost parentheses of every primitive string in the primitive decomposition of S.",
    difficulty: 1,
    link: "https://leetcode.com/problems/remove-outermost-parentheses/",
    tagId: 7
  },
  {
    name: "Remove All Adjacent Duplicates In String",
    description:
      "Given a string S of lowercase letters, a duplicate removal consists of choosing two adjacent and equal letters, and removing them. We repeatedly make duplicate removals on S until we no longer can. Return the final string after all such duplicate removals have been made.  It is guaranteed the answer is unique.",
    difficulty: 1,
    link:
      "https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string/",
    tagId: 7
  },
  {
    name: "Reverse Polish Notation",
    description:
      "Evaluate the value of an arithmetic expression in Reverse Polish Notation. Valid operators are +, -, *, /. Each operand may be an integer or another expression. Note: Division between two integers should truncate toward zero. The given RPN expression is always valid. That means the expression would always evaluate to a result and there won't be any divide by zero operation.",
    difficulty: 3,
    link: "https://leetcode.com/problems/evaluate-reverse-polish-notation/",
    tagId: 7
  },
  {
    name: "Asteroid Collision",
    description:
      "We are given an array asteroids of integers representing asteroids in a row. For each asteroid, the absolute value represents its size, and the sign represents its direction (positive meaning right, negative meaning left). Each asteroid moves at the same speed. Find out the state of the asteroids after all collisions. If two asteroids meet, the smaller one will explode. If both are the same size, both will explode. Two asteroids moving in the same direction will never meet.",
    difficulty: 3,
    link: "https://leetcode.com/problems/asteroid-collision/",
    tagId: 7
  },
  {
    name: "Remove All Adjacent Duplicates in String II",
    description:
      "Given a string s and an integer k, remove all the substrings that have k adjacent, equal characters and return the resulting string.",
    difficulty: 3,
    link:
      "https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string-ii/",
    tagId: 7
  },
  {
    name: "Trapping Rain Water",
    description:
      "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it is able to trap after raining.",
    difficulty: 5,
    link: "https://leetcode.com/problems/trapping-rain-water/",
    tagId: 7
  },
  {
    name: "Daily Temperatures",
    description:
      "Given a list of daily temperatures T, return a list such that, for each day in the input, tells you how many days you would have to wait until a warmer temperature. If there is no future day for which this is possible, put 0 instead. For example, given the list of temperatures T = [73, 74, 75, 71, 69, 72, 76, 73], your output should be [1, 1, 4, 2, 1, 1, 0, 0]. Note: The length of temperatures will be in the range [1, 30000]. Each temperature will be an integer in the range [30, 100].",
    difficulty: 3,
    link: "https://leetcode.com/problems/daily-temperatures/",
    tagId: 7
  },
  {
    name: "Largest Rectangle in Histogram",
    description:
      "Given n non-negative integers representing the histogram's bar height where the width of each bar is 1, find the area of largest rectangle in the histogram.",
    difficulty: 4,
    link: "https://leetcode.com/problems/largest-rectangle-in-histogram/",
    tagId: 7
  },
  {
    name: "Longest Valid Parentheses",
    description:
      "Given a string containing just the characters '(' and ')', find the length of the longest valid (well-formed) parentheses substring.",
    difficulty: 5,
    link: "https://leetcode.com/problems/longest-valid-parentheses/",
    tagId: 7
  },
  // --------------- RECURSION / BACKTRACKING ---------------
  {
    name: "Letter Case Permutation",
    description:
      "Given a string S, we can transform every letter individually to be lowercase or uppercase to create another string.  Return a list of all possible strings we could create.",
    difficulty: 1,
    link: "https://leetcode.com/problems/letter-case-permutation/",
    tagId: 9
  },
  {
    name: "Subsets",
    description:
      "Given a set of distinct integers, nums, return all possible subsets (the power set). Note: The solution set must not contain duplicate subsets.",
    difficulty: 3,
    link: "https://leetcode.com/problems/subsets/",
    tagId: 9
  },
  {
    name: "Combination Sum",
    description:
      "Given a set of candidate numbers (candidates) (without duplicates) and a target number (target), find all unique combinations in candidates where the candidate numbers sums to target. The same repeated number may be chosen from candidates unlimited number of times. Note: All numbers (including target) will be positive integers. The solution set must not contain duplicate combinations.",
    difficulty: 3,
    link: "https://leetcode.com/problems/combination-sum/",
    tagId: 9
  },
  {
    name: "Combinations",
    description:
      "Given two integers n and k, return all possible combinations of k numbers out of 1 ... n.",
    difficulty: 3,
    link: "https://leetcode.com/problems/combinations/",
    tagId: 9
  },
  {
    name: "Permutations",
    description:
      "Given a collection of distinct integers, return all possible permutations.",
    difficulty: 3,
    link: "https://leetcode.com/problems/permutations/",
    tagId: 9
  },
  // --------------- DYNAMIC PROGRAMMING ---------------
  {
    name: "Best Time to Buy and Sell Stock",
    description:
      "Say you have an array for which the ith element is the price of a given stock on day i. If you were only permitted to complete at most one transaction (i.e., buy one and sell one share of the stock), design an algorithm to find the maximum profit. Note that you cannot sell a stock before you buy one.",
    difficulty: 1,
    link: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
    tagId: 10
  },
  {
    name: "House Robber",
    description:
      "You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security system connected and it will automatically contact the police if two adjacent houses were broken into on the same night. Given a list of non-negative integers representing the amount of money of each house, determine the maximum amount of money you can rob tonight without alerting the police.",
    difficulty: 1,
    link: "https://leetcode.com/problems/house-robber/",
    tagId: 10
  },
  {
    name: "Min Cost Climbing Stairs",
    description:
      "On a staircase, the i-th step has some non-negative cost cost[i] assigned (0 indexed). Once you pay the cost, you can either climb one or two steps. You need to find minimum cost to reach the top of the floor, and you can either start from the step with index 0, or the step with index 1.",
    difficulty: 1,
    link: "https://leetcode.com/problems/min-cost-climbing-stairs/",
    tagId: 10
  },
  {
    name: "Climbing Stairs",
    description:
      "You are climbing a stair case. It takes n steps to reach to the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top? Note: Given n will be a positive integer.",
    difficulty: 1,
    link: "https://leetcode.com/problems/climbing-stairs/",
    tagId: 10
  },
  {
    name: "Unique Paths",
    description:
      "A robot is located at the top-left corner of a m x n grid (marked 'Start' in the diagram below). The robot can only move either down or right at any point in time. The robot is trying to reach the bottom-right corner of the grid (marked 'Finish' in the diagram below). How many possible unique paths are there?",
    difficulty: 3,
    link: "https://leetcode.com/problems/unique-paths/",
    tagId: 10
  },
  {
    name: "Minimum Path Sum",
    description:
      "Given a m x n grid filled with non-negative numbers, find a path from top left to bottom right which minimizes the sum of all numbers along its path. Note: You can only move either down or right at any point in time.",
    difficulty: 3,
    link: "https://leetcode.com/problems/minimum-path-sum/",
    tagId: 10
  },
  {
    name: "Cost Change",
    description:
      "You are given coins of different denominations and a total amount of money amount. Write a function to compute the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.",
    difficulty: 3,
    link: "https://leetcode.com/problems/coin-change/",
    tagId: 10
  },
  {
    name: "Unique Paths II",
    description:
      "A robot is located at the top-left corner of a m x n grid (marked 'Start' in the diagram below). The robot can only move either down or right at any point in time. The robot is trying to reach the bottom-right corner of the grid (marked 'Finish' in the diagram below). Now consider if some obstacles are added to the grids. How many unique paths would there be?",
    difficulty: 4,
    link: "https://leetcode.com/problems/unique-paths-ii/",
    tagId: 10
  },
  {
    name: "Max Length of Repeated Subarray",
    description:
      "Given two integer arrays A and B, return the maximum length of an subarray that appears in both arrays.",
    difficulty: 4,
    link: "https://leetcode.com/problems/maximum-length-of-repeated-subarray/",
    tagId: 10
  },
  {
    name: "Maximal Square",
    description:
      "Given a 2D binary matrix filled with 0's and 1's, find the largest square containing only 1's and return its area.",
    difficulty: 4,
    link: "https://leetcode.com/problems/maximal-square/",
    tagId: 10
  },
  {
    name: "Edit Distance",
    description:
      "Given two words word1 and word2, find the minimum number of operations required to convert word1 to word2. You have the following 3 operations permitted on a word: Insert a character, Delete a character, Replace a character.",
    difficulty: 5,
    link: "https://leetcode.com/problems/edit-distance/",
    tagId: 10
  },

  {
    name: "Maximal Rectangle",
    description:
      "Given a 2D binary matrix filled with 0's and 1's, find the largest rectangle containing only 1's and return its area.",
    difficulty: 5,
    link: "https://leetcode.com/problems/maximal-rectangle/",
    tagId: 10
  },
  {
    name: "Regular Expression Matching",
    description:
      "Given a limited regular expression and a string, return whether or not the pattern matches the string.",
    difficulty: 5,
    link: "https://leetcode.com/problems/regular-expression-matching/",
    tagId: 10
  },
  {
    name: "Word Break II",
    description:
      "Given a dictionary of words and a string, return all the ways that the string can be partitioned so that it contains words in the dictionary.",
    difficulty: 5,
    link: "https://leetcode.com/problems/word-break-ii/",
    tagId: 10
  },
  // ---------------------- HEAPS (11) ----------------------
  {
    name: "Rank Teams by Votes",
    description:
      "Given an array of strings votes which is the votes of all voters in the ranking systems. Sort all teams according to the ranking system described above. Return a string of all teams sorted by the ranking system.",
    difficulty: 3,
    link: "https://leetcode.com/problems/rank-teams-by-votes/",
    tagId: 11
  },
  {
    name: "Maximum Number of Events That Can Be Attended",
    description:
      "Given an array of events where events[i] = [startDayi, endDayi]. Every event i starts at startDayi and ends at endDayi. You can attend an event i at any day d where startTimei <= d <= endTimei. Notice that you can only attend one event at any time d. Return the maximum number of events you can attend.",
    difficulty: 4,
    link:
      "https://leetcode.com/problems/maximum-number-of-events-that-can-be-attended/",
    tagId: 11
  },
  // ---------------------- GRAPHS (12) ----------------------
  {
    name: "Redundant Connection",
    description:
      "Given an undirected graph (represented as an integer array of edges) with at least one redundant connection, return the last redundant connection.",
    difficulty: 3,
    link: "https://leetcode.com/problems/redundant-connection/",
    tagId: 12
  },
  {
    name: "Connected Network",
    description:
      "Given an undirected graph (represented as an array of edges) return the fewest number of connections you need to make to connect all of the edges in the graph.",
    difficulty: 3,
    link:
      "https://leetcode.com/problems/number-of-operations-to-make-network-connected/",
    tagId: 12
  },
  {
    name: "Accounts Merge",
    description:
      "Given a list of lists of strings representing accounts, merge the accounts with the same email and return the new list of accounts.",
    difficulty: 4,
    link: "https://leetcode.com/problems/accounts-merge/",
    tagId: 12
  },
  {
    name: "Smallest String with Swaps",
    description:
      "Given a string and a 2D array of indices representing a connected pair of characters, find the lexicographically smallest string that can be made by swapping characters in the pairs. The pairs can be swapped any number of times.",
    difficulty: 4,
    link: "https://leetcode.com/problems/smallest-string-with-swaps/",
    tagId: 12
  },
  // ---------------------- BIT MANIPULATION (13) ----------------------
  {
    name: "Steps To Reduce A Number To 0",
    description:
      "Given a number n, divide n by 2 if its even and subtract one from n if its odd. Return the number of those operations needed to reduce n to 0.",
    difficulty: 1,
    link:
      "https://leetcode.com/problems/number-of-steps-to-reduce-a-number-to-zero/",
    tagId: 13
  },
  {
    name: "Hamming Distance",
    description:
      "The Hamming distance between two integers is the number of positions at which the corresponding bits are different. Given two integers x and y, calculate the Hamming distance.",
    difficulty: 2,
    link: "https://leetcode.com/problems/hamming-distance/",
    tagId: 13
  },
  {
    name: "Minimum Flips to Make a OR b Equal to c",
    description:
      "Given 3 positives numbers a, b and c. Return the minimum flips required in some bits of a and b to make ( a OR b == c ). (bitwise OR operation). Flip operation consists of change any single bit 1 to 0 or change the bit 0 to 1 in their binary representation.",
    difficulty: 3,
    link:
      "https://leetcode.com/problems/minimum-flips-to-make-a-or-b-equal-to-c/",
    tagId: 13
  }
];

const tagBulk = [
  {
    name: "Array",
    ranking: 1
  },
  {
    name: "String",
    ranking: 2
  },
  {
    name: "HashMap",
    ranking: 3
  },
  {
    name: "Linked List",
    ranking: 4
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
  },
  {
    name: "Bit Manipulation",
    ranking: 13
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
