import type { Heading, Paragraph, Root, RootContent } from "mdast"
import remarkGfm from "remark-gfm"
import remarkStringify from "remark-stringify"
import { unified } from "unified"

import type { ParsedDoc } from "./types"

const stringifier = unified()
  .use(remarkStringify, { bullet: "-", fences: true, listItemIndent: "one" })
  .use(remarkGfm)

export function renderComponentMarkdown(doc: ParsedDoc): string {
  const fm = doc.frontmatter
  const reactAriaUrl = fm.links?.reactaria

  // 1. Build frontmatter YAML (we hand-write to keep field order predictable).
  const fmLines: string[] = [
    "---",
    `title: ${fm.title}`,
    `description: ${fm.description}`,
  ]
  if (fm.category) fmLines.push(`category: ${fm.category}`)
  if (fm.links?.source) fmLines.push(`source: ${fm.links.source}`)
  if (reactAriaUrl) fmLines.push(`reactAria: ${reactAriaUrl}`)
  if (fm.links?.storybook) fmLines.push(`storybook: ${fm.links.storybook}`)
  fmLines.push("---", "")
  const frontmatterBlock = fmLines.join("\n")

  // 2. Inject H1 title + description paragraph + react-aria callout at the top of body.
  const prelude: RootContent[] = [
    {
      type: "heading",
      depth: 1,
      children: [{ type: "text", value: fm.title }],
    } satisfies Heading,
    {
      type: "paragraph",
      children: [{ type: "text", value: fm.description }],
    } satisfies Paragraph,
  ]

  if (reactAriaUrl) {
    const primitiveName =
      reactAriaUrl.split("/").pop() ?? "the upstream primitive"
    prelude.push({
      type: "blockquote",
      children: [
        {
          type: "paragraph",
          children: [
            { type: "text", value: "Built on React Aria's " },
            {
              type: "link",
              url: reactAriaUrl,
              title: null,
              children: [{ type: "text", value: primitiveName }],
            },
            {
              type: "text",
              value:
                ". For behavioral details (keyboard handling, ARIA semantics, advanced state) beyond what's documented here, see the upstream docs.",
            },
          ],
        },
      ],
    })
  }

  // 3. "See also" footer (always present if any link is available).
  const tail: RootContent[] = []
  const seeAlsoItems = buildSeeAlsoItems(fm)
  if (seeAlsoItems.length > 0) {
    tail.push({ type: "thematicBreak" })
    tail.push({
      type: "paragraph",
      children: [
        { type: "strong", children: [{ type: "text", value: "See also:" }] },
      ],
    })
    tail.push({
      type: "list",
      ordered: false,
      spread: false,
      children: seeAlsoItems,
    })
  }

  const finalTree: Root = {
    type: "root",
    children: [...prelude, ...doc.body.children, ...tail],
  }

  const body = stringifier.stringify(finalTree)
  return frontmatterBlock + body
}

function buildSeeAlsoItems(fm: ParsedDoc["frontmatter"]) {
  const items: Array<{
    type: "listItem"
    spread: false
    children: Array<{
      type: "paragraph"
      children: Array<
        | { type: "text"; value: string }
        | {
            type: "link"
            url: string
            title: null
            children: Array<{ type: "text"; value: string }>
          }
      >
    }>
  }> = []

  const push = (label: string, linkText: string, url: string) => {
    items.push({
      type: "listItem",
      spread: false,
      children: [
        {
          type: "paragraph",
          children: [
            { type: "text", value: `${label}: ` },
            {
              type: "link",
              url,
              title: null,
              children: [{ type: "text", value: linkText }],
            },
          ],
        },
      ],
    })
  }

  if (fm.links?.source) push("Source", "GitHub", fm.links.source)
  if (fm.links?.reactaria) {
    const name = fm.links.reactaria.split("/").pop() ?? "Primitive"
    push("React Aria primitive", name, fm.links.reactaria)
  }
  if (fm.links?.storybook) push("Storybook", fm.title, fm.links.storybook)

  return items
}
