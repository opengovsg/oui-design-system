// apps/www/scripts/registry/manifest-index.ts
import type { BuildOptions, RegistryIndex, RegistryItem } from "./types"

export function buildIndex(
  items: RegistryItem[],
  options: BuildOptions,
): RegistryIndex {
  return {
    $schema: "https://oui.open.gov.sg/r/index-schema.json",
    generatedAt: new Date().toISOString(),
    items: items
      .map((item) => ({
        name: item.name,
        type: item.type,
        description: item.description,
        manifestUrl: `${options.registryBaseUrl}/${item.name}.json`,
      }))
      .sort((a, b) => a.name.localeCompare(b.name)),
  }
}
