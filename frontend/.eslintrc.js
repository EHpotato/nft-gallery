module.exports = {
    // "env": {
    //     "browser": true,
    //     "es2021": true
    // },
    "ignorePatterns": [
        "*.test.js", ".eslintrc.js",
    ],
    "extends": [
        "eslint:recommended",
        "plugin:prettier/recommended",
        "prettier",
        "react-app",
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "settings": {
        "react": {
            "version": "detect"
        }
    },
    "parser": 'babel-eslint',
    "plugins": [
        "react",
        "prettier"
    ],
    "rules": {
        "no-unused-vars": [
            "error",
            {
                args: "after-used",
                argsIgnorePattern: "^_",
                varsIgnorePattern: "^_",
            },
        ],
        "no-var": "error",
        "prettier/prettier": "error",
    }
};
