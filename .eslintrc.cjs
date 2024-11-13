/** @type {import("eslint").Linter.Config} */
const config = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
  },
  plugins: ["@typescript-eslint"],
  extends: [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
  ],
  rules: {
    "@typescript-eslint/array-type": "off",
    "@typescript-eslint/consistent-type-definitions": "off",
    "@typescript-eslint/consistent-type-imports": [
      "warn",
      {
        prefer: "type-imports",
        fixStyle: "inline-type-imports",
      },
    ],
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        argsIgnorePattern: "^_",
      },
    ],
    "@typescript-eslint/require-await": "off",
    "@typescript-eslint/no-misused-promises": [
      "error",
      {
        checksVoidReturn: {
          attributes: false,
        },
      },
    ],
    // Allows "any" to be used now
    "@typescript-eslint/no-unsafe-return": "off", // Disable no-unsafe-return
    "@typescript-eslint/no-unsafe-call": "off", // Disable no-unsafe-call
    "@typescript-eslint/no-explicit-any": "off", // Disable no-explicit-any
    "@typescript-eslint/no-unsafe-argument": "off", // Disable no-unsafe-argument
    "@typescript-eslint/no-unsafe-assignment": "off", // Disable no-unsafe-assignment
    "@typescript-eslint/no-unsafe-member-access": "off", // Disable no-unsafe-member-access
  },
};
module.exports = config;
