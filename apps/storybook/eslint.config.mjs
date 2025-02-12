import { config as baseConfig } from "@oui/eslint-config/storybook"

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
