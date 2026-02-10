import { readFileSync, mkdirSync, writeFileSync } from "fs"
import { resolve, dirname } from "path"
import { fileURLToPath } from "url"

// Import the run function directly from token-gen source (monorepo)
import { run } from "../../../packages/token-gen/src/run.ts"

const __dirname = dirname(fileURLToPath(import.meta.url))

interface ThemeEntry {
  name: string
}

function getAvailableThemes(): string[] {
  const tokensPath = resolve(__dirname, "../../../packages/token-gen/raw/tokens.json")
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
