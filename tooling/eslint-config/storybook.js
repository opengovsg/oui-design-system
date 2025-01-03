import { config as baseConfig } from "./react-internal.js";
import pluginStorybook from "eslint-plugin-storybook";

/**
 * A custom ESLint configuration for libraries that use Storybook.
 *
 * @type {import("eslint").Linter.Config}
 * */
export const config = [
  ...baseConfig,
  ...pluginStorybook.configs["flat/recommended"],
];
