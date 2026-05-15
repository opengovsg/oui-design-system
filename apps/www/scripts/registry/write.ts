// apps/www/scripts/registry/write.ts
import { mkdirSync, rmSync, writeFileSync } from "node:fs"
import { dirname, join, resolve } from "node:path"
import { fileURLToPath } from "node:url"

import type { RegistryIndex, RegistryItem } from "./types"

const HERE = dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = resolve(HERE, "../../../..")
const OUTPUT_DIR = join(REPO_ROOT, "apps/www/public/r")

export function writeRegistry(
  items: RegistryItem[],
  index: RegistryIndex,
): void {
  rmSync(OUTPUT_DIR, { recursive: true, force: true })
  mkdirSync(OUTPUT_DIR, { recursive: true })
  for (const item of items) {
    writeFileSync(
      join(OUTPUT_DIR, `${item.name}.json`),
      JSON.stringify(item, null, 2),
      "utf-8",
    )
  }
  writeFileSync(
    join(OUTPUT_DIR, "index.json"),
    JSON.stringify(index, null, 2),
    "utf-8",
  )
}
