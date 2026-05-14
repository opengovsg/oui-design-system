import { defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    include: ["scripts/**/__tests__/**/*.test.ts"],
    environment: "node",
  },
  resolve: {
    alias: {
      "@": new URL("./", import.meta.url).pathname,
    },
  },
})
