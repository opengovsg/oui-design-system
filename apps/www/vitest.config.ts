import path from "node:path"
import { fileURLToPath } from "node:url"

import { defineConfig } from "vitest/config"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  test: {
    include: ["scripts/registry/**/*.test.ts"],
    environment: "node",
    testTimeout: 90000,
    hookTimeout: 90000,
  },
  resolve: {
    alias: {
      "@": __dirname,
    },
  },
})
