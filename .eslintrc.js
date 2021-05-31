module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-typescript',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    "project": "./tsconfig.json",
    "tsconfigRootDir": __dirname
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
    'consistent-return': 0, // TODO: remove later
    'no-param-reassign': 0, // TODO: remove later
    'no-underscore-dangle': 0,
    // for (let i = 0; i < len; i++)
    'no-plusplus': 0,
    // https://eslint.org/docs/rules/no-continue
    // labeledLoop is conflicted with `eslint . --fix`
    'no-continue': 0,
    // ban this for Number.isNaN needs polyfill
    'no-restricted-globals': 0,
    'max-classes-per-file': 0,
    'no-debugger': 0,
    'no-lonely-if': 0,
    'no-empty': 0,

    // https://github.com/typescript-eslint/typescript-eslint/issues/2540#issuecomment-692866111
    'no-use-before-define': 0,
    '@typescript-eslint/no-use-before-define': 2,
    'no-shadow': 0,
    '@typescript-eslint/no-shadow': [2, {
      ignoreTypeValueShadow: true,
    }],
    '@typescript-eslint/ban-ts-comment': 0,
    // https://github.com/typescript-eslint/typescript-eslint/issues/2528#issuecomment-689369395
    'no-undef': 0,

    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-shadow': 'off',
    'func-names': 'off',
    'no-restricted-properties': 'off',
    'no-irregular-whitespace': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    'no-console': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-unused-expressions': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
  },
}
