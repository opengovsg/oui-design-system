// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import { config as baseConfig } from "@oui/eslint-config/storybook"

/**
 * @type {import("eslint").Linter.Config}
 */
const config = [...baseConfig, {
  ignores: ["!.storybook/*", "storybook-static"],
}, ...storybook.configs["flat/recommended"]]

export default config
