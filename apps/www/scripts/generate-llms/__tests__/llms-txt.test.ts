import { describe, expect, it } from "vitest"

import { renderLlmsTxt } from "../llms-txt"

describe("renderLlmsTxt", () => {
  it("groups components by category and lists guides separately", () => {
    const txt = renderLlmsTxt({
      siteUrl: "https://oui.open.gov.sg",
      gettingStarted: [
        {
          slug: "installation",
          title: "Installation",
          description: "Install OUI and peer dependencies",
        },
        {
          slug: "theming",
          title: "Theming",
          description: "Customize tokens and theme",
        },
      ],
      components: [
        {
          slug: "button",
          title: "Button",
          description: "Used to trigger an action or event",
          category: "Form & Input",
        },
        {
          slug: "accordion",
          title: "Accordion",
          description: "A vertically stacked list of headers.",
          category: "Layout & Navigation",
        },
        {
          slug: "avatar",
          title: "Avatar",
          description: "Displays a user's profile picture, initials, or fallback icon.",
          category: "Display",
        },
        {
          slug: "card",
          title: "Card",
          description: "A surface for related content.",
          category: "Misc",
        },
      ],
    })

    expect(txt.startsWith("# @opengovsg/oui\n")).toBe(true)
    expect(txt).toMatch(/^> Open Government Products/m)

    // Sections present in expected order
    const headings = txt.match(/^## .+$/gm) ?? []
    expect(headings).toEqual([
      "## Getting started",
      "## Guides",
      "## Form & Input",
      "## Layout & Navigation",
      "## Display",
      "## Misc",
      "## Optional",
    ])

    // Each entry has a full URL
    expect(txt).toContain(
      "[Button](https://oui.open.gov.sg/llm/components/button.md): Used to trigger an action or event",
    )
    expect(txt).toContain(
      "[Installation](https://oui.open.gov.sg/llm/getting-started/installation.md):",
    )
    expect(txt).toContain(
      "[llms-full.txt](https://oui.open.gov.sg/llms-full.txt):",
    )
  })

  it("omits empty category sections (no components in that group)", () => {
    const txt = renderLlmsTxt({
      siteUrl: "https://oui.open.gov.sg",
      gettingStarted: [],
      components: [
        {
          slug: "button",
          title: "Button",
          description: "x",
          category: "Form & Input",
        },
      ],
    })

    expect(txt).toMatch(/^## Form & Input$/m)
    expect(txt).not.toMatch(/^## Layout & Navigation$/m)
    expect(txt).not.toMatch(/^## Overlays$/m)
  })
})
