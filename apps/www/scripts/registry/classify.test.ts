// apps/www/scripts/registry/classify.test.ts
import { describe, expect, it } from "vitest"

import { buildCatalog } from "./catalog"
import { classifyImport } from "./classify"

const catalog = buildCatalog()

describe("classifyImport", () => {
  it("classifies external packages as external", () => {
    expect(classifyImport("react", [], catalog).kind).toBe("external")
    expect(classifyImport("react-aria-components", [], catalog).kind).toBe(
      "external",
    )
    expect(classifyImport("@react-aria/utils", [], catalog).kind).toBe(
      "external",
    )
    expect(classifyImport("motion/react", [], catalog).kind).toBe("external")
  })

  it("classifies sibling component imports", () => {
    const r = classifyImport("../spinner", ["Spinner", "SpinnerProps"], catalog)
    expect(r.kind).toBe("sibling-component")
    if (r.kind === "sibling-component") {
      expect(r.componentName).toBe("spinner")
    }
  })

  it("classifies a deeper sibling path", () => {
    const r = classifyImport(
      "../system/react-utils/children",
      ["renderChildren"],
      catalog,
    )
    expect(r.kind).toBe("lib-direct")
    if (r.kind === "lib-direct") {
      expect(r.libName).toBe("children")
    }
  })

  it("classifies @opengovsg/oui-theme imports split by symbol", () => {
    // buttonStyles is a per-component variant; cn is a shared util.
    const r = classifyImport(
      "@opengovsg/oui-theme",
      ["buttonStyles", "ButtonVariantProps", "cn"],
      catalog,
    )
    expect(r.kind).toBe("theme-mixed")
    if (r.kind === "theme-mixed") {
      expect(r.variantBuckets.has("button")).toBe(true)
      expect(r.variantBuckets.get("button")?.symbols).toEqual([
        "buttonStyles",
        "ButtonVariantProps",
      ])
      expect(r.libBuckets.size).toBe(1)
      expect([...r.libBuckets.keys()][0]).toBe("cn")
      expect(r.leftoverSymbols).toEqual([])
    }
  })

  it("places unknown @opengovsg/oui-theme symbols in leftoverSymbols", () => {
    // VariantProps is re-exported from tailwind-variants — not in any catalog.
    const r = classifyImport(
      "@opengovsg/oui-theme",
      ["buttonStyles", "VariantProps"],
      catalog,
    )
    expect(r.kind).toBe("theme-mixed")
    if (r.kind === "theme-mixed") {
      expect(r.variantBuckets.has("button")).toBe(true)
      expect(r.variantBuckets.get("button")?.symbols).toEqual(["buttonStyles"])
      expect(r.libBuckets.size).toBe(0)
      expect(r.leftoverSymbols).toEqual(["VariantProps"])
    }
  })

  it("classifies barrel imports from system/react-utils by resolving symbols", () => {
    const r = classifyImport(
      "../system/react-utils",
      ["createContext", "useDomRef"],
      catalog,
    )
    expect(r.kind).toBe("lib-barrel")
    if (r.kind === "lib-barrel") {
      // createContext → context lib; useDomRef → refs lib
      expect(r.libBuckets.size).toBe(2)
    }
  })

  it("classifies hooks barrel imports", () => {
    const r = classifyImport("../hooks", ["useControllableState"], catalog)
    expect(r.kind).toBe("lib-barrel")
    if (r.kind === "lib-barrel") {
      expect(r.libBuckets.size).toBe(1)
      expect([...r.libBuckets.keys()][0]).toBe("use-controllable-state")
    }
  })

  it("classifies relative same-directory imports as internal-same-dir", () => {
    // E.g., modal.tsx importing from "./modal-body"
    const r = classifyImport("./modal-body", ["ModalBody"], catalog)
    expect(r.kind).toBe("internal-same-dir")
  })
})
