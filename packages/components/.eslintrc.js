/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ["@unnamed/eslint-config/react.js"],
  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
  overrides: [
    {
      files: ["*.stories.*"],
      extends: ["@unnamed/eslint-config/storybook.js"],
      parserOptions: {
        project: "tsconfig.json",
        tsconfigRootDir: __dirname,
        sourceType: "module",
      },
    },
  ],
};
