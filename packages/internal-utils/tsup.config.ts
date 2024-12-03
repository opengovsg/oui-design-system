import { defineConfig } from "tsup";

export default defineConfig((options) => ({
  clean: true,
  entry: ["src", "!**/stories/**"],
  format: ["cjs", "esm"],
  ...options,
}));
