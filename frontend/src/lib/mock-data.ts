export const MOCK_LANGUAGES = [
  { id: 'js', name: 'JavaScript', icon: 'JS', snippetsCount: 120, color: 'text-yellow-500' },
  { id: 'ts', name: 'TypeScript', icon: 'TS', snippetsCount: 85, color: 'text-blue-500' },
  { id: 'py', name: 'Python', icon: 'PY', snippetsCount: 150, color: 'text-blue-400' },
  { id: 'cpp', name: 'C++', icon: 'C++', snippetsCount: 60, color: 'text-blue-600' },
  { id: 'java', name: 'Java', icon: 'JV', snippetsCount: 45, color: 'text-red-500' },
  { id: 'go', name: 'Go', icon: 'GO', snippetsCount: 30, color: 'text-cyan-500' },
  { id: 'rust', name: 'Rust', icon: 'RS', snippetsCount: 25, color: 'text-orange-600' },
  { id: 'php', name: 'PHP', icon: 'PHP', snippetsCount: 40, color: 'text-indigo-400' },
];

export const MOCK_CATEGORIES = [
  { id: 'fundamentals', name: 'Fundamentals', languageId: 'js' },
  { id: 'arrays', name: 'Arrays & Loops', languageId: 'js' },
  { id: 'web', name: 'Web APIs', languageId: 'js' },
  { id: 'async', name: 'Asynchronous', languageId: 'js' },
];

export const MOCK_SNIPPETS = [
  { 
    id: 's1', 
    title: 'Array Filter Example', 
    description: 'Filter numbers greater than 10', 
    code: 'const nums = [5, 12, 8, 130, 44];\nconst filtered = nums.filter(n => n > 10);\nconsole.log(filtered);', 
    languageId: 'js',
    categoryId: 'arrays',
    tags: ['filter', 'arrays'],
    aiBadge: 'Optimized'
  },
  { 
    id: 's2', 
    title: 'Fetch API POST', 
    description: 'Simple POST request using fetch', 
    code: 'async function postData(url = "", data = {}) {\n  const response = await fetch(url, {\n    method: "POST",\n    body: JSON.stringify(data)\n  });\n  return response.json();\n}', 
    languageId: 'js',
    categoryId: 'async',
    tags: ['fetch', 'async', 'api'],
    aiBadge: 'Recommended'
  },
];

export const MOCK_LESSONS = [
  {
    id: 'l1',
    title: 'Introduction to JavaScript Promises',
    description: 'Learn the basics of asynchronous programming in JS.',
    content: '# Promises in JavaScript\n\nA Promise is an object representing the eventual completion or failure of an asynchronous operation.\n\n## Why use Promises?\n- Avoid callback hell\n- Better error handling\n- Cleaner syntax',
    languageId: 'js',
    duration: '10 min',
    level: 'Beginner'
  },
  {
    id: 'l2',
    title: 'Advanced React Hooks',
    description: 'Deep dive into useMemo, useCallback, and custom hooks.',
    content: '# Advanced React Hooks\n\nLearn how to optimize your React applications using built-in optimization hooks.',
    languageId: 'js',
    duration: '25 min',
    level: 'Advanced'
  },
];
