import path from "node:path"
import { fileURLToPath } from "node:url"

import { defineConfig } from "vitest/config"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  test: {
    include: [
      "scripts/**/__tests__/**/*.test.ts",
      "scripts/registry/**/*.test.ts",
    ],
    environment: "node",
    testTimeout: 30000,
  },
  resolve: {
    alias: {
      "@": __dirname,
    },
  },
})
