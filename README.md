// ! problem 1
{
  "title": "Palindrome Checker",
  "description": "Determine whether a given string is a palindrome. A palindrome is a string that reads the same backward as forward.",
  "difficulty": "easy",
  "tags": "string",
  "visibleTestCases": [
    {
      "input": "\"racecar\"",
      "output": "true",
      "explanation": "racecar reversed is still racecar"
    },
    {
      "input": "\"hello\"",
      "output": "false",
      "explanation": "hello reversed is olleh, which is not equal"
    }
  ],
  "hiddenTestCases": [
    {
      "input": "\"madam\"",
      "output": "true"
    },
    {
      "input": "\"world\"",
      "output": "false"
    }
  ],
  "startCode": [
    {
      "language": "c++",
      "initialCode": "#include <iostream>\nusing namespace std;\n\nbool isPalindrome(string s) {\n  // Your code here\n}\n\nint main() {\n  string input;\n  cin >> input;\n  cout << (isPalindrome(input) ? \"true\" : \"false\");\n  return 0;\n}"
    }
  ],
  "referenceSolution": [
    {
      "language": "c++",
      "completeCode": "#include <iostream>\nusing namespace std;\n\nbool isPalindrome(string s) {\n  int left = 0, right = s.size() - 1;\n  while (left < right) {\n    if (s[left] != s[right]) return false;\n    left++;\n    right--;\n  }\n  return true;\n}\n\nint main() {\n  string input;\n  cin >> input;\n  cout << (isPalindrome(input) ? \"true\" : \"false\");\n  return 0;\n}"
    }
  ]
}


// ! problem 2
{
  "title": "Factorial",
  "description": "Given a non-negative integer n, return the factorial of n.",
  "difficulty": "easy",
  "tags": "math",
  "visibleTestCases": [
    {
      "input": "5",
      "output": "120",
      "explanation": "5! = 5 * 4 * 3 * 2 * 1 = 120"
    }
  ],
  "hiddenTestCases": [
    {
      "input": "0",
      "output": "1"
    }
  ],
  "startCode": [
    {
      "language": "c++",
      "initialCode": "#include <iostream>\nusing namespace std;\n\nint factorial(int n) {\n  // your code here\n}"
    }
  ],
  "referenceSolution": [
    {
      "language": "c++",
      "completeCode": "#include <iostream>\nusing namespace std;\n\nint factorial(int n) {\n    if (n <= 1) return 1;\n    return n * factorial(n - 1);\n}\n\nint main() {\n    int n;\n    cin >> n;\n    cout << factorial(n) << endl;\n    return 0;\n}"
    }
  ]
}


// problem 3
{
  "title": "Two Sum",
  "description": "Given an array of integers, return indices of the two numbers such that they add up to a specific target.",
  "difficulty": "easy",
  "tags": "array",
  "visibleTestCases": [
    {
      "input": "nums = [2,7,11,15], target = 9",
      "output": "[0,1]",
      "explanation": "Because nums[0] + nums[1] == 9"
    }
  ],
  "hiddenTestCases": [
    {
      "input": "nums = [3,3], target = 6",
      "output": "[0,1]"
    }
  ],
  "startCode": [
    {
      "language": "javascript",
      "initialCode": "function twoSum(nums, target) {\n  // your code here\n}"
    }
  ],
  "referenceSolution": [
    {
      "language": "javascript",
      "completeCode": "function twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (map.has(complement)) {\n      return [map.get(complement), i];\n    }\n    map.set(nums[i], i);\n  }\n}\n\nconst input = require('fs').readFileSync(0, 'utf-8').trim();\nconst [numsLine, targetLine] = input.split(\", \");\nconst nums = JSON.parse(numsLine.split(\" = \")[1]);\nconst target = Number(targetLine.split(\" = \")[1]);\n\nconsole.log(JSON.stringify(twoSum(nums, target)));"
    }
  ]
}
