// apps/www/scripts/registry/classify.ts
import type { Catalog, LibEntry } from "./types"

export type ClassifiedImport =
  | { kind: "external"; pkg: string }
  | { kind: "sibling-component"; componentName: string }
  | {
      kind: "sibling-component-file"
      componentName: string
      subpath: string
    }
  | { kind: "internal-same-dir"; relativePath: string }
  | { kind: "lib-direct"; libName: string }
  | {
      kind: "lib-barrel"
      libBuckets: Map<string, { lib: LibEntry; symbols: string[] }>
    }
  | {
      kind: "theme-mixed"
      /** One bucket per source variant file (keyed by variant component name). */
      variantBuckets: Map<string, { variant: import("./types").ComponentVariant; symbols: string[] }>
      libBuckets: Map<string, { lib: LibEntry; symbols: string[] }>
      leftoverSymbols: string[] // symbols not in variant catalog nor lib catalog
    }
  | { kind: "unknown"; moduleSpecifier: string; symbols: string[] }

const THEME_PKG = "@opengovsg/oui-theme"

function isExternal(moduleSpecifier: string): boolean {
  if (moduleSpecifier.startsWith(".")) return false
  if (moduleSpecifier.startsWith("@/")) return false
  if (moduleSpecifier === THEME_PKG) return false
  return true
}

function bucketByLib(
  symbols: string[],
  catalog: Catalog,
): Map<string, { lib: LibEntry; symbols: string[] }> {
  const buckets = new Map<string, { lib: LibEntry; symbols: string[] }>()
  for (const sym of symbols) {
    const lib = catalog.bySymbolToLib.get(sym)
    if (!lib) continue
    const existing = buckets.get(lib.name)
    if (existing) existing.symbols.push(sym)
    else buckets.set(lib.name, { lib, symbols: [sym] })
  }
  return buckets
}

export function classifyImport(
  moduleSpecifier: string,
  symbols: string[],
  catalog: Catalog,
): ClassifiedImport {
  if (isExternal(moduleSpecifier)) {
    return { kind: "external", pkg: moduleSpecifier }
  }

  if (moduleSpecifier === THEME_PKG) {
    const variantBuckets = new Map<string, { variant: import("./types").ComponentVariant; symbols: string[] }>()
    const libSymbols: string[] = []
    const leftoverSymbols: string[] = []
    for (const sym of symbols) {
      const variant = catalog.bySymbolToVariant.get(sym)
      if (variant) {
        const existing = variantBuckets.get(variant.component)
        if (existing) existing.symbols.push(sym)
        else variantBuckets.set(variant.component, { variant, symbols: [sym] })
        continue
      }
      if (catalog.bySymbolToLib.has(sym)) libSymbols.push(sym)
      else leftoverSymbols.push(sym)
    }
    return {
      kind: "theme-mixed",
      variantBuckets,
      libBuckets: bucketByLib(libSymbols, catalog),
      leftoverSymbols,
    }
  }

  // Relative paths.
  // Same-directory: "./something" with no further slashes — internal-same-dir.
  // Sibling component: "../<name>" exactly (no further segments).
  // Deeper: classified by symbol lookup in lib catalog.

  if (moduleSpecifier.startsWith("./")) {
    return { kind: "internal-same-dir", relativePath: moduleSpecifier }
  }

  if (moduleSpecifier.startsWith("../../")) {
    // Two-level relative path — strip one ".." level and re-classify.
    // "../../foo" → "../foo"; "../../foo/bar" → "../foo/bar".
    // Since the rewriter always emits @/... paths that are location-independent,
    // collapsing one level is safe and produces the same output.
    return classifyImport("../" + moduleSpecifier.slice(6), symbols, catalog)
  }

  if (moduleSpecifier.startsWith("../")) {
    const parts = moduleSpecifier.split("/").filter((p) => p && p !== "..")
    // Deeper: resolve by symbol lookup first (handles barrel dirs like ../hooks,
    // ../system/react-utils, and direct paths like ../system/react-utils/children).
    const buckets = bucketByLib(symbols, catalog)
    if (parts.length >= 2 || buckets.size >= 1) {
      if (buckets.size === 1) {
        const [libName] = buckets.keys()
        // If the path ends with the lib name, it's a direct import.
        const last = parts[parts.length - 1]
        if (last === libName) {
          return { kind: "lib-direct", libName }
        }
      }
      if (buckets.size >= 1) {
        return { kind: "lib-barrel", libBuckets: buckets }
      }
      // parts.length === 2 and no lib buckets: ../<componentName>/<file> — deep
      // cross-component import. Rewrite to the component's barrel.
      if (parts.length === 2) {
        return {
          kind: "sibling-component-file",
          componentName: parts[0],
          subpath: parts[1],
        }
      }
    }
    if (parts.length === 1) {
      // "../<name>" — sibling component (symbols not in lib catalog)
      return { kind: "sibling-component", componentName: parts[0] }
    }
  }

  return { kind: "unknown", moduleSpecifier, symbols }
}
