/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ["@unnamed/eslint-config/storybook.js"],
  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
  overrides: [
    {
      files: [".eslintrc.js"],
      env: {
        node: true,
      },
    },
  ],
}
