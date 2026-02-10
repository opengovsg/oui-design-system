import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs"
import { dirname, resolve } from "path"
import { fileURLToPath } from "url"

// Import the run function directly from token-gen source (monorepo)
import { run } from "../../../packages/token-gen/src/run.ts"

const __dirname = dirname(fileURLToPath(import.meta.url))

interface ThemeEntry {
  name: string
}

function getAvailableThemes(): string[] {
  const tokensPath = resolve(
    __dirname,
    "../../../packages/token-gen/raw/tokens.json",
  )
  const tokens = JSON.parse(readFileSync(tokensPath, "utf-8"))
  return Object.values(tokens.$themes).map((t) => (t as ThemeEntry).name)
}

async function main() {
  const outputDir = resolve(__dirname, "../public/themes")
  mkdirSync(outputDir, { recursive: true })

  const themes = getAvailableThemes()
  console.log(`Generating CSS for ${themes.length} themes...`)

  for (const theme of themes) {
    console.log(`  Generating: ${theme}`)
    await run(theme, outputDir)

    // Post-process: convert Tailwind @theme directive to standard :root CSS.
    // The generated CSS uses @theme { ... } which is a Tailwind build-time directive
    // that browsers don't understand. For runtime injection we need :root { ... }.
    // We also strip @utility blocks since typography doesn't need runtime overriding.
    const cssPath = resolve(outputDir, `generated-${theme}.css`)
    if (existsSync(cssPath)) {
      let css = readFileSync(cssPath, "utf-8")
      // Extract only the @theme block and convert to :root
      const themeMatch = css.match(/@theme\s*\{([\s\S]*?)\n\}/)
      if (themeMatch) {
        css = `:root {${themeMatch[1]}\n}`
      }
      writeFileSync(cssPath, css)
    }
  }

  // Write manifest
  const manifest = themes.map((name) => ({
    name,
    file: `/themes/generated-${name}.css`,
  }))
  writeFileSync(
    resolve(outputDir, "themes-manifest.json"),
    JSON.stringify(manifest, null, 2),
  )

  console.log(`Done. ${themes.length} themes generated + manifest.`)
}

main().catch(console.error)
