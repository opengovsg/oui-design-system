import { existsSync } from "node:fs"
import { mkdir, readFile, writeFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

import type { ParsedDoc } from "./types"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const COMPONENTS_TYPES_DIR = path.resolve(
  __dirname,
  "..",
  "..",
  "..",
  "..",
  "packages",
  "components",
  "dist",
  "types",
)

interface CoverageEntry {
  component: string
  totalProps: number
  mentionedProps: string[]
  missingProps: string[]
}

/**
 * Best-effort prop coverage: looks for `<Component>Props` interface members
 * in the corresponding .d.ts file, then checks if each prop name is
 * mentioned at least once in the markdown body.
 *
 * Skipped (with a warning) if the components package hasn't been built.
 */
export async function writeCoverageReport(
  components: ParsedDoc[],
  componentMarkdowns: Map<string, string>,
  outputPath: string,
): Promise<void> {
  if (!existsSync(COMPONENTS_TYPES_DIR)) {
    console.warn(
      `[llms-coverage] skipped: ${COMPONENTS_TYPES_DIR} not found. Run \`pnpm --filter @opengovsg/oui build\` first to enable coverage.`,
    )
    return
  }

  const entries: CoverageEntry[] = []

  for (const doc of components) {
    // The index.d.ts only re-exports; the props interface lives in <slug>.d.ts.
    // Fall back to index.d.ts if the slug-named file doesn't exist.
    const slugDtsPath = path.join(
      COMPONENTS_TYPES_DIR,
      doc.slug,
      `${doc.slug}.d.ts`,
    )
    const indexDtsPath = path.join(
      COMPONENTS_TYPES_DIR,
      doc.slug,
      "index.d.ts",
    )
    const dtsPath = existsSync(slugDtsPath) ? slugDtsPath : indexDtsPath
    if (!existsSync(dtsPath)) continue

    const dts = await readFile(dtsPath, "utf8")
    const propsMatch = dts.match(
      /interface\s+\w+Props[^{]*\{([\s\S]*?)\n\}/,
    )
    if (!propsMatch) continue

    const propNames = Array.from(
      propsMatch[1].matchAll(/^\s*(?:readonly\s+)?(\w+)\??:/gm),
      (m) => m[1],
    )
    if (propNames.length === 0) continue

    const md = componentMarkdowns.get(doc.slug) ?? ""
    const mentioned: string[] = []
    const missing: string[] = []
    for (const prop of propNames) {
      const re = new RegExp(`\\b${prop}\\b`)
      if (re.test(md)) mentioned.push(prop)
      else missing.push(prop)
    }

    entries.push({
      component: doc.slug,
      totalProps: propNames.length,
      mentionedProps: mentioned,
      missingProps: missing,
    })
  }

  await mkdir(path.dirname(outputPath), { recursive: true })
  await writeFile(outputPath, JSON.stringify(entries, null, 2), "utf8")
  console.log(`[llms-coverage] wrote ${entries.length} entries to ${outputPath}`)
}
