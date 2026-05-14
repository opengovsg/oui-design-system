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

describe("applyTransforms — Steps", () => {
  it("unwraps <Steps>/<Step> while preserving inner content", async () => {
    const doc = await loadDoc(
      path.join(FIXTURES, "installation-fixture.mdx"),
      "getting-started",
    )

    await applyTransforms(doc, { examplesDir: FIXTURES })

    const json = JSON.stringify(doc.body)
    expect(json).not.toContain('"name":"Steps"')
    expect(json).not.toContain('"name":"Step"')
    // Inner content preserved
    expect(json).toContain("Install the package")
    expect(json).toContain("Add to your Tailwind file")
  })
})

describe("applyTransforms — CardGroup/Card", () => {
  it("converts Card elements into markdown bullets and removes CardGroup wrapping", async () => {
    const doc = await loadDoc(
      path.join(FIXTURES, "installation-fixture.mdx"),
      "getting-started",
    )

    await applyTransforms(doc, { examplesDir: FIXTURES })

    const json = JSON.stringify(doc.body)
    expect(json).not.toContain('"name":"CardGroup"')
    expect(json).not.toContain('"name":"Card"')
    // Both cards rendered as list items with link + description
    expect(json).toContain("/docs/getting-started/next")
    expect(json).toContain("Use OUI with Next.js apps")
    expect(json).toContain("/docs/getting-started/vite")
  })
})

describe("applyTransforms — unhandled JSX", () => {
  it("throws if an MDX JSX element is left after transformation", async () => {
    const doc = await loadDoc(
      path.join(FIXTURES, "button-fixture.mdx"),
      "component",
    )
    // Inject a JSX element that no transform handles
    doc.body.children.unshift({
      type: "mdxJsxFlowElement",
      name: "Toggle",
      attributes: [],
      children: [{ type: "text", value: "Enable notifications" }],
    } as never)

    await expect(
      applyTransforms(doc, { examplesDir: FIXTURES }),
    ).rejects.toThrow(/Unhandled MDX JSX nodes in "button-fixture": Toggle/)
  })
})
