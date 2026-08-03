import path from "node:path"
import { fileURLToPath } from "node:url"

import { storybookTest } from "@storybook/addon-vitest/vitest-plugin"
import { playwright } from "@vitest/browser-playwright"
import { defineConfig, mergeConfig } from "vitest/config"

import viteConfig from "./vite.config"

const dirname =
  typeof __dirname !== "undefined"
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url))

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      projects: [
        {
          plugins: [
            storybookTest({
              // The location of your Storybook config, main.js|ts
              configDir: path.join(dirname, ".storybook"),
              storybookUrl: process.env.TARGET_URL || "http://localhost:6006",
            }),
          ],
          test: {
            name: "storybook",
            // Enable browser mode
            browser: {
              enabled: true,
              // Make sure to install Playwright
              provider: playwright(),
              headless: true,
              instances: [{ browser: "chromium" }],
            },
            setupFiles: ["./.storybook/vitest.setup.ts"],
          },
        },
      ],
    },
  }),
)
