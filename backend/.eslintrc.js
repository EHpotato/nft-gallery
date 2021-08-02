module.exports = {
    "root": true,
    "env": {
        'es6': true,
        'node': true,
    },
    "parserOptions": {
        "ecmaVersion": 2021,
    },
    "extends": ["plugin:prettier/recommended", "prettier", "eslint:recommended",],
    "plugins": ["prettier"],
    "ignorePatterns": [
        "*.test.js", ".eslintrc.js",
    ],
    "rules": {
        "prettier/prettier": "error",
        'no-unused-vars': ['error', { argsIgnorePattern: 'next' }],
        "no-var": "error",
    }
};
