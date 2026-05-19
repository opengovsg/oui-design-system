import { config as baseConfig } from "@oui/eslint-config/react-internal"

const config = [
  ...baseConfig,
  {
    ignores: [".next/", "node_modules/", "src/components/oui/", "src/lib/oui/"],
  },
]

export default config
