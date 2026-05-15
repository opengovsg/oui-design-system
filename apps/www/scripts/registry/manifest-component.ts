// apps/www/scripts/registry/manifest-component.ts
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs"
import { dirname, join, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import { Project } from "ts-morph"

import type { BuildOptions, Catalog, RegistryFile, RegistryItem } from "./types"
import { transformSourceFile } from "./transform"
import { transformVariantFile } from "./variant"

const HERE = dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = resolve(HERE, "../../../..")
const COMPONENTS_DIR = join(REPO_ROOT, "packages/components/src")

function listComponentFiles(componentName: string): string[] {
  const dir = join(COMPONENTS_DIR, componentName)
  const results: string[] = []

  function walk(currentDir: string) {
    for (const entry of readdirSync(currentDir)) {
      if (entry === "stories") continue // skip storybook dirs
      const fullPath = join(currentDir, entry)
      const stat = statSync(fullPath)
      if (stat.isDirectory()) {
        walk(fullPath)
      } else if (
        stat.isFile() &&
        (entry.endsWith(".tsx") || entry.endsWith(".ts")) &&
        entry !== "index.ts" &&
        entry !== "index.tsx"
      ) {
        results.push(fullPath)
      }
    }
  }

  walk(dir)
  return results
}

function targetPathFor(
  componentName: string,
  filePath: string,
  fileCount: number,
): string {
  const componentDir = join(COMPONENTS_DIR, componentName)
  const relativePath = filePath.slice(componentDir.length + 1) // e.g. "navbar-menu/menu.tsx"
  const filename = filePath.split("/").pop()!
  if (fileCount === 1) {
    // Single-file component: flatten to components/oui/<name>.tsx
    const ext = filename.endsWith(".tsx") ? ".tsx" : ".ts"
    return `components/oui/${componentName}${ext}`
  }
  // Multi-file: preserve subdir structure relative to the component root.
  return `components/oui/${componentName}/${relativePath}`
}

export function buildComponentManifest(
  componentName: string,
  catalog: Catalog,
  options: BuildOptions,
): RegistryItem {
  const project = new Project({
    skipAddingFilesFromTsConfig: true,
    compilerOptions: { allowJs: false },
  })

  const componentFiles = listComponentFiles(componentName)
  const files: RegistryFile[] = []
  const deps = new Set<string>()
  const registryDeps = new Set<string>()
  const libDeps = new Set<string>()
  const allInlineVariants = new Set<string>()

  for (const filePath of componentFiles) {
    const sourceFile = project.addSourceFileAtPath(filePath)
    const result = transformSourceFile(sourceFile, catalog)
    for (const d of result.deps) deps.add(d)
    for (const d of result.registryDeps) registryDeps.add(d)
    for (const d of result.libDeps) libDeps.add(d)
    for (const v of result.inlineVariants) allInlineVariants.add(v)

    const targetPath = targetPathFor(
      componentName,
      filePath,
      componentFiles.length,
    )
    files.push({
      path: targetPath,
      content: result.code,
      type: "registry:ui",
      target: targetPath,
    })
  }

  // For multi-file components, emit an index.ts barrel so that imports like
  // `@/components/oui/spinner` resolve to the component subdir.
  if (componentFiles.length > 1) {
    const indexSource = join(COMPONENTS_DIR, componentName, "index.ts")
    const indexSourceTsx = join(COMPONENTS_DIR, componentName, "index.tsx")
    const indexPath = existsSync(indexSource)
      ? indexSource
      : existsSync(indexSourceTsx)
        ? indexSourceTsx
        : null
    if (indexPath) {
      const indexContent = readFileSync(indexPath, "utf-8")
      const indexTarget = `components/oui/${componentName}/index.ts`
      files.push({
        path: indexTarget,
        content: indexContent,
        type: "registry:ui",
        target: indexTarget,
      })
    }
  }

  if (allInlineVariants.size > 0) {
    // Process all variant files referenced by component files, including transitive
    // variants (e.g., menu.ts → ./list-box.ts → menu's variant file needs list-box.variants.ts).
    const processedVariants = new Set<string>()
    const variantsToProcess = [...allInlineVariants]

    while (variantsToProcess.length > 0) {
      const variantSourceName = variantsToProcess.pop()!
      if (processedVariants.has(variantSourceName)) continue
      processedVariants.add(variantSourceName)

      const variant = catalog.componentVariants.get(variantSourceName)
      if (!variant) {
        throw new Error(
          `[registry] Component "${componentName}" imports variant "${variantSourceName}" but it was not discovered in catalog`,
        )
      }
      const result = transformVariantFile(variant.sourcePath, catalog)
      for (const d of result.libDeps) libDeps.add(d)

      // Queue any transitive variants discovered during variant file processing.
      for (const transitiveVariant of result.transitiveVariants) {
        if (!processedVariants.has(transitiveVariant)) {
          variantsToProcess.push(transitiveVariant)
        }
      }

      // The variant file path must match what the transformer wrote as the import specifier:
      //   `./<variantSourceName>.variants`
      // For single-file components: components/oui/<variantSourceName>.variants.ts
      //   (always uses variantSourceName so "field" variant goes to "field.variants.ts")
      // For multi-file: components/oui/<componentName>/<variantSourceName>.variants.ts
      //   (inside subdir, adjacent to component files that import it)
      const variantPath =
        componentFiles.length === 1
          ? `components/oui/${variantSourceName}.variants.ts`
          : `components/oui/${componentName}/${variantSourceName}.variants.ts`
      files.push({
        path: variantPath,
        content: result.code,
        type: "registry:ui",
        target: variantPath,
      })
    }
    // @opengovsg/oui-theme stays as a runtime dep when a component uses a variant —
    // needed for tokens/CSS.
    deps.add("@opengovsg/oui-theme")
  }

  const registryDepsUrls = [
    ...[...registryDeps]
      .sort()
      .map((name) => `${options.registryBaseUrl}/${name}.json`),
    ...[...libDeps]
      .sort()
      .map((name) => `${options.registryBaseUrl}/${name}.json`),
  ]

  return {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: componentName,
    type: "registry:ui",
    dependencies: [...deps].sort(),
    registryDependencies: registryDepsUrls,
    files,
  }
}
