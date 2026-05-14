import type { Heading, Paragraph, Root, RootContent } from "mdast"
import remarkGfm from "remark-gfm"
import remarkStringify from "remark-stringify"
import { unified } from "unified"

import type { ParsedDoc } from "./types"

const stringifier = unified()
  .use(remarkStringify, { bullet: "-", fences: true, listItemIndent: "one" })
  .use(remarkGfm)

export function renderGettingStartedMarkdown(doc: ParsedDoc): string {
  const fm = doc.frontmatter

  const fmBlock = ["---", `title: ${fm.title}`, `description: ${fm.description}`, "---", ""].join("\n")

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

  const finalTree: Root = {
    type: "root",
    children: [...prelude, ...doc.body.children],
  }

  return fmBlock + stringifier.stringify(finalTree)
}
