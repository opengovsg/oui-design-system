import path from "node:path"
import { describe, expect, it } from "vitest"

import { loadDoc } from "../load-docs"

const FIXTURES = path.join(__dirname, "fixtures")

describe("loadDoc", () => {
  it("parses frontmatter, resolves link slugs to full URLs, and parses body into mdast", async () => {
    const doc = await loadDoc(
      path.join(FIXTURES, "button-fixture.mdx"),
      "component",
    )

    expect(doc.kind).toBe("component")
    expect(doc.slug).toBe("button-fixture")
    expect(doc.frontmatter.title).toBe("Button")
    expect(doc.frontmatter.category).toBe("Form & Input")
    // Slug `Button` resolves to the full react-aria URL
    expect(doc.frontmatter.links?.reactaria).toBe(
      "https://react-aria.adobe.com/Button",
    )
    // Slug `button` resolves to the GitHub source URL
    expect(doc.frontmatter.links?.source).toMatch(
      /github\.com\/opengovsg\/oui-design-system\/tree\/main\/packages\/components\/src\/button$/,
    )
    // Slug `components-button--default` resolves to a Storybook URL
    expect(doc.frontmatter.links?.storybook).toContain(
      "?path=/story/components-button--default",
    )
    expect(doc.body.type).toBe("root")
    // Body contains the ComponentPreview JSX as an mdxJsxFlowElement
    const hasComponentPreview = JSON.stringify(doc.body).includes(
      "ComponentPreview",
    )
    expect(hasComponentPreview).toBe(true)
  })
})
