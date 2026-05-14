import path from "node:path"
import { describe, expect, it } from "vitest"

import { renderComponentMarkdown } from "../component-md"
import { loadDoc } from "../load-docs"
import { applyTransforms } from "../transform"

const FIXTURES = path.join(__dirname, "fixtures")

describe("renderComponentMarkdown", () => {
  it("renders frontmatter, react-aria callout, body, and 'See also' footer", async () => {
    const doc = await loadDoc(
      path.join(FIXTURES, "button-fixture.mdx"),
      "component",
    )
    await applyTransforms(doc, { examplesDir: FIXTURES })

    const md = renderComponentMarkdown(doc)

    // Frontmatter present
    expect(md.startsWith("---\n")).toBe(true)
    expect(md).toMatch(/title: Button/)
    expect(md).toMatch(/category: Form & Input/)
    // H1 title and description paragraph injected at top of body
    expect(md).toMatch(/# Button\n/)
    expect(md).toContain("Used to trigger an action or event")
    // React Aria callout near the top
    expect(md).toMatch(/Built on React Aria's \[Button\]/)
    // Inlined example
    expect(md).toContain("export const Example")
    expect(md).toContain("// registry/examples/button-demo-fixture.tsx")
    // See also footer
    expect(md).toMatch(/\*\*See also:\*\*/)
    // Source URL was resolved from the slug `button` via docsConfig
    expect(md).toMatch(
      /github\.com\/opengovsg\/oui-design-system\/tree\/main\/packages\/components\/src\/button/,
    )
  })

})
