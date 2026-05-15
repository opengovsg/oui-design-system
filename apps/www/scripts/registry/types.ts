// apps/www/scripts/registry/types.ts

/**
 * shadcn registry-item.json type values used in this codebase.
 * https://ui.shadcn.com/schema/registry-item.json
 */
export type RegistryItemType =
  | "registry:ui"
  | "registry:lib"
  | "registry:hook"
  | "registry:base"

export interface RegistryFile {
  path: string
  content: string
  type: RegistryItemType
  target: string
}

/**
 * Partial shape of components.json that a `registry:base` item can ship.
 * The shadcn CLI deep-merges this into the project's components.json during
 * `shadcn init <url>`. Mirrors rawConfigSchema.deepPartial() in the CLI.
 */
export interface RegistryBaseConfig {
  $schema?: string
  style?: string
  rsc?: boolean
  tsx?: boolean
  iconLibrary?: string
  tailwind?: {
    config?: string
    css?: string
    baseColor?: string
    cssVariables?: boolean
    prefix?: string
  }
  aliases?: {
    components?: string
    utils?: string
    ui?: string
    lib?: string
    hooks?: string
  }
}

export interface RegistryItem {
  $schema: "https://ui.shadcn.com/schema/registry-item.json"
  name: string
  type: RegistryItemType
  description?: string
  /** Set to "none" on a registry:base to skip the shadcn default style index. */
  extends?: "none" | string
  dependencies?: string[]
  registryDependencies?: string[]
  /** Only present on `registry:base` items. */
  config?: RegistryBaseConfig
  /** Optional — `registry:base` typically has no files. */
  files?: RegistryFile[]
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
