import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["cli.ts", "build.ts", "utils.ts"],
  format: ["esm"],
  dts: true,
  clean: true,
  shims: true,
});
