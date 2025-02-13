import { readFileSync } from "node:fs"
import { builtinModules } from "node:module"
import { resolve } from "node:path"
import { nodeResolve } from "@rollup/plugin-node-resolve"
import replace from "@rollup/plugin-replace"
import { defineConfig } from "rollup"
import del from "rollup-plugin-delete"
import esbuild from "rollup-plugin-esbuild"
import preserveDirectives from "rollup-plugin-preserve-directives"
import { globSync } from "tinyglobby"

const dir = process.cwd()
const { dependencies, peerDependencies } = JSON.parse(
  readFileSync("./package.json", "utf8"),
) as Record<string, object>

const external = [
  ...builtinModules,
  ...builtinModules.map((m) => `node:${m}`),
  ...Object.keys(dependencies ?? {}),
  ...Object.keys(peerDependencies ?? {}),
  "react/jsx-runtime",
]

export default defineConfig([
  {
    input: globSync("src/**/*.{ts,tsx}"),
    output: [
      {
        format: "es",
        exports: "named",
        entryFileNames: "[name].js",
        dir: resolve(dir, "dist/esm"),
        preserveModules: true,
        preserveModulesRoot: "src",
      },
      {
        format: "cjs",
        exports: "named",
        entryFileNames: "[name].cjs",
        dir: resolve(dir, "dist/cjs"),
        preserveModules: true,
        preserveModulesRoot: "src",
        strict: false, // Already provided by preserveDirectives plugin
      },
    ],
    external,
    plugins: [
      del({ targets: "dist/*" }),
      nodeResolve({ extensions: [".ts", ".tsx", ".js", ".jsx"] }),
      esbuild({
        sourceMap: true,
        tsconfig: resolve(dir, "tsconfig.json"),
        platform: "browser",
      }),
      replace({ preventAssignment: true }),
      preserveDirectives(),
      {
        name: "@rollup-plugin/remove-empty-chunks",
        generateBundle(_, bundle) {
          for (const [name, chunk] of Object.entries(bundle)) {
            if (chunk.type === "chunk" && chunk.code.length === 0) {
              delete bundle[name]
            }
          }
        },
      },
    ],
    treeshake: true,
    onLog(level, log, handler) {
      if (log.code === "EMPTY_BUNDLE") return
      return handler(level, log)
    },
    onwarn(warning, warn) {
      if (warning.code === "SOURCEMAP_ERROR") return
      if (warning.code === "MODULE_LEVEL_DIRECTIVE") return
      warn(warning)
    },
  },
])
