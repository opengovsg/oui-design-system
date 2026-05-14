import path from "node:path"
import { describe, expect, it } from "vitest"

import { extractPropNames } from "../coverage"

const TYPES_DIR = path.join(__dirname, "fixtures", "coverage")

describe("extractPropNames", () => {
  it("finds props in a sibling file via re-export pattern", async () => {
    const result = await extractPropNames(TYPES_DIR, "sibling-file")
    expect(result.propsSource).toContain("types.d.ts")
    expect(result.propNames).toEqual(expect.arrayContaining(["alpha", "beta"]))
  })

  it("finds props across multiple interfaces in one file", async () => {
    const result = await extractPropNames(TYPES_DIR, "multi-interface")
    expect(result.propNames).toEqual(
      expect.arrayContaining(["one", "two", "three"]),
    )
  })

  it("finds props in a type alias", async () => {
    const result = await extractPropNames(TYPES_DIR, "type-alias")
    expect(result.propNames).toEqual(
      expect.arrayContaining(["gamma", "delta"]),
    )
  })

  it("emits an entry with 0 props for an empty interface body", async () => {
    const result = await extractPropNames(TYPES_DIR, "empty-extends")
    expect(result.propsSource).toContain("empty-extends.d.ts")
    expect(result.propNames).toEqual([])
  })

  it('returns propsSource "none" when no Props interface or alias is found', async () => {
    const result = await extractPropNames(TYPES_DIR, "no-props")
    expect(result.propsSource).toBe("none")
    expect(result.propNames).toEqual([])
  })

  it('returns propsSource "none" for a missing directory', async () => {
    const result = await extractPropNames(TYPES_DIR, "does-not-exist")
    expect(result.propsSource).toBe("none")
    expect(result.propNames).toEqual([])
  })
})
