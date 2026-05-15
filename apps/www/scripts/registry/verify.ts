// apps/www/scripts/registry/verify.ts
import { execFileSync } from "node:child_process"
import { existsSync, readdirSync, readFileSync, rmSync } from "node:fs"
import { dirname, join, resolve } from "node:path"
import { fileURLToPath } from "node:url"

import type { RegistryItem } from "./types"
import { installManifest } from "./install"

const HERE = dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = resolve(HERE, "../../../..")
const REGISTRY_DIR = join(REPO_ROOT, "apps/www/public/r")
const FIXTURE_DIR = join(REPO_ROOT, "apps/fixture-consumer")
const FIXTURE_SRC = join(FIXTURE_DIR, "src")

interface VerificationFailure {
  manifest: string
  error: string
}

function readAllManifests(): RegistryItem[] {
  const files = readdirSync(REGISTRY_DIR).filter(
    (f) => f.endsWith(".json") && f !== "index.json",
  )
  return files.map(
    (f) =>
      JSON.parse(readFileSync(join(REGISTRY_DIR, f), "utf-8")) as RegistryItem,
  )
}

function cleanFixture(): void {
  rmSync(join(FIXTURE_SRC, "components/oui"), { recursive: true, force: true })
  rmSync(join(FIXTURE_SRC, "lib/oui"), { recursive: true, force: true })
}

function runTypecheck(): { ok: true } | { ok: false; output: string } {
  try {
    execFileSync("pnpm", ["typecheck"], {
      cwd: FIXTURE_DIR,
      stdio: "pipe",
    })
    return { ok: true }
  } catch (err) {
    const error = err as { stdout?: Buffer; stderr?: Buffer; message?: string }
    const output =
      error.stdout?.toString() ??
      error.stderr?.toString() ??
      error.message ??
      "unknown error"
    return { ok: false, output }
  }
}

async function main() {
  if (!existsSync(REGISTRY_DIR)) {
    throw new Error(
      `Registry output not found at ${REGISTRY_DIR}. Run 'pnpm --filter @oui/www generate:registry' first.`,
    )
  }

  const manifests = readAllManifests()
  const failures: VerificationFailure[] = []

  for (const manifest of manifests) {
    cleanFixture()
    installManifest(manifest, FIXTURE_SRC)
    // Also install every transitive lib/registry dep that the manifest references,
    // because the component's imports require them to type-check.
    const installed = new Set<string>([manifest.name])
    const queue: string[] = [...(manifest.registryDependencies ?? [])]
    while (queue.length > 0) {
      const url = queue.shift()!
      const depName = url
        .split("/")
        .pop()!
        .replace(/\.json$/, "")
      if (installed.has(depName)) continue
      installed.add(depName)
      const depPath = join(REGISTRY_DIR, `${depName}.json`)
      if (!existsSync(depPath)) {
        failures.push({
          manifest: manifest.name,
          error: `Missing dependency manifest: ${depName}.json`,
        })
        continue
      }
      const depManifest = JSON.parse(
        readFileSync(depPath, "utf-8"),
      ) as RegistryItem
      installManifest(depManifest, FIXTURE_SRC)
      for (const subUrl of depManifest.registryDependencies ?? []) {
        queue.push(subUrl)
      }
    }

    const result = runTypecheck()
    if (result.ok) {
      console.log(`✓ ${manifest.name}`)
    } else {
      failures.push({ manifest: manifest.name, error: result.output })
      console.error(`✗ ${manifest.name}`)
    }
  }

  if (failures.length > 0) {
    console.error(`\n\n${failures.length} manifest(s) failed verification:\n`)
    for (const f of failures) {
      console.error(`--- ${f.manifest} ---`)
      console.error(f.error)
      console.error("")
    }
    process.exit(1)
  }

  console.log(`\nAll ${manifests.length} manifests verified.`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
