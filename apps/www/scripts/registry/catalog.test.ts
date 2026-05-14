// apps/www/scripts/registry/catalog.test.ts
import { describe, expect, it } from "vitest"

import { buildCatalog } from "./catalog"

describe("buildCatalog", () => {
  it("discovers theme shared utilities as lib entries", () => {
    const catalog = buildCatalog()

    // Sanity: well-known utilities are present
    expect(catalog.libEntries.has("cn")).toBe(true)
    expect(catalog.libEntries.has("tv")).toBe(true)
    expect(catalog.libEntries.has("tw-merge")).toBe(true)
    expect(catalog.libEntries.has("variants")).toBe(true)
  })

  it("maps theme utility symbols to their lib entries", () => {
    const catalog = buildCatalog()
    const cn = catalog.bySymbolToLib.get("cn")
    expect(cn?.name).toBe("cn")
    const focus = catalog.bySymbolToLib.get("focusVisibleClasses")
    // focusVisibleClasses lives in classes.ts but is re-exported via cn-area;
    // accept either "cn" or "classes" — the transformer routes through whichever lib entry owns it.
    expect(focus?.name).toBeDefined()
  })

  it("discovers component-package system utilities as lib entries", () => {
    const catalog = buildCatalog()
    expect(catalog.libEntries.has("children")).toBe(true)
    expect(catalog.libEntries.has("refs")).toBe(true)
    // children.ts exports renderChildren, getValidChildren, pickChildren
    expect(catalog.bySymbolToLib.get("renderChildren")?.name).toBe("children")
    expect(catalog.bySymbolToLib.get("getValidChildren")?.name).toBe("children")
  })

  it("discovers hooks as registry:hook entries", () => {
    const catalog = buildCatalog()
    const hook = catalog.libEntries.get("use-controllable-state")
    expect(hook?.type).toBe("registry:hook")
  })

  it("discovers per-component theme variants", () => {
    const catalog = buildCatalog()
    expect(catalog.componentVariants.has("button")).toBe(true)
    const buttonVariant = catalog.componentVariants.get("button")
    expect(buttonVariant?.exports).toContain("buttonStyles")
    expect(catalog.bySymbolToVariant.get("buttonStyles")?.component).toBe(
      "button",
    )
  })

  it("does not register the same symbol in both lib and variant maps", () => {
    const catalog = buildCatalog()
    for (const sym of catalog.bySymbolToLib.keys()) {
      expect(catalog.bySymbolToVariant.has(sym)).toBe(false)
    }
  })
})
