import { defineConfig } from "tsup";

export default defineConfig((options) => ({
  clean: true,
  entry: ["src/**/*.ts", "!**/stories/**"],
  format: ["cjs", "esm"],
  dts: true,
  splitting: true,
  sourcemap: true,
  external: ["react"],
  ...options,
}));
