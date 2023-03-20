module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  overrides: [],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': 2, // mean error
    quotes: ['error', 'single'],
    'no-console': 1, //mean error
    'no-var': 'error',
    'prefer-const': 'error',
  },
};
