import { FlatCompat } from "@eslint/eslintrc"
import { config as baseConfig } from "@oui/eslint-config/react-internal"
import tseslint from "typescript-eslint"

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
})

const config = tseslint.config(
  baseConfig,
  compat.config({
    extends: ["next/core-web-vitals", "next/typescript"],
  }),
)

export default config
