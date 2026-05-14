// apps/www/scripts/registry/discover.test.ts
import { describe, expect, it } from "vitest"

import { discoverComponents } from "./discover"

describe("discoverComponents", () => {
  it("lists every component directory under packages/components/src", () => {
    const names = discoverComponents()
    // Spot-check known components
    expect(names).toContain("button")
    expect(names).toContain("modal")
    expect(names).toContain("text-field")
    // Skips non-component dirs
    expect(names).not.toContain("system")
    expect(names).not.toContain("hooks")
  })
})
