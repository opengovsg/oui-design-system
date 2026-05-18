// apps/www/scripts/registry/manifest-component.test.ts
import { beforeAll, describe, expect, it } from "vitest"

import type { Catalog } from "./types"
import { buildCatalog } from "./catalog"
import { buildComponentManifest } from "./manifest-component"

let catalog: Catalog

beforeAll(() => {
  catalog = buildCatalog()
})

describe("buildComponentManifest", () => {
  it("builds a manifest for the button component", () => {
    const manifest = buildComponentManifest("button", catalog, {
      registryBaseUrl: "https://oui.open.gov.sg/r",
    })

    expect(manifest.name).toBe("button")
    expect(manifest.type).toBe("registry:ui")
    expect(manifest.$schema).toBe(
      "https://ui.shadcn.com/schema/registry-item.json",
    )

    // Externals appear in dependencies
    expect(manifest.dependencies).toContain("react-aria-components")
    // Theme peer dep is added whenever the component uses a variant
    expect(manifest.dependencies).toContain("@opengovsg/oui-theme")

    // Sibling components and lib entries appear in registryDependencies as full URLs
    expect(manifest.registryDependencies).toContain(
      "https://oui.open.gov.sg/r/spinner.json",
    )
    expect(manifest.registryDependencies).toContain(
      "https://oui.open.gov.sg/r/ripple.json",
    )
    expect(manifest.registryDependencies).toContain(
      "https://oui.open.gov.sg/r/cn.json",
    )

    // Files include the component .tsx and an inlined variants file
    const paths = manifest.files.map((f) => f.path)
    expect(paths).toContain("components/oui/button.tsx")
    expect(paths).toContain("components/oui/button.variants.ts")

    // Each file has a target equal to its path
    for (const f of manifest.files) {
      expect(f.target).toBe(f.path)
    }
  })
})
