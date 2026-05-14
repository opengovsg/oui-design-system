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

    const md = renderComponentMarkdown(doc, {
      relatedDocs: new Map(),
    })

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

  it("renders a Related components section when related is set", async () => {
    const doc = await loadDoc(
      path.join(FIXTURES, "button-fixture.mdx"),
      "component",
    )
    doc.frontmatter.related = ["accordion-fake"]
    await applyTransforms(doc, { examplesDir: FIXTURES })

    const relatedDocs = new Map([
      [
        "accordion-fake",
        {
          title: "AccordionFake",
          description: "Fake accordion for testing.",
          url: "https://oui.open.gov.sg/llm/components/accordion-fake.md",
        },
      ],
    ])

    const md = renderComponentMarkdown(doc, { relatedDocs })

    expect(md).toContain("## Related components")
    expect(md).toContain(
      "[AccordionFake](https://oui.open.gov.sg/llm/components/accordion-fake.md)",
    )
    expect(md).toContain("Fake accordion for testing.")
  })

  it("throws on an unresolved related slug", async () => {
    const doc = await loadDoc(
      path.join(FIXTURES, "button-fixture.mdx"),
      "component",
    )
    doc.frontmatter.related = ["does-not-exist"]
    await applyTransforms(doc, { examplesDir: FIXTURES })

    expect(() =>
      renderComponentMarkdown(doc, { relatedDocs: new Map() }),
    ).toThrow(/does-not-exist/)
  })
})
