import { Project } from "ts-morph"

import { transformSourceFile } from "./transform"
import type {
  BuildOptions,
  Catalog,
  LibEntry,
  RegistryItem,
} from "./types"

export function buildLibManifest(
  entry: LibEntry,
  catalog: Catalog,
  options: BuildOptions,
): RegistryItem {
  const project = new Project({
    skipAddingFilesFromTsConfig: true,
    compilerOptions: { allowJs: false },
  })
  const sourceFile = project.addSourceFileAtPath(entry.sourcePath)
  const result = transformSourceFile(sourceFile, catalog)

  const targetPath = `lib/oui/${entry.name}.ts`
  const registryDepsUrls = [
    ...[...result.registryDeps].sort().map(
      (name) => `${options.registryBaseUrl}/${name}.json`,
    ),
    ...[...result.libDeps].sort().map(
      (name) => `${options.registryBaseUrl}/${name}.json`,
    ),
  ]

  return {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: entry.name,
    type: entry.type,
    dependencies: [...result.deps].sort(),
    registryDependencies: registryDepsUrls,
    files: [
      {
        path: targetPath,
        content: result.code,
        type: entry.type,
        target: targetPath,
      },
    ],
  }
}
