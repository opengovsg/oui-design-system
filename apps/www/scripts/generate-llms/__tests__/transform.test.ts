import path from "node:path"
import { describe, expect, it } from "vitest"

import { loadDoc } from "../load-docs"
import { applyTransforms } from "../transform"

const FIXTURES = path.join(__dirname, "fixtures")

describe("applyTransforms — ComponentPreview", () => {
  it("replaces <ComponentPreview name='X' /> with a tsx code block containing the loaded example", async () => {
    const doc = await loadDoc(
      path.join(FIXTURES, "button-fixture.mdx"),
      "component",
    )

    await applyTransforms(doc, { examplesDir: FIXTURES })

    const json = JSON.stringify(doc.body)
    // ComponentPreview JSX nodes are gone
    expect(json).not.toContain("ComponentPreview")
    // A code block with the example source has been inserted
    expect(json).toContain("export const Example")
    expect(json).toContain("registry/examples/button-demo-fixture.tsx")
  })

  it("throws if a referenced example does not exist", async () => {
    const doc = await loadDoc(
      path.join(FIXTURES, "button-fixture.mdx"),
      "component",
    )
    // Inject a bad reference into the AST
    doc.body.children.unshift({
      type: "mdxJsxFlowElement",
      name: "ComponentPreview",
      attributes: [
        { type: "mdxJsxAttribute", name: "name", value: "does-not-exist" },
      ],
      children: [],
    } as never)

    await expect(
      applyTransforms(doc, { examplesDir: FIXTURES }),
    ).rejects.toThrow(/does-not-exist/)
  })
})
