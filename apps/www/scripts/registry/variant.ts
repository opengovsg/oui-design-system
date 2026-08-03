// apps/www/scripts/registry/variant.ts
import { Project } from "ts-morph"

import { transformSourceFile } from "./transform"
import type { Catalog } from "./types"

export interface VariantTransformResult {
  code: string
  libDeps: Set<string>
  /**
   * Variant component names that this variant file itself depends on
   * (e.g., menu.ts imports list-box.ts → "list-box" is a transitive variant dep).
   */
  transitiveVariants: Set<string>
}

export function transformVariantFile(
  sourcePath: string,
  catalog: Catalog,
): VariantTransformResult {
  const project = new Project({
    skipAddingFilesFromTsConfig: true,
    compilerOptions: { allowJs: false },
  })
  const sourceFile = project.addSourceFileAtPath(sourcePath)
  // The variant file's imports are rewritten exactly like a component file's.
  // Same-dir variant imports (e.g., menu.ts → ./list-box) are rewritten to
  // ./<variantName>.variants by the transform; the inlineVariants set captures them.
  const result = transformSourceFile(sourceFile, catalog)
  return {
    code: result.code,
    libDeps: result.libDeps,
    transitiveVariants: result.inlineVariants,
  }
}
