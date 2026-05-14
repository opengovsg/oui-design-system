import { existsSync } from "node:fs"
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises"
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

export interface ExtractedProps {
  propNames: string[]
  propsSource: string // relative file path, or "none"
}

interface CoverageEntry {
  component: string
  totalProps: number
  mentionedProps: string[]
  missingProps: string[]
  propsSource: string
}

/**
 * Walks every .d.ts file in <typesDir>/<slug>/, finding all
 * `interface \w+Props {...}` blocks and `type \w+Props = {...}` aliases.
 * Returns the union of member names found and the relative path of the
 * first file that produced any matches (for verifiability).
 */
export async function extractPropNames(
  typesDir: string,
  slug: string,
): Promise<ExtractedProps> {
  const slugDir = path.join(typesDir, slug)
  if (!existsSync(slugDir)) {
    return { propNames: [], propsSource: "none" }
  }

  const entries = await readdir(slugDir, { withFileTypes: true })
  const dtsFiles = entries
    .filter((e) => e.isFile() && e.name.endsWith(".d.ts"))
    .map((e) => e.name)
    .sort()

  const allNames = new Set<string>()
  let firstSource: string | null = null

  for (const fileName of dtsFiles) {
    const filePath = path.join(slugDir, fileName)
    const content = await readFile(filePath, "utf8")

    // 1. interface NameProps ... { body }  — body may be empty (single-line {})
    const interfaceRe = /interface\s+\w+Props[^{]*\{([\s\S]*?)(?:\n\}|\})/g
    // 2. type NameProps = { body }
    const typeAliasRe = /type\s+\w+Props\s*=\s*\{([\s\S]*?)(?:\n\}|\})/g

    let matchedHere = false
    for (const m of content.matchAll(interfaceRe)) {
      matchedHere = true
      collectMemberNames(m[1], allNames)
    }
    for (const m of content.matchAll(typeAliasRe)) {
      matchedHere = true
      collectMemberNames(m[1], allNames)
    }

    if (matchedHere && firstSource === null) {
      firstSource = path.relative(typesDir, filePath)
    }
  }

  return {
    propNames: [...allNames],
    propsSource: firstSource ?? "none",
  }
}

function collectMemberNames(body: string, into: Set<string>): void {
  const memberRe = /^\s*(?:readonly\s+)?(\w+)\??:/gm
  for (const m of body.matchAll(memberRe)) {
    into.add(m[1])
  }
}

/**
 * Writes an exhaustive coverage report (one entry per input component).
 * Skipped with a warning if the components package hasn't been built.
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
    const { propNames, propsSource } = await extractPropNames(
      COMPONENTS_TYPES_DIR,
      doc.slug,
    )

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
      propsSource,
    })
  }

  await mkdir(path.dirname(outputPath), { recursive: true })
  await writeFile(outputPath, JSON.stringify(entries, null, 2), "utf8")
  console.log(
    `[llms-coverage] wrote ${entries.length} entries to ${outputPath}`,
  )
}
