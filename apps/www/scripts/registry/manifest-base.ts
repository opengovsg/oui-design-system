// apps/www/scripts/registry/manifest-base.ts
import type { BuildOptions, RegistryItem } from "./types"

/**
 * Emits the `registry:base` bootstrap item.
 *
 * Consumed via `pnpm dlx shadcn@latest init https://oui.open.gov.sg/r/oui.json`,
 * which writes a `components.json` with OUI aliases and skips shadcn's
 * interactive base/preset prompts. `extends: "none"` prevents the shadcn
 * default style-index from being installed alongside ours.
 */
export function buildBaseManifest(options: BuildOptions): RegistryItem {
  return {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: "oui",
    type: "registry:base",
    extends: "none",
    description:
      "OUI design system base. Initializes components.json with OUI aliases.",
    dependencies: ["@opengovsg/oui-theme"],
    registryDependencies: [`${options.registryBaseUrl}/cn.json`],
    config: {
      $schema: "https://ui.shadcn.com/schema.json",
      rsc: true,
      tsx: true,
      tailwind: {
        baseColor: "neutral",
        cssVariables: true,
      },
      aliases: {
        components: "@/components",
        ui: "@/components/oui",
        utils: "@/lib/oui/cn",
        lib: "@/lib/oui",
        hooks: "@/lib/oui",
      },
    },
  }
}
