// apps/www/scripts/registry/discover.ts
import { readdirSync, statSync } from "node:fs"
import { dirname, join, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const HERE = dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = resolve(HERE, "../../../..")
const COMPONENTS_DIR = join(REPO_ROOT, "packages/components/src")

const NON_COMPONENT_DIRS = new Set(["system", "hooks"])

export function discoverComponents(): string[] {
  return readdirSync(COMPONENTS_DIR)
    .filter((entry) => {
      const path = join(COMPONENTS_DIR, entry)
      if (!statSync(path).isDirectory()) return false
      if (NON_COMPONENT_DIRS.has(entry)) return false
      return true
    })
    .sort()
}
