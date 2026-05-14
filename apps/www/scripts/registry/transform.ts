// apps/www/scripts/registry/transform.ts
import { join } from "node:path"

import type { ImportDeclaration, SourceFile } from "ts-morph"

import { classifyImport } from "./classify"
import type { Catalog, LibEntry } from "./types"

export interface TransformResult {
  /** Transformed source code (preserves "use client" pragma). */
  code: string
  /** External npm packages used by this file. */
  deps: Set<string>
  /** Sibling component names referenced (e.g., "spinner", "ripple"). */
  registryDeps: Set<string>
  /** Lib entry names referenced (e.g., "cn", "tv", "children"). */
  libDeps: Set<string>
  /**
   * The set of variant component names that need to be inlined alongside this file
   * (e.g., "button" when button.tsx imports buttonStyles, or "list-box" when
   * combo-box imports listBoxItemStyles). Empty set means no variants to inline.
   * Replaces the old `inlineVariant: boolean` + `variantComponents: Set<string>` pair.
   */
  inlineVariants: Set<string>
}

function symbolsOfImport(decl: ImportDeclaration): string[] {
  const named = decl.getNamedImports().map((n) => n.getName())
  const def = decl.getDefaultImport()?.getText()
  const ns = decl.getNamespaceImport()?.getText()
  return [
    ...named,
    ...(def ? [def] : []),
    ...(ns ? [ns] : []),
  ]
}

export function transformSourceFile(
  sourceFile: SourceFile,
  catalog: Catalog,
): TransformResult {
  const deps = new Set<string>()
  const registryDeps = new Set<string>()
  const libDeps = new Set<string>()
  const inlineVariants = new Set<string>()

  // Build a reverse lookup from source path → lib entry for same-dir detection.
  const libByPath = new Map<string, LibEntry>()
  for (const entry of catalog.libEntries.values()) {
    libByPath.set(entry.sourcePath, entry)
  }
  // Build a reverse lookup from source path → variant component name for same-dir variant detection.
  const variantByPath = new Map<string, string>()
  for (const [component, variant] of catalog.componentVariants) {
    variantByPath.set(variant.sourcePath, component)
  }
  const sourceDir = sourceFile.getDirectoryPath()

  // Iterate over a snapshot — we'll mutate as we go.
  const imports = [...sourceFile.getImportDeclarations()]

  for (const decl of imports) {
    const spec = decl.getModuleSpecifierValue()
    const symbols = symbolsOfImport(decl)
    const classified = classifyImport(spec, symbols, catalog)

    switch (classified.kind) {
      case "external": {
        deps.add(classified.pkg)
        break // unchanged
      }
      case "internal-same-dir": {
        // Detect "./X" where X is another catalog lib entry or variant file.
        // Strip any leading "./" and try .ts extension.
        const rel = classified.relativePath.replace(/^\.\//, "")
        const candidatePath = join(sourceDir, `${rel}.ts`)
        const libEntry = libByPath.get(candidatePath)
        if (libEntry) {
          libDeps.add(libEntry.name)
          decl.setModuleSpecifier(`@/lib/oui/${libEntry.name}`)
          break
        }
        // Check if it's a same-dir variant file (e.g., menu.ts imports from ./list-box).
        // Rewrite to ./<variantName>.variants so variant files can cross-reference each other.
        const variantComponent = variantByPath.get(candidatePath)
        if (variantComponent) {
          inlineVariants.add(variantComponent)
          decl.setModuleSpecifier(`./${variantComponent}.variants`)
        }
        // Otherwise: leave unchanged (legitimate same-dir for multi-file components).
        break
      }
      case "sibling-component": {
        registryDeps.add(classified.componentName)
        decl.setModuleSpecifier(
          `@/components/oui/${classified.componentName}`,
        )
        break
      }
      case "sibling-component-file": {
        registryDeps.add(classified.componentName)
        // Rewrite to the component's barrel (the deep path collapses to the flat
        // target in the registry layout — single-file or multi-file, the barrel
        // re-exports everything consumers need).
        decl.setModuleSpecifier(
          `@/components/oui/${classified.componentName}`,
        )
        break
      }
      case "lib-direct": {
        libDeps.add(classified.libName)
        decl.setModuleSpecifier(`@/lib/oui/${classified.libName}`)
        break
      }
      case "lib-barrel": {
        // Replace the barrel with one import per lib bucket.
        const isTypeOnly = decl.isTypeOnly()
        const buckets = [...classified.libBuckets.values()]
        // Insert new imports immediately before this one, preserving order.
        let insertIndex = decl.getChildIndex()
        for (const bucket of buckets) {
          libDeps.add(bucket.lib.name)
          sourceFile.insertImportDeclaration(insertIndex, {
            moduleSpecifier: `@/lib/oui/${bucket.lib.name}`,
            namedImports: bucket.symbols.map((name) => ({ name })),
            isTypeOnly,
          })
          insertIndex++
        }
        decl.remove()
        break
      }
      case "theme-mixed": {
        // Split into (optionally) one inlined variant import per variant bucket + one or more lib imports.
        const isTypeOnly = decl.isTypeOnly()
        let insertIndex = decl.getChildIndex()
        for (const [componentName, bucket] of classified.variantBuckets) {
          inlineVariants.add(componentName)
          // Emit one import per variant bucket, keyed by the variant's component name.
          // e.g., combo-box imports listBoxItemStyles → componentName is "list-box"
          //       → import resolves to "./list-box.variants"
          sourceFile.insertImportDeclaration(insertIndex, {
            moduleSpecifier: `./${componentName}.variants`,
            namedImports: bucket.symbols.map((name) => ({ name })),
            isTypeOnly,
          })
          insertIndex++
        }
        for (const bucket of classified.libBuckets.values()) {
          libDeps.add(bucket.lib.name)
          sourceFile.insertImportDeclaration(insertIndex, {
            moduleSpecifier: `@/lib/oui/${bucket.lib.name}`,
            namedImports: bucket.symbols.map((name) => ({ name })),
            isTypeOnly,
          })
          insertIndex++
        }
        if (classified.leftoverSymbols.length > 0) {
          deps.add("@opengovsg/oui-theme")
          sourceFile.insertImportDeclaration(insertIndex, {
            moduleSpecifier: "@opengovsg/oui-theme",
            namedImports: classified.leftoverSymbols.map((name) => ({ name })),
            isTypeOnly,
          })
          insertIndex++
        }
        decl.remove()
        break
      }
      case "unknown": {
        // Surface clearly during generation; do not silently drop.
        throw new Error(
          `[registry transformer] Unclassified import: ${classified.moduleSpecifier} (symbols: ${classified.symbols.join(", ")}) in ${sourceFile.getFilePath()}`,
        )
      }
    }
  }

  return {
    code: sourceFile.getFullText(),
    deps,
    registryDeps,
    libDeps,
    inlineVariants,
  }
}
