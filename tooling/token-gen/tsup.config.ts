import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["cli.ts"],
  format: ["esm"],
  dts: true,
  clean: true,
  shims: true,
});
