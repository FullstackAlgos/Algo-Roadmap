const db = require("../server/db");
const { Question, User, Tag, Like } = require("../server/db/models");

const questionBulk = [
  // ------------------------- ARRAY (1) ---------------------------
  {
    name: "Single Number",
    description:
      "Given an array in which all elements appear twice except one (of them), return the one which appears only once.",
    difficulty: 1,
    link: "https://leetcode.com/problems/single-number/",
    tagId: 1,
  },
  {
    name: "Monotonic Array",
    description:
      "Given an array, return whether or not its elements are increasing or decreasing. Note that [1,2,2,4] still counts as increasing.",
    difficulty: 1,
    link: "https://leetcode.com/problems/monotonic-array/",
    tagId: 1,
  },
  {
    name: "Max Consecutive 1s",
    description:
      "Given an array of 1s and 0s, return the max length of consecutive 1s.",
    difficulty: 1,
    link: "https://leetcode.com/problems/max-consecutive-ones/",
    tagId: 1,
  },
  {
    name: "Find Pivot Index",
    description:
      "Given an array of integers, find an index at which all the sum of elements to the right of the index equals the sum of elements to the left of the index.",
    difficulty: 2,
    link: "https://leetcode.com/problems/find-pivot-index/",
    tagId: 1,
  },
  {
    name: "Plus One",
    description:
      "Given an array of integers representing a number, return an array with the digits of that number plus 1.",
    difficulty: 2,
    link: "https://leetcode.com/problems/plus-one/",
    tagId: 1,
  },
  {
    name: "Search In Rotated Sorted Array",
    description:
      "Given an array that’s been sorted in ascending order then rotated some amount and a target number, return the index of the target number in the array or -1 if the target is not present.",
    difficulty: 3,
    link: "https://leetcode.com/problems/search-in-rotated-sorted-array/",
    tagId: 1,
  },
  {
    name: "First and Last Index of Num In Sorted Array",
    description:
      "Given a sorted array and a target, find the target’s first and last index in the array. If it’s not found return [-1,-1].",
    link:
      "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/",
    difficulty: 3,
    tagId: 1,
  },
  {
    name: "Spiral Matrix",
    description:
      "Given a 2D matrix, return an array that contains the elements of the matrix in a clockwise-outside-to-inside spiral order.",
    link: "https://leetcode.com/problems/spiral-matrix/",
    difficulty: 3,
    tagId: 1,
  },
  {
    name: "Maximum Subarray",
    description:
      "Given an array of integers, return the subarray with the maximum sum.",
    link: "https://leetcode.com/problems/maximum-subarray/",
    difficulty: 3,
    tagId: 1,
  },
  {
    name: "Product Of Array Except Self",
    description:
      "Given an array of numbers, return an array of the product of all numbers in the array except the current element itself without using division.",
    link: "https://leetcode.com/problems/product-of-array-except-self/",
    difficulty: 3,
    tagId: 1,
  },
  {
    name: "Interval List Intersections",
    description:
      "Given two arrays of intervals sorted by starting point, return an array of the intersections between the two intervals.",
    link: "https://leetcode.com/problems/interval-list-intersections/",
    difficulty: 3,
    tagId: 1,
  },
  {
    name: "Find the Duplicate Number",
    description:
      "Given an array of numbers with elements of values 1 to n+1 (where n is the length of the array), return the duplicate element.",
    link: "https://leetcode.com/problems/find-the-duplicate-number/",
    difficulty: 4,
    tagId: 1,
  },
  {
    name: "First Missing Positive",
    description:
      "Given an unsorted array of integers, find the first missing positive number in the array. 0 is NOT counted as a positive number.",
    link: "https://leetcode.com/problems/first-missing-positive",
    difficulty: 5,
    tagId: 1,
  },
  {
    name: "Subarray Sum Equals K",
    description:
      "Given an array of integers and a target sum K, return the number of subarrays that equal K.",
    link: "https://leetcode.com/problems/subarray-sum-equals-k/",
    difficulty: 3,
    tagId: 1,
  },
  {
    name: "Move Zeroes",
    description: "Move all the zeroes in an array to the end of that array.",
    link: "https://leetcode.com/problems/move-zeroes/",
    difficulty: 1,
    tagId: 1,
  },
  {
    name: "Pascal's Triangle",
    description:
      "Given an integer n, generate the first n rows of a Pascal’s triangle.",
    link: "https://leetcode.com/problems/pascals-triangle/",
    difficulty: 2,
    tagId: 1,
  },
  // --------------------------- STRING (2) ---------------------------
  {
    name: "Student Attendance Record",
    description:
      "Given a string of 'A's, 'P's, and 'L's representing a student's attendance record, return whether the doesn't contain more than one A, or two continuous Ls.",
    link: "https://leetcode.com/problems/student-attendance-record-i/",
    difficulty: 1,
    tagId: 2,
  },
  {
    name: "Reverse String",
    description:
      "Given a character array representing a string, reverse the array in place.",
    link: "https://leetcode.com/problems/reverse-string/",
    difficulty: 1,
    tagId: 2,
  },
  {
    name: "Reverse Words In A String III",
    description:
      "Given a sentence (words separated by single spaces), reverse the characters in each word while preserving the order of the words.",
    link: "https://leetcode.com/problems/reverse-words-in-a-string-iii/",
    difficulty: 1,
    tagId: 2,
  },
  {
    name: "Reverse Only Letters",
    description: "Given a string, reverse only the letters.",
    link: "https://leetcode.com/problems/reverse-only-letters/",
    difficulty: 2,
    tagId: 2,
  },
  {
    name: "Shortest Distance To A Character",
    description:
      "Given a string and a target character, return an integer array where each element represents the shortest distance to the target character from the current index.",
    link: "https://leetcode.com/problems/shortest-distance-to-a-character/",
    difficulty: 2,
    tagId: 2,
  },
  {
    name: "Number of Substrings Containing All 3 Characters",
    description:
      "Given a string containing the characters ‘a’, ‘b’, and ‘c’, count the number of substrings containing all 3 characters.",
    link:
      "https://leetcode.com/problems/number-of-substrings-containing-all-three-characters/",
    difficulty: 3,
    tagId: 2,
  },
  {
    name: "Print Words Vertically",
    description:
      "Given a string with words (all in capital letters) separated by single spaces, return a list with the words printed vertically.",
    link: "https://leetcode.com/problems/print-words-vertically/",
    difficulty: 3,
    tagId: 2,
  },
  {
    name: "Longest Absolute File Path",
    description:
      "Given a “file structure” in the form of a string, return the longest path length (in terms of # of characters) in the structure.",
    link: "https://leetcode.com/problems/longest-absolute-file-path/",
    difficulty: 4,
    tagId: 2,
  },
  // -------------------------- HASH MAP (3) --------------------------
  {
    name: "Two Sum",
    description:
      "Given an array of integers and a target number, return the indices of two elements in the array that sum up to the target number. This problem is one of, if not the most, commonly asked.",
    difficulty: 1,
    link: "https://leetcode.com/problems/two-sum/",
    tagId: 3,
  },
  {
    name: "Jewels and Stones",
    description:
      "Given two strings of ‘jewels’ and ‘stones’, return the number of stones which are jewels.",
    difficulty: 1,
    link: "https://leetcode.com/problems/jewels-and-stones/",
    tagId: 3,
  },
  {
    name: "Word Patten",
    description:
      "Given two strings, one a string of words the other a pattern, determine whether or not the pattern of words matches the pattern of characters in the string.",
    link: "https://leetcode.com/problems/word-pattern/",
    difficulty: 1,
    tagId: 3,
  },
  {
    name: "Maximum Number of 'Balloon's",
    description:
      "Given a string of letters, return how many times you could use those letters to form the word 'balloon'.",
    link: "https://leetcode.com/problems/maximum-number-of-balloons/",
    difficulty: 1,
    tagId: 3,
  },
  {
    name: "Longest Palindrome",
    description:
      "Given a string of letters, return the length of the longest palindrome that could be constructed with those letters.",
    link: "https://leetcode.com/problems/longest-palindrome/",
    difficulty: 1,
    tagId: 3,
  },
  {
    name: "Check if N and It's Double Exist",
    description:
      "Given an array of integers, check if there is an element in the array that is double another element (i.e. 10 is double 5).",
    link: "https://leetcode.com/problems/check-if-n-and-its-double-exist/",
    difficulty: 1,
    tagId: 3,
  },
  {
    name: "Isomorphic Strings",
    description:
      "Given two strings, determine if two strings are isomorphic (characters in string A can be replaced to get string B).",
    link: "https://leetcode.com/problems/isomorphic-strings/",
    difficulty: 2,
    tagId: 3,
  },
  {
    name: "Longest Harmonious Subsequence",
    description:
      "Given an array of integers, find the length of the longest harmonious subsequence. A harmonious subsequence is an sequence in which its min and max element differ by exactly 1.",
    link: "https://leetcode.com/problems/longest-harmonious-subsequence/",
    difficulty: 2,
    tagId: 3,
  },
  {
    name: "Most Common Word",
    description:
      "Given a paragraph string (containing punctuation, spaces, and capital and lowercase letters), and a list of banned words, count the most frequent, non-banned word.",
    link: "https://leetcode.com/problems/most-common-word/",
    difficulty: 2,
    tagId: 3,
  },
  {
    name: "Valid Sudoku",
    description:
      "Given a 2D matrix representing a sudoku board, return whether or not it is a valid sudoku board.",
    link: "https://leetcode.com/problems/valid-sudoku/",
    difficulty: 3,
    tagId: 3,
  },
  {
    name: "Brick Wall",
    description:
      "Given a 2D matrix of “bricks”, return the fewest bricks you could intersect with a vertical line from top to bottom. The problem itself has a diagram that will make it clearer.",
    link: "https://leetcode.com/problems/brick-wall/",
    difficulty: 3,
    tagId: 3,
  },
  {
    name: "Prison Cells After N Days",
    description: "Find the state of 8 prison cells after N days.",
    link: "https://leetcode.com/problems/prison-cells-after-n-days/",
    difficulty: 4,
    tagId: 3,
  },
  // -------------------------- LINKED LIST (4) --------------------------
  {
    name: "Reverse Linked List",
    description:
      "Given a linked list (via reference to its head node), return it in reversed order.",
    difficulty: 1,
    link: "https://leetcode.com/problems/reverse-linked-list/",
    tagId: 4,
  },
  {
    name: "Flatten Multilevel Doubly Linked List",
    description:
      "Given a doubly linked list that has an additional 'child' pointer that may point to another doubly linked list, return a flattened version of the list.",
    link:
      "https://leetcode.com/problems/flatten-a-multilevel-doubly-linked-list/",
    tagId: 4,
    difficulty: 4,
  },
  {
    name: "Odd Even Linked List",
    description:
      "Given a singly linked list, move all the even 'indexed' nodes to the end and all of the 'odd' indexed nodes to the front of the linked list and return that new list.",
    link: "https://leetcode.com/problems/odd-even-linked-list/",
    tagId: 4,
    difficulty: 3,
  },
  {
    name: "Merge Two Sorted Lists",
    description:
      "Given two sorted linked lists, merge them into one sorted list.",
    difficulty: 1,
    link: "https://leetcode.com/problems/merge-two-sorted-lists/",
    tagId: 4,
  },
  {
    name: "Middle of Linked List",
    description: "Given a non-empty linked list, return its middle element.",
    difficulty: 1,
    link: "https://leetcode.com/problems/middle-of-the-linked-list/",
    tagId: 4,
  },
  {
    name: "Copy List with Random Pointer",
    description:
      "A linked list is given such that each node contains an additional random pointer which could point to any node in the list or null.  Return a deep copy of the list.",
    difficulty: 3,
    link: "https://leetcode.com/problems/copy-list-with-random-pointer/",
    tagId: 4,
  },
  {
    name: "Merge k Sorted Lists",
    description:
      "Merge k sorted linked lists and return it as one sorted list. Analyze and describe its complexity.",
    difficulty: 5,
    link: "https://leetcode.com/problems/merge-k-sorted-lists/",
    tagId: 4,
  },
  {
    name: "Remove 0 Sum Adj. Nodes From Linked List",
    description:
      "Given a linked list, delete consecutive nodes that sum up to 0 and return the resulting linked list.",
    difficulty: 4,
    tagId: 4,
    link:
      "https://leetcode.com/problems/remove-zero-sum-consecutive-nodes-from-linked-list/",
  },
  {
    name: "Linked List Cycle",
    description:
      "Given a linked list that may or may not contain a cycle, return whether or not the list contains a cycle.",
    link: "https://leetcode.com/problems/linked-list-cycle/",
    difficulty: 2,
    tagId: 4,
  },
  {
    name: "Next Greater Node In Linked List",
    description:
      "Given a linked list with nodes that have values of positive integers, return an array containing the value of the next greater node.",
    difficulty: 3,
    link: "https://leetcode.com/problems/next-greater-node-in-linked-list/",
    tagId: 4,
  },
  // ---------------------------- TREE (5) ----------------------------
  {
    name: "Same Tree",
    description:
      "Given two binary trees, write a function to check if they are the same or not. Two binary trees are considered the same if they are structurally identical and the nodes have the same value.",
    difficulty: 1,
    link: "https://leetcode.com/problems/same-tree/",
    tagId: 5,
  },
  {
    name: "Merge Two Binary Trees",
    description:
      "Given two binary trees and imagine that when you put one of them to cover the other, some nodes of the two trees are overlapped while the others are not. You need to merge them into a new binary tree. The merge rule is that if two nodes overlap, then sum node values up as the new value of the merged node. Otherwise, the NOT null node will be used as the node of new tree.",
    difficulty: 1,
    link: "https://leetcode.com/problems/merge-two-binary-trees/",
    tagId: 5,
  },
  {
    name: "N-ary Tree Preorder Traversal",
    description:
      "Given an n-ary tree, return the preorder traversal of its nodes' values. Nary-Tree input serialization is represented in their level order traversal, each group of children is separated by the null value.",
    difficulty: 1,
    link: "https://leetcode.com/problems/n-ary-tree-preorder-traversal/",
    tagId: 5,
  },
  {
    name: "Univalued Binary Tree",
    description:
      "A binary tree is univalued if every node in the tree has the same value. Return true if and only if the given tree is univalued.",
    difficulty: 1,
    link: "https://leetcode.com/problems/univalued-binary-tree/",
    tagId: 5,
  },
  {
    name: "Symmetric Tree",
    description:
      "Given a binary tree, check whether it is a mirror of itself (ie, symmetric around its center).",
    difficulty: 2,
    link: "https://leetcode.com/problems/symmetric-tree/",
    tagId: 5,
  },
  {
    name: "Leaf-Similar Trees",
    description:
      "Consider all the leaves of a binary tree.  From left to right order, the values of those leaves form a leaf value sequence. Two binary trees are considered leaf-similar if their leaf value sequence is the same. Return true if and only if the two given trees with head nodes root1 and root2 are leaf-similar.",
    difficulty: 2,
    link: "https://leetcode.com/problems/leaf-similar-trees/",
    tagId: 5,
  },
  {
    name: "Trim a Binary Search Tree",
    description:
      "Given a binary search tree and the lowest and highest boundaries as L and R, trim the tree so that all its elements lies in [L, R] (R >= L). You might need to change the root of the tree, so the result should return the new root of the trimmed binary search tree.",
    difficulty: 2,
    link: "https://leetcode.com/problems/trim-a-binary-search-tree/",
    tagId: 5,
  },
  {
    name: "Deepest Leaves Sum",
    description:
      "Given a binary tree, return the sum of values of its deepest leaves.",
    difficulty: 2,
    link: "https://leetcode.com/problems/deepest-leaves-sum/",
    tagId: 5,
  },
  {
    name: "Path Sum III",
    description:
      "You are given a binary tree in which each node contains an integer value. Find the number of paths that sum to a given value. The path does not need to start or end at the root or a leaf, but it must go downwards (traveling only from parent nodes to child nodes).",
    difficulty: 3,
    link: "https://leetcode.com/problems/path-sum-iii/",
    tagId: 5,
  },
  {
    name: "Validate Binary Search Tree",
    description:
      "Given a binary tree, determine if it is a valid binary search tree (BST).",
    difficulty: 3,
    link: "https://leetcode.com/problems/validate-binary-search-tree/",
    tagId: 5,
  },
  {
    name: "Delete Leaves With a Given Value",
    description:
      "Given a binary tree root and an integer target, delete all the leaf nodes with value target.",
    difficulty: 3,
    link: "https://leetcode.com/problems/delete-leaves-with-a-given-value/",
    tagId: 5,
  },
  {
    name: "Binary Tree Maximum Path Sum",
    description:
      "Given a non-empty binary tree, find the maximum path sum. For this problem, a path is defined as any sequence of nodes from some starting node to any node in the tree along the parent-child connections. The path must contain at least one node and does not need to go through the root.",
    difficulty: 4,
    link: "https://leetcode.com/problems/binary-tree-maximum-path-sum/",
    tagId: 5,
  },
  // ---------------------- DEPTH FIRST SEARCH (6) ----------------------
  {
    name: "Flood Fill",
    description:
      "Given a 2D matrix, a starting row, a starting column, and a new ‘color’ integer, change all of the 4-directionally adjacent (north, east, south, west) cells to the new color, and all of the adjacent ones to those to the new color, etc.",
    difficulty: 1,
    link: "https://leetcode.com/problems/flood-fill/",
    tagId: 6,
  },
  {
    name: "Number of Islands",
    description:
      "Given a 2d grid map of '1's (land) and '0's (water), count the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.",
    difficulty: 3,
    link: "https://leetcode.com/problems/number-of-islands/",
    tagId: 6,
  },
  {
    name: "Max Area of Island",
    description:
      "Given a non-empty 2D array grid of 0's and 1's, an island is a group of 1's (representing land) connected 4-directionally (horizontal or vertical.) You may assume all four edges of the grid are surrounded by water. Find the maximum area of an island in the given 2D array.",
    difficulty: 3,
    link: "https://leetcode.com/problems/max-area-of-island/",
    tagId: 6,
  },
  {
    name: "Friend Circles",
    description:
      "There are N students in a class. Some of them are friends, while some are not. Their friendship is transitive in nature. Given a N*N matrix M representing the friend relationship between students in the class. And you have to output the total number of friend circles among all the students.",
    difficulty: 3,
    link: "https://leetcode.com/problems/friend-circles/",
    tagId: 6,
  },
  {
    name: "Longest Increasing Path In Matrix",
    description:
      "Given a matrix of integers, return the length of the longest strictly increasing path in the matrix. Paths must not include the same element twice and can only include immediately adjacent (not diagonally adjacent) elements.",
    difficulty: 4,
    link: "https://leetcode.com/problems/longest-increasing-path-in-a-matrix/",
    tagId: 6,
  },
  // ------------------------- STACKS (7) -------------------------
  {
    name: "Min Stack",
    description:
      "Design a data structure structure which supports push, pop, top, and get minimum element operations.",
    difficulty: 1,
    link: "https://leetcode.com/problems/min-stack/",
    tagId: 7,
  },
  {
    name: "Reverse Polish Notation",
    description:
      "Evaluate the value of an arithmetic expression in Reverse Polish Notation. Valid operators are +, -, *, /. Each operand may be an integer or another expression. Note: Division between two integers should truncate toward zero. The given RPN expression is always valid. That means the expression would always evaluate to a result and there won't be any divide by zero operation.",
    difficulty: 3,
    link: "https://leetcode.com/problems/evaluate-reverse-polish-notation/",
    tagId: 7,
  },
  {
    name: "Asteroid Collision",
    description:
      "We are given an array asteroids of integers representing asteroids in a row. Find out the state of the asteroids after all collisions. If two asteroids meet, the smaller one will explode. If both are the same size, both will explode. Two asteroids moving in the same direction will never meet.",
    difficulty: 3,
    link: "https://leetcode.com/problems/asteroid-collision/",
    tagId: 7,
  },
  {
    name: "Remove All Adjacent Duplicates in String II",
    description:
      "Given a string s and an integer k, remove all the substrings that have k adjacent, equal characters and return the resulting string.",
    difficulty: 3,
    link:
      "https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string-ii/",
    tagId: 7,
  },
  {
    name: "Trapping Rain Water",
    description:
      "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it is able to trap after raining.",
    difficulty: 5,
    link: "https://leetcode.com/problems/trapping-rain-water/",
    tagId: 7,
  },
  {
    name: "Daily Temperatures",
    description:
      "Given a list of daily temperatures T, return a list such that, for each day in the input, tells you how many days you would have to wait until a warmer temperature. If there is no future day for which this is possible, put 0 instead. For example, given the list of temperatures T = [73, 74, 75, 71, 69, 72, 76, 73], your output should be [1, 1, 4, 2, 1, 1, 0, 0]. Note: The length of temperatures will be in the range [1, 30000]. Each temperature will be an integer in the range [30, 100].",
    difficulty: 3,
    link: "https://leetcode.com/problems/daily-temperatures/",
    tagId: 7,
  },
  {
    name: "Largest Rectangle in Histogram",
    description:
      "Given n non-negative integers representing the histogram's bar height where the width of each bar is 1, find the area of largest rectangle in the histogram.",
    difficulty: 4,
    link: "https://leetcode.com/problems/largest-rectangle-in-histogram/",
    tagId: 7,
  },
  {
    name: "Longest Valid Parentheses",
    description:
      "Given a string containing just the characters '(' and ')', find the length of the longest valid (well-formed) parentheses substring.",
    difficulty: 5,
    link: "https://leetcode.com/problems/longest-valid-parentheses/",
    tagId: 7,
  },
  // -------------------- BREADTH FIRST SEARCH (8) --------------------
  {
    name: "Pacific Atlantic Water Flow",
    description:
      "Given an integer matrix representing the height of land, return the indices of the matrix that can flow to both the bottom-left and top-right sides of the matrix when water can only flow from a higher height to a lower or equal height.",
    difficulty: 3,
    link: "https://leetcode.com/problems/pacific-atlantic-water-flow/",
    tagId: 8,
  },
  {
    name: "01 Matrix",
    description:
      "Given a matrix of 1s and 0s, find the distance of the nearest 0 for each cell and return the resulting matrix.",
    difficulty: 3,
    link: "https://leetcode.com/problems/01-matrix/",
    tagId: 8,
  },
  {
    name: "Rotting Oranges",
    description:
      "Given a matrix of 0s representing empty spaces, 1s representing fresh oranges, or 2s representing rotting oranges, return the number of days until no cells have fresh oranges. Each day, fresh oranges next to adjacent oranges become rotten.",
    link: "https://leetcode.com/problems/rotting-oranges/",
    tagId: 8,
    difficulty: 3,
  },
  {
    name: "Open The Lock",
    description:
      "Given a lock with 4 circular wheels with single digit numbers on the wheels (starting at position '0000'), a list of dead-end lock positions, and a target lock position, return the minimum number of wheel turns necessary to reach the target position.",
    link: "https://leetcode.com/problems/open-the-lock/",
    tagId: 8,
    difficulty: 4,
  },
  // ------------------ RECURSION / BACKTRACKING (9) ------------------
  {
    name: "Letter Case Permutation",
    description:
      "Given a string S, we can transform every letter individually to be lowercase or uppercase to create another string.  Return a list of all possible strings we could create.",
    difficulty: 1,
    link: "https://leetcode.com/problems/letter-case-permutation/",
    tagId: 9,
  },
  {
    name: "Subsets",
    description:
      "Given a set of distinct integers, nums, return all possible subsets (the power set). Note: The solution set must not contain duplicate subsets.",
    difficulty: 3,
    link: "https://leetcode.com/problems/subsets/",
    tagId: 9,
  },
  {
    name: "Combination Sum",
    description:
      "Given a set of candidate numbers (candidates) (without duplicates) and a target number (target), find all unique combinations in candidates where the candidate numbers sums to target. The same repeated number may be chosen from candidates unlimited number of times. Note: All numbers (including target) will be positive integers. The solution set must not contain duplicate combinations.",
    difficulty: 3,
    link: "https://leetcode.com/problems/combination-sum/",
    tagId: 9,
  },
  {
    name: "Combinations",
    description:
      "Given two integers n and k, return all possible combinations of k numbers out of 1 ... n.",
    difficulty: 3,
    link: "https://leetcode.com/problems/combinations/",
    tagId: 9,
  },
  {
    name: "Permutations",
    description:
      "Given a collection of distinct integers, return all possible permutations.",
    difficulty: 3,
    link: "https://leetcode.com/problems/permutations/",
    tagId: 9,
  },
  {
    name: "Subsets II",
    description:
      "Given a collection of integers that might contain duplicates, nums, return all possible subsets (the power set). Note: The solution set must not contain duplicate subsets.",
    difficulty: 4,
    link: "https://leetcode.com/problems/subsets-ii/",
    tagId: 9,
  },
  {
    name: "Permutations II",
    description:
      "Given a collection of numbers that might contain duplicates, return all possible unique permutations.",
    difficulty: 4,
    link: "https://leetcode.com/problems/permutations-ii/",
    tagId: 9,
  },
  {
    name: "Generate Parentheses",
    description:
      "Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.",
    difficulty: 4,
    link: "https://leetcode.com/problems/generate-parentheses/",
    tagId: 9,
  },
  {
    name: "Letter Combinations of a Phone Number",
    description:
      "Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent.",
    difficulty: 4,
    link:
      "https://leetcode.com/problems/letter-combinations-of-a-phone-number/",
    tagId: 9,
  },
  {
    name: "Combination Sum II",
    description:
      "Given a collection of candidate numbers (candidates) and a target number (target), find all unique combinations in candidates where the candidate numbers sums to target. Each number in candidates may only be used once in the combination. Note: All numbers (including target) will be positive integers and the solution set must not contain duplicate combinations.",
    difficulty: 4,
    link: "https://leetcode.com/problems/combination-sum-ii/",
    tagId: 9,
  },
  {
    name: "Palindrome Partitioning",
    description:
      "Given a string s, partition s such that every substring of the partition is a palindrome. Return all possible palindrome partitioning of s.",
    difficulty: 4,
    link: "https://leetcode.com/problems/palindrome-partitioning/",
    tagId: 9,
  },
  {
    name: "N-Queens",
    description:
      "The n-queens puzzle is the problem of placing n queens on an n×n chessboard such that no two queens attack each other. Given an integer n, return all distinct solutions to the n-queens puzzle.",
    difficulty: 5,
    link: "https://leetcode.com/problems/n-queens/",
    tagId: 9,
  },
  // -------------------- DYNAMIC PROGRAMMING (10) --------------------
  {
    name: "Best Time to Buy and Sell Stock",
    description:
      "Say you have an array for which the ith element is the price of a given stock on day i. If you were only permitted to complete at most one transaction (i.e., buy one and sell one share of the stock), design an algorithm to find the maximum profit. Note that you cannot sell a stock before you buy one.",
    difficulty: 1,
    link: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
    tagId: 10,
  },
  {
    name: "House Robber",
    description:
      "You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security system connected and it will automatically contact the police if two adjacent houses were broken into on the same night. Given a list of non-negative integers representing the amount of money of each house, determine the maximum amount of money you can rob tonight without alerting the police.",
    difficulty: 1,
    link: "https://leetcode.com/problems/house-robber/",
    tagId: 10,
  },
  {
    name: "Min Cost Climbing Stairs",
    description:
      "On a staircase, the i-th step has some non-negative cost cost[i] assigned (0 indexed). Once you pay the cost, you can either climb one or two steps. You need to find minimum cost to reach the top of the floor, and you can either start from the step with index 0, or the step with index 1.",
    difficulty: 1,
    link: "https://leetcode.com/problems/min-cost-climbing-stairs/",
    tagId: 10,
  },
  {
    name: "Climbing Stairs",
    description:
      "You are climbing a stair case. It takes n steps to reach to the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top? Note: Given n will be a positive integer.",
    difficulty: 1,
    link: "https://leetcode.com/problems/climbing-stairs/",
    tagId: 10,
  },
  {
    name: "Unique Paths",
    description:
      "A robot is located at the top-left corner of a m x n grid (marked 'Start' in the diagram below). The robot can only move either down or right at any point in time. The robot is trying to reach the bottom-right corner of the grid (marked 'Finish' in the diagram below). How many possible unique paths are there?",
    difficulty: 3,
    link: "https://leetcode.com/problems/unique-paths/",
    tagId: 10,
  },
  {
    name: "Minimum Path Sum",
    description:
      "Given a m x n grid filled with non-negative numbers, find a path from top left to bottom right which minimizes the sum of all numbers along its path. Note: You can only move either down or right at any point in time.",
    difficulty: 3,
    link: "https://leetcode.com/problems/minimum-path-sum/",
    tagId: 10,
  },
  {
    name: "Coin Change",
    description:
      "You are given coins of different denominations and a total amount of money amount. Write a function to compute the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.",
    difficulty: 3,
    link: "https://leetcode.com/problems/coin-change/",
    tagId: 10,
  },
  {
    name: "Unique Paths II",
    description:
      "A robot is located at the top-left corner of a m x n grid (marked 'Start' in the diagram below). The robot can only move either down or right at any point in time. The robot is trying to reach the bottom-right corner of the grid (marked 'Finish' in the diagram below). Now consider if some obstacles are added to the grids. How many unique paths would there be?",
    difficulty: 4,
    link: "https://leetcode.com/problems/unique-paths-ii/",
    tagId: 10,
  },
  {
    name: "Maximal Square",
    description:
      "Given a 2D binary matrix filled with 0's and 1's, find the largest square containing only 1's and return its area.",
    difficulty: 4,
    link: "https://leetcode.com/problems/maximal-square/",
    tagId: 10,
  },
  {
    name: "Edit Distance",
    description:
      "Given two words word1 and word2, find the minimum number of operations required to convert word1 to word2. You have the following 3 operations permitted on a word: Insert a character, Delete a character, Replace a character.",
    difficulty: 5,
    link: "https://leetcode.com/problems/edit-distance/",
    tagId: 10,
  },
  {
    name: "Regular Expression Matching",
    description:
      "Given a limited regular expression and a string, return whether or not the pattern matches the string.",
    difficulty: 5,
    link: "https://leetcode.com/problems/regular-expression-matching/",
    tagId: 10,
  },
  {
    name: "Word Break II",
    description:
      "Given a dictionary of words and a string, return all the ways that the string can be partitioned so that it contains words in the dictionary.",
    difficulty: 5,
    link: "https://leetcode.com/problems/word-break-ii/",
    tagId: 10,
  },
  {
    name: "Longest Increasing Subsequence",
    description:
      "Given an array of integers, return the length of the longest increasing subsequence in the array. In a subsequence, each element in the subsequence should come strictly after the previous element in the subsequence.",
    link: "https://leetcode.com/problems/longest-increasing-subsequence/",
    difficulty: 3,
    tagId: 10,
  },
  {
    name: "Matrix Block Sum",
    description:
      "Given a matrix and an integer K, return a matrix where each cell in that matrix contains the value of the sum of surrounding elements in a square with size proportional to K.",
    link: "https://leetcode.com/problems/matrix-block-sum/",
    difficulty: 3,
    tagId: 10,
  },
  // -------------------------- HEAPS (11) --------------------------
  {
    name: "Rank Teams by Votes",
    description:
      "Given an array of strings votes which is the votes of all voters in the ranking systems. Sort all teams according to the ranking system described above. Return a string of all teams sorted by the ranking system.",
    difficulty: 3,
    link: "https://leetcode.com/problems/rank-teams-by-votes/",
    tagId: 11,
  },
  {
    name: "Maximum Number of Events That Can Be Attended",
    description:
      "Given an array of events where events[i] = [startDayi, endDayi]. Every event i starts at startDayi and ends at endDayi. You can attend an event i at any day d where startTimei <= d <= endTimei. Notice that you can only attend one event at any time d. Return the maximum number of events you can attend.",
    difficulty: 4,
    link:
      "https://leetcode.com/problems/maximum-number-of-events-that-can-be-attended/",
    tagId: 11,
  },
  {
    name: "Top K Frequent Elements",
    description:
      "Given a list of integers and an integer K, return the top K most frequent elements.",
    difficulty: 3,
    link: "https://leetcode.com/problems/top-k-frequent-elements/",
    tagId: 11,
  },
  {
    name: "Find Median From Data Stream",
    description:
      "Given a stream of data (you get the whole set of data with each successive call of the function you write), return the median of all the elements after each call.",
    difficulty: 5,
    link: "https://leetcode.com/problems/find-median-from-data-stream/",
    tagId: 11,
  },
  // --------------------------- GRAPHS (12) ---------------------------
  {
    name: "Redundant Connection",
    description:
      "Given an undirected graph (represented as an integer array of edges) with at least one redundant connection, return the last redundant connection.",
    difficulty: 3,
    link: "https://leetcode.com/problems/redundant-connection/",
    tagId: 12,
  },
  {
    name: "Connected Network",
    description:
      "Given an undirected graph (represented as an array of edges) return the fewest number of connections you need to make to connect all of the edges in the graph.",
    difficulty: 3,
    link:
      "https://leetcode.com/problems/number-of-operations-to-make-network-connected/",
    tagId: 12,
  },
  {
    name: "Accounts Merge",
    description:
      "Given a list of lists of strings representing accounts, merge the accounts with the same email and return the new list of accounts.",
    difficulty: 4,
    link: "https://leetcode.com/problems/accounts-merge/",
    tagId: 12,
  },
  {
    name: "Smallest String with Swaps",
    description:
      "Given a string and a 2D array of indices representing a connected pair of characters, find the lexicographically smallest string that can be made by swapping characters in the pairs. The pairs can be swapped any number of times.",
    difficulty: 4,
    link: "https://leetcode.com/problems/smallest-string-with-swaps/",
    tagId: 12,
  },
  {
    name: "Evaluate Division",
    description:
      "Given a list of equations with answers and a list of equations without answers, use the equations with answers to return an array of answers to the given equations without answers.",
    difficulty: 4,
    link: "https://leetcode.com/problems/evaluate-division/",
    tagId: 12,
  },
  {
    name: "Course Schedule",
    description:
      "Given a list of courses and prerequisites, return whether or not it is possible to take all the courses. You must take all of a course's prerequisites before you can take the course itself.",
    difficulty: 4,
    link: "https://leetcode.com/problems/course-schedule/",
    tagId: 12,
  },
  // ---------------------- BIT MANIPULATION (13) ----------------------
  {
    name: "Steps To Reduce A Number To 0",
    description:
      "Given a number n, divide n by 2 if its even and subtract one from n if its odd. Return the number of those operations needed to reduce n to 0.",
    difficulty: 1,
    link:
      "https://leetcode.com/problems/number-of-steps-to-reduce-a-number-to-zero/",
    tagId: 13,
  },
  {
    name: "Hamming Distance",
    description:
      "The Hamming distance between two integers is the number of positions at which the corresponding bits are different. Given two integers x and y, calculate the Hamming distance.",
    difficulty: 2,
    link: "https://leetcode.com/problems/hamming-distance/",
    tagId: 13,
  },
  {
    name: "Minimum Flips to Make a OR b Equal to c",
    description:
      "Given 3 positives numbers a, b and c. Return the minimum flips required in some bits of a and b to make ( a OR b == c ). (bitwise OR operation). Flip operation consists of change any single bit 1 to 0 or change the bit 0 to 1 in their binary representation.",
    difficulty: 3,
    link:
      "https://leetcode.com/problems/minimum-flips-to-make-a-or-b-equal-to-c/",
    tagId: 13,
  },
];

const tagBulk = [
  {
    name: "Array",
    ranking: 1,
  },
  {
    name: "String",
    ranking: 2,
  },
  {
    name: "HashMap",
    ranking: 3,
  },
  {
    name: "Linked List",
    ranking: 4,
  },

  {
    name: "Tree",
    ranking: 5,
  },
  {
    name: "Depth-First Search",
    ranking: 6,
  },
  {
    name: "Stack / Queue",
    ranking: 7,
  },
  {
    name: "Breadth-First Search",
    ranking: 8,
  },
  {
    name: "Backtracking",
    ranking: 9,
  },
  {
    name: "Dynamic Programming",
    ranking: 10,
  },
  {
    name: "Heap / Priority Queue",
    ranking: 11,
  },
  {
    name: "Graph",
    ranking: 12,
  },
  {
    name: "Bit Manipulation",
    ranking: 13,
  },
];

async function seed() {
  await db.sync({ force: true });

  await Tag.bulkCreate(tagBulk);
  await Question.bulkCreate(questionBulk);

  if (process.env.NODE_ENV === "development") {
    const { userBulk, likeBulk } = require("./seedData");

    if (userBulk && userBulk.length) {
      await User.bulkCreate(userBulk);
      await Like.bulkCreate(likeBulk);
    }
  }

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
