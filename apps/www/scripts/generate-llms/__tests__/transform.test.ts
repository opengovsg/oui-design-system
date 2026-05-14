import path from "node:path"
import { describe, expect, it, vi } from "vitest"

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
    // URLs are rewritten to the /llm/ surface by the link-rewrite transform
    expect(json).toContain("/llm/getting-started/next.md")
    expect(json).toContain("Use OUI with Next.js apps")
    expect(json).toContain("/llm/getting-started/vite.md")
  })
})

describe("applyTransforms — unhandled JSX", () => {
  it("strips unknown JSX wrapping (preserving children) and warns to console", async () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {})

    try {
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

      await applyTransforms(doc, { examplesDir: FIXTURES })

      const json = JSON.stringify(doc.body)
      // Wrapper element is gone
      expect(json).not.toContain('"name":"Toggle"')
      // Children are preserved
      expect(json).toContain("Enable notifications")
      // Warning emitted with element name and slug
      expect(warnSpy).toHaveBeenCalled()
      const warning = warnSpy.mock.calls[0]?.[0] as string
      expect(warning).toContain("button-fixture")
      expect(warning).toContain("Toggle")
    } finally {
      warnSpy.mockRestore()
    }
  })
})

describe("applyTransforms — Toaster", () => {
  it("strips <Toaster /> silently (no warning)", async () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {})
    try {
      const doc = await loadDoc(
        path.join(FIXTURES, "button-fixture.mdx"),
        "component",
      )
      doc.body.children.unshift({
        type: "mdxJsxFlowElement",
        name: "Toaster",
        attributes: [],
        children: [],
      } as never)

      await applyTransforms(doc, { examplesDir: FIXTURES })

      const json = JSON.stringify(doc.body)
      expect(json).not.toContain('"name":"Toaster"')
      // No warning emitted for Toaster specifically
      const toasterWarning = warnSpy.mock.calls.find((c) =>
        String(c[0]).includes("Toaster"),
      )
      expect(toasterWarning).toBeUndefined()
    } finally {
      warnSpy.mockRestore()
    }
  })
})

describe("applyTransforms — link rewriting", () => {
  it("rewrites /docs/<kind>/<slug> links to /llm/<kind>/<slug>.md", async () => {
    const doc = await loadDoc(
      path.join(FIXTURES, "button-fixture.mdx"),
      "component",
    )
    // Inject a paragraph with links of each kind we care about
    doc.body.children.push({
      type: "paragraph",
      children: [
        {
          type: "link",
          url: "/docs/components/combo-box",
          title: null,
          children: [{ type: "text", value: "ComboBox" }],
        },
        {
          type: "link",
          url: "/docs/components/select#validation",
          title: null,
          children: [{ type: "text", value: "Select Validation" }],
        },
        {
          type: "link",
          url: "/docs/getting-started/installation",
          title: null,
          children: [{ type: "text", value: "Install" }],
        },
        {
          type: "link",
          url: "/docs/guides/forms#validation",
          title: null,
          children: [{ type: "text", value: "Forms Validation" }],
        },
        {
          type: "link",
          url: "https://react-aria.adobe.com/ComboBox",
          title: null,
          children: [{ type: "text", value: "External" }],
        },
        {
          type: "link",
          url: "#in-page",
          title: null,
          children: [{ type: "text", value: "In-page" }],
        },
      ],
    } as never)

    await applyTransforms(doc, { examplesDir: FIXTURES })

    const json = JSON.stringify(doc.body)
    expect(json).toContain("/llm/components/combo-box.md")
    expect(json).toContain("/llm/components/select.md#validation")
    expect(json).toContain("/llm/getting-started/installation.md")
    expect(json).toContain("/llm/guides/forms.md#validation")
    // External and in-page links untouched
    expect(json).toContain("https://react-aria.adobe.com/ComboBox")
    expect(json).toContain('"url":"#in-page"')
    // No raw /docs/<kind>/<slug> survives
    expect(json).not.toMatch(/"url":"\/docs\/(components|getting-started|guides)\//)
  })
})
