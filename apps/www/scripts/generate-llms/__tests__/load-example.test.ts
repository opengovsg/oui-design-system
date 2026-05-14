import path from "node:path"
import { describe, expect, it } from "vitest"

import { loadExample } from "../load-example"

const FIXTURES = path.join(__dirname, "fixtures")

describe("loadExample", () => {
  it("strips 'use client' and rewrites the default export", async () => {
    const source = await loadExample(FIXTURES, "button-demo-fixture")
    expect(source).not.toContain('"use client"')
    expect(source).not.toContain("export default function ButtonDemo")
    expect(source).toContain("export const Example = () => {")
    expect(source).toContain('import { Button } from "@opengovsg/oui"')
    expect(source.startsWith("import")).toBe(true)
  })

  it("throws if the example file does not exist", async () => {
    await expect(loadExample(FIXTURES, "does-not-exist")).rejects.toThrow(
      /does-not-exist/,
    )
  })
})
