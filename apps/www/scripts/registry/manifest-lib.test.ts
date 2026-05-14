import { describe, expect, it } from "vitest"

import { buildCatalog } from "./catalog"
import { buildLibManifest } from "./manifest-lib"

describe("buildLibManifest", () => {
  it("builds a manifest for the cn lib entry", () => {
    const catalog = buildCatalog()
    const cn = catalog.libEntries.get("cn")!
    const manifest = buildLibManifest(cn, catalog, {
      registryBaseUrl: "https://oui.gov.sg/r",
    })

    expect(manifest.name).toBe("cn")
    expect(manifest.type).toBe("registry:lib")
    expect(manifest.files[0].path).toBe("lib/oui/cn.ts")
    expect(manifest.files[0].target).toBe("lib/oui/cn.ts")
    expect(manifest.files[0].type).toBe("registry:lib")
    // cn.ts has internal-same-dir imports to ./tw-merge — those resolve correctly
    // in the consumer's lib/oui/ layout, so no registryDependencies entry needed.
  })

  it("uses registry:hook type for hooks", () => {
    const catalog = buildCatalog()
    const hook = catalog.libEntries.get("use-controllable-state")!
    const manifest = buildLibManifest(hook, catalog, {
      registryBaseUrl: "https://oui.gov.sg/r",
    })
    expect(manifest.type).toBe("registry:hook")
    expect(manifest.files[0].type).toBe("registry:hook")
    expect(manifest.files[0].path).toBe("lib/oui/use-controllable-state.ts")
  })
})
