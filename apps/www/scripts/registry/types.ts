// apps/www/scripts/registry/types.ts

/**
 * shadcn registry-item.json type values used in this codebase.
 * https://ui.shadcn.com/schema/registry-item.json
 */
export type RegistryItemType = "registry:ui" | "registry:lib" | "registry:hook"

export interface RegistryFile {
  path: string
  content: string
  type: RegistryItemType
  target: string
}

export interface RegistryItem {
  $schema: "https://ui.shadcn.com/schema/registry-item.json"
  name: string
  type: RegistryItemType
  description?: string
  dependencies?: string[]
  registryDependencies?: string[]
  files: RegistryFile[]
}

export interface RegistryIndexEntry {
  name: string
  type: RegistryItemType
  description?: string
  manifestUrl: string
}

export interface RegistryIndex {
  generatedAt: string
  items: RegistryIndexEntry[]
}

export interface BuildOptions {
  /** Base URL for registry items (e.g., "https://oui.open.gov.sg/r"). */
  registryBaseUrl: string
}

/**
 * A lib entry — a once-per-repo utility file written under `@/lib/oui/`.
 * Auto-discovered from packages/theme/src/utils and packages/components/src/system,hooks.
 */
export interface LibEntry {
  /** Registry name (e.g., "cn", "children", "use-controllable-state"). */
  name: string
  /** Absolute source path in the monorepo. */
  sourcePath: string
  /** Symbols exported by this file (used for transformer lookup). */
  exports: string[]
  /** Type for the registry manifest. */
  type: "registry:lib" | "registry:hook"
}

/**
 * A per-component variant slice — inlined alongside the component as
 * `<name>.variants.ts`. Source is packages/theme/src/components/<name>.ts.
 */
export interface ComponentVariant {
  /** Component name (e.g., "button"). */
  component: string
  /** Absolute source path. */
  sourcePath: string
  /** Symbols exported by this file. */
  exports: string[]
}

/**
 * The catalog: a single map from any imported symbol name to where it comes from.
 * Built once, consumed everywhere.
 */
export interface Catalog {
  /** symbol name → lib entry that exports it. */
  bySymbolToLib: Map<string, LibEntry>
  /** symbol name → component-variant slice that exports it. */
  bySymbolToVariant: Map<string, ComponentVariant>
  /** name → lib entry (for direct lookup). */
  libEntries: Map<string, LibEntry>
  /** component name → variant slice. */
  componentVariants: Map<string, ComponentVariant>
}
