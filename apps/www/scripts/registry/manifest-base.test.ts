import { describe, expect, it } from "vitest"

import { buildBaseManifest } from "./manifest-base"

describe("buildBaseManifest", () => {
  const manifest = buildBaseManifest({
    registryBaseUrl: "https://oui.open.gov.sg/r",
  })

  it("emits a registry:base item named 'oui'", () => {
    expect(manifest.name).toBe("oui")
    expect(manifest.type).toBe("registry:base")
  })

  it("sets extends to 'none' to skip shadcn's default style index", () => {
    expect(manifest.extends).toBe("none")
  })

  it("ships OUI aliases via config", () => {
    expect(manifest.config?.aliases).toEqual({
      components: "@/components",
      ui: "@/components/oui",
      utils: "@/lib/oui/cn",
      lib: "@/lib/oui",
      hooks: "@/lib/oui",
    })
  })

  it("depends on @opengovsg/oui-theme and the cn registry item", () => {
    expect(manifest.dependencies).toEqual(["@opengovsg/oui-theme"])
    expect(manifest.registryDependencies).toEqual([
      "https://oui.open.gov.sg/r/cn.json",
    ])
  })

  it("does not ship any files", () => {
    expect(manifest.files).toBeUndefined()
  })
})
