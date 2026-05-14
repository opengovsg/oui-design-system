// apps/www/scripts/registry/catalog.ts
import { readdirSync, statSync } from "node:fs"
import { dirname, join, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import { Project } from "ts-morph"

import type {
  Catalog,
  ComponentVariant,
  LibEntry,
} from "./types"

const HERE = dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = resolve(HERE, "../../../..")
const THEME_UTILS_DIR = join(REPO_ROOT, "packages/theme/src/utils")
const THEME_COMPONENTS_DIR = join(REPO_ROOT, "packages/theme/src/components")
const COMPONENTS_SYSTEM_DIR = join(
  REPO_ROOT,
  "packages/components/src/system/react-utils",
)
const COMPONENTS_SYSTEM_FLAT_DIR = join(
  REPO_ROOT,
  "packages/components/src/system",
)
const COMPONENTS_HOOKS_DIR = join(REPO_ROOT, "packages/components/src/hooks")

/** Files that are never registry entries (barrel exports). */
const ALWAYS_SKIP = new Set(["index.ts"])
/** For directories where types.ts is a shared type-only file that should be skipped. */
const SKIP_WITH_TYPES = new Set(["index.ts", "types.ts"])

function listTsFiles(dir: string, skip: Set<string> = ALWAYS_SKIP): string[] {
  return readdirSync(dir)
    .filter((f) => f.endsWith(".ts") && !f.endsWith(".d.ts"))
    .filter((f) => !skip.has(f))
    .map((f) => join(dir, f))
    .filter((p) => statSync(p).isFile())
}

function fileBaseName(path: string): string {
  const base = path.split("/").pop()!
  return base.replace(/\.ts$/, "")
}

function exportsOf(project: Project, path: string): string[] {
  const sourceFile = project.addSourceFileAtPath(path)
  const names: string[] = []
  for (const decl of sourceFile.getExportedDeclarations()) {
    names.push(decl[0])
  }
  return names
}

export function buildCatalog(): Catalog {
  const project = new Project({
    skipAddingFilesFromTsConfig: true,
    compilerOptions: { allowJs: false },
  })

  const libEntries = new Map<string, LibEntry>()
  const componentVariants = new Map<string, ComponentVariant>()
  const bySymbolToLib = new Map<string, LibEntry>()
  const bySymbolToVariant = new Map<string, ComponentVariant>()

  // Theme shared utilities → lib entries
  // Note: types.ts in theme utils is registered as "theme-types" to avoid collision
  // with system/types.ts (which is registered as "types" via SYSTEM_FLAT_FILES).
  for (const file of listTsFiles(THEME_UTILS_DIR)) {
    const baseName = fileBaseName(file)
    const name = baseName === "types" ? "theme-types" : baseName
    const entry: LibEntry = {
      name,
      sourcePath: file,
      exports: exportsOf(project, file),
      type: "registry:lib",
    }
    libEntries.set(name, entry)
    for (const sym of entry.exports) bySymbolToLib.set(sym, entry)
  }

  // Components-package system react-utils → lib entries
  for (const file of listTsFiles(COMPONENTS_SYSTEM_DIR, SKIP_WITH_TYPES)) {
    const name = fileBaseName(file)
    const entry: LibEntry = {
      name,
      sourcePath: file,
      exports: exportsOf(project, file),
      type: "registry:lib",
    }
    libEntries.set(name, entry)
    for (const sym of entry.exports) bySymbolToLib.set(sym, entry)
  }

  // Components-package system flat files (utils.ts, types.ts, l10n.ts) → lib entries
  // These live at packages/components/src/system/ (not inside react-utils/).
  const SYSTEM_FLAT_FILES = ["utils.ts", "types.ts", "l10n.ts"]
  for (const filename of SYSTEM_FLAT_FILES) {
    const file = join(COMPONENTS_SYSTEM_FLAT_DIR, filename)
    const name = fileBaseName(file)
    const entry: LibEntry = {
      name,
      sourcePath: file,
      exports: exportsOf(project, file),
      type: "registry:lib",
    }
    libEntries.set(name, entry)
    for (const sym of entry.exports) bySymbolToLib.set(sym, entry)
  }

  // Hooks → registry:hook entries
  for (const file of listTsFiles(COMPONENTS_HOOKS_DIR)) {
    const name = fileBaseName(file)
    const entry: LibEntry = {
      name,
      sourcePath: file,
      exports: exportsOf(project, file),
      type: "registry:hook",
    }
    libEntries.set(name, entry)
    for (const sym of entry.exports) bySymbolToLib.set(sym, entry)
  }

  // Per-component variant slices
  for (const file of listTsFiles(THEME_COMPONENTS_DIR)) {
    const component = fileBaseName(file)
    const variant: ComponentVariant = {
      component,
      sourcePath: file,
      exports: exportsOf(project, file),
    }
    componentVariants.set(component, variant)
    for (const sym of variant.exports) bySymbolToVariant.set(sym, variant)
  }

  return {
    libEntries,
    componentVariants,
    bySymbolToLib,
    bySymbolToVariant,
  }
}
