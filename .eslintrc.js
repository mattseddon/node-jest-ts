module.exports = {
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier/@typescript-eslint",
        "plugin:prettier/recommended"
    ],
    plugins: ["@typescript-eslint", "jest", "prettier"],
    ignorePatterns: [
        ".build",
        ".localstack",
        ".serverless",
        ".eslintrc.js",
        "coverage",
        "jest.config.js"
    ],
    env: {
        commonjs: true,
        "jest/globals": true,
        node: true
    },
    parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname
    },
    parser: "@typescript-eslint/parser"
};
