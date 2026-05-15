// apps/www/scripts/generate-shadcn-registry.ts
import type { RegistryItem } from "./registry/types"
import { buildCatalog } from "./registry/catalog"
import { COMPONENT_DESCRIPTIONS } from "./registry/descriptions"
import { discoverComponents } from "./registry/discover"
import { buildComponentManifest } from "./registry/manifest-component"
import { buildIndex } from "./registry/manifest-index"
import { buildLibManifest } from "./registry/manifest-lib"
import { writeRegistry } from "./registry/write"

const REGISTRY_BASE_URL = "https://oui.open.gov.sg/r"

async function main() {
  const catalog = buildCatalog()
  const options = { registryBaseUrl: REGISTRY_BASE_URL }

  const componentNames = discoverComponents()

  const componentManifests = componentNames.map((name) => {
    const manifest = buildComponentManifest(name, catalog, options)
    const description = COMPONENT_DESCRIPTIONS[name]
    if (description) {
      manifest.description = description
    }
    return manifest
  })

  // Determine which lib entries are referenced by reading registryDependencies URLs.
  const referencedLibNames = new Set<string>()
  for (const manifest of componentManifests) {
    for (const url of manifest.registryDependencies ?? []) {
      const name = url
        .replace(`${REGISTRY_BASE_URL}/`, "")
        .replace(/\.json$/, "")
      if (catalog.libEntries.has(name)) referencedLibNames.add(name)
    }
  }

  // Lib entries may themselves depend on other lib entries — resolve transitively.
  const libManifests: RegistryItem[] = []
  const seen = new Set<string>()
  const queue = [...referencedLibNames]
  while (queue.length > 0) {
    const name = queue.shift()!
    if (seen.has(name)) continue
    seen.add(name)
    const entry = catalog.libEntries.get(name)
    if (!entry) {
      throw new Error(`[registry] Referenced lib entry not found: ${name}`)
    }
    const manifest = buildLibManifest(entry, catalog, options)
    libManifests.push(manifest)
    for (const url of manifest.registryDependencies ?? []) {
      const depName = url
        .replace(`${REGISTRY_BASE_URL}/`, "")
        .replace(/\.json$/, "")
      if (catalog.libEntries.has(depName) && !seen.has(depName)) {
        queue.push(depName)
      }
    }
  }

  const allItems: RegistryItem[] = [...componentManifests, ...libManifests]
  const index = buildIndex(allItems, options)

  writeRegistry(allItems, index)

  console.log(
    `[registry] Wrote ${componentManifests.length} components + ${libManifests.length} lib entries → apps/www/public/r/`,
  )
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
