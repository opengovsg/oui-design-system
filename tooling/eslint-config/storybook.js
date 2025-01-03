import { config as baseConfig } from "./react-internal.js";
import pluginStorybook from "eslint-plugin-storybook";
import pluginMdx from "eslint-plugin-mdx";

/**
 * A custom ESLint configuration for libraries that use Storybook.
 *
 * @type {import("eslint").Linter.Config}
 * */
export const storybookConfig = [
  ...baseConfig,
  ...pluginStorybook.configs["flat/recommended"],
  {
    ...pluginMdx.flat,
    // optional, if you want to lint code blocks at the same
    processor: pluginMdx.createRemarkProcessor({
      lintCodeBlocks: true,
      // optional, if you want to disable language mapper, set it to `false`
      // if you want to override the default language mapper inside, you can provide your own
      languageMapper: {},
    }),
  },
  {
    ...pluginMdx.flatCodeBlocks,
    rules: {
      ...pluginMdx.flatCodeBlocks.rules,
      // if you want to override some rules for code blocks
      "no-var": "error",
      "prefer-const": "error",
    },
  },
];
