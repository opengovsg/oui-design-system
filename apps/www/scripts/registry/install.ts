// apps/www/scripts/registry/install.ts
import { mkdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"

import type { RegistryItem } from "./types"

/**
 * Write every file in the manifest to <fixtureRoot>/<target>.
 * Creates intermediate directories as needed.
 *
 * Bypasses the shadcn CLI binary intentionally — see spec section
 * "Verification" for rationale.
 */
export function installManifest(
  manifest: RegistryItem,
  fixtureRoot: string,
): void {
  for (const file of manifest.files) {
    const destination = join(fixtureRoot, file.target)
    mkdirSync(dirname(destination), { recursive: true })
    writeFileSync(destination, file.content, "utf-8")
  }
}
