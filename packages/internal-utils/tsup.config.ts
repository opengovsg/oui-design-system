import { defineConfig } from "tsup";

// eslint-disable-next-line import/no-default-export -- required for tsup
export default defineConfig((options) => ({
  clean: true,
  entry: ["src", "!**/stories/**"],
  format: ["cjs", "esm"],
  ...options,
}));
