import { resolve } from "node:path"

import { nodeResolve } from "@rollup/plugin-node-resolve"
import replace from "@rollup/plugin-replace"
import type { Plugin, RollupOptions } from "rollup"
import del from "rollup-plugin-delete"
import esbuild from "rollup-plugin-esbuild"
import { preserveDirectives } from "rollup-plugin-preserve-directives"
import { globSync } from "tinyglobby"

interface Options {
  dir: string
  clean?: boolean
}

export async function getConfig(options: Options): Promise<RollupOptions> {
  const { dir, clean } = options

  const packageJson = await import(resolve(dir, "package.json"))

  const plugins: Plugin[] = [
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
  ]
  if (clean) {
    plugins.push(del({ targets: "dist/*" }))
  }

  const deps = [
    ...Object.keys(packageJson.dependencies ?? {}),
    ...Object.keys(packageJson.peerDependencies ?? {}),
  ]

  const external = deps.length ? new RegExp(`^(${deps.join("|")})`) : undefined
  const entries = globSync(["src/**/*.{ts,tsx}", "!**/*.stories.tsx"])

  const outputs: RollupOptions["output"] = [
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
    },
  ]

  return {
    input: entries,
    onLog(level, log, handler) {
      if (log.code === "EMPTY_BUNDLE") return
      return handler(level, log)
    },
    onwarn(warning, warn) {
      if (warning.code === "SOURCEMAP_ERROR") return
      if (warning.code === "MODULE_LEVEL_DIRECTIVE") return
      warn(warning)
    },
    output: outputs,
    external,
    plugins,
  }
}
