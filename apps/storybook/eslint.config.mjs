import { config as baseConfig } from "@unnamed/eslint-config/storybook"

/**
 * @type {import("eslint").Linter.Config}
 */
const config = [
  ...baseConfig,
  {
    ignores: ["!.storybook/*"],
  },
]

export default config
