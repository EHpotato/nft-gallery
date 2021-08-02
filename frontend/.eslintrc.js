module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "ignorePatterns": [
        "*.test.js", ".eslintrc.js",
    ],
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:prettier/recommended",
        "plugin:jest/recommended",
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
        "react/react-in-jsx-scope": "off",
        // allow jsx syntax in js files (for next.js project)
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
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
