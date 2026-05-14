import path from "node:path"
import { describe, expect, it } from "vitest"

import { renderGettingStartedMarkdown } from "../getting-started-md"
import { loadDoc } from "../load-docs"
import { applyTransforms } from "../transform"

const FIXTURES = path.join(__dirname, "fixtures")

describe("renderGettingStartedMarkdown", () => {
  it("renders frontmatter + body without related/see-also sections", async () => {
    const doc = await loadDoc(
      path.join(FIXTURES, "installation-fixture.mdx"),
      "getting-started",
    )
    await applyTransforms(doc, { examplesDir: FIXTURES })

    const md = renderGettingStartedMarkdown(doc)

    expect(md.startsWith("---\n")).toBe(true)
    expect(md).toMatch(/title: Installation/)
    expect(md).toMatch(/# Installation\n/)
    expect(md).toContain("How to install OUI")
    // No See also / Related components
    expect(md).not.toContain("**See also:**")
    expect(md).not.toContain("## Related components")
    // Card content surfaced as bullets (from earlier transform)
    expect(md).toContain("/docs/getting-started/next")
  })
})
