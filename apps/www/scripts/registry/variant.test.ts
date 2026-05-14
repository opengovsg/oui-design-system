// apps/www/scripts/registry/variant.test.ts
import { describe, expect, it } from "vitest"

import { buildCatalog } from "./catalog"
import { transformVariantFile } from "./variant"

describe("transformVariantFile", () => {
  it("transforms button.ts variant imports to @/lib/oui paths", () => {
    const catalog = buildCatalog()
    const buttonVariant = catalog.componentVariants.get("button")
    expect(buttonVariant).toBeDefined()

    const result = transformVariantFile(buttonVariant!.sourcePath, catalog)
    expect(result.code).toContain(`from "@/lib/oui/cn"`)
    expect(result.code).toContain(`from "@/lib/oui/tv"`)
    expect(result.code).toContain(`from "@/lib/oui/variants"`)
    expect(result.libDeps.has("cn")).toBe(true)
    expect(result.libDeps.has("tv")).toBe(true)
    expect(result.libDeps.has("variants")).toBe(true)
  })
})
