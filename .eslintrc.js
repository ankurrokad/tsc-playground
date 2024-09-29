module.exports = {
  parser: '@typescript-eslint/parser', // Use the TypeScript parser
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended', // Use recommended rules from the @typescript-eslint/eslint-plugin
  ],
  rules: {
    // Custom rules here, e.g.,
    '@typescript-eslint/no-explicit-any': 'off',
  },
};
