import path from "node:path"
import type { RawDocLinks } from "@/lib/doc-links"
import type { source } from "@/lib/source"
import type { Heading, Paragraph, Root, RootContent } from "mdast"
import { resolveDocLinks } from "@/lib/doc-links"
import matter from "gray-matter"
import remarkGfm from "remark-gfm"
import remarkMdx from "remark-mdx"
import remarkParse from "remark-parse"
import remarkStringify from "remark-stringify"
import { unified } from "unified"

import { applyTransforms } from "./transform"

type DocPage = ReturnType<typeof source.getPages>[number]

/**
 * Whether a page is exposed on the agent-facing surface (llms.txt + markdown
 * routes). WIP and unpublished docs are excluded, mirroring the old generator.
 */
export function isLlmExposed(page: DocPage): boolean {
  return page.data.status !== "wip" && page.data.published !== false
}

const EXAMPLES_DIR = path.join(process.cwd(), "registry", "examples")

const parser = unified().use(remarkParse).use(remarkMdx)
const stringifier = unified()
  .use(remarkGfm)
  .use(remarkStringify, { bullet: "-", fences: true, listItemIndent: "one" })

/**
 * Render a docs page as plain Markdown for LLM consumption. Reuses the doc's
 * raw MDX, expands `<ComponentPreview>`/`<ShadcnInstall>` into source/commands,
 * and frames it with a title, React Aria note and a "See also" footer — the
 * fumadocs-native replacement for the old `scripts/generate-llms` pipeline.
 */
export async function getLLMText(page: DocPage): Promise<string> {
  const data = page.data
  const raw = await data.getText("raw")
  const { content } = matter(raw)

  const tree = parser.parse(content) as Root
  await parser.run(tree)
  await applyTransforms(tree, { examplesDir: EXAMPLES_DIR })

  const rawLinks = data.links as RawDocLinks | undefined
  const links = resolveDocLinks(rawLinks)

  const prelude: RootContent[] = [
    {
      type: "heading",
      depth: 1,
      children: [{ type: "text", value: data.title }],
    } satisfies Heading,
  ]
  if (data.description) {
    prelude.push({
      type: "paragraph",
      children: [{ type: "text", value: data.description }],
    } satisfies Paragraph)
  }

  if (links.reactaria && rawLinks?.reactaria) {
    const primitive = rawLinks.reactaria.split("/").pop() ?? "the primitive"
    prelude.push({
      type: "blockquote",
      children: [
        {
          type: "paragraph",
          children: [
            { type: "text", value: "Built on React Aria's " },
            {
              type: "link",
              url: links.reactaria,
              title: null,
              children: [{ type: "text", value: primitive }],
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

  const tail = buildSeeAlso(links, data.title)

  const finalTree: Root = {
    type: "root",
    children: [...prelude, ...tree.children, ...tail],
  }

  const fm = buildFrontmatter(page)
  return fm + stringifier.stringify(finalTree)
}

function buildFrontmatter(page: DocPage): string {
  const data = page.data
  const links = resolveDocLinks(data.links as RawDocLinks | undefined)
  const lines = ["---", `title: ${data.title}`]
  if (data.description) lines.push(`description: ${data.description}`)
  if (data.category) lines.push(`category: ${data.category}`)
  if (links.source) lines.push(`source: ${links.source}`)
  if (links.reactaria) lines.push(`reactAria: ${links.reactaria}`)
  if (links.storybook) lines.push(`storybook: ${links.storybook}`)
  lines.push("---", "")
  return lines.join("\n")
}

function buildSeeAlso(
  links: ReturnType<typeof resolveDocLinks>,
  title: string,
): RootContent[] {
  const items: RootContent[] = []
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
    } as RootContent)
  }

  if (links.source) push("Source", "GitHub", links.source)
  if (links.reactaria) {
    const name = links.reactaria.split("/").pop() ?? "Primitive"
    push("React Aria primitive", name, links.reactaria)
  }
  if (links.storybook) push("Storybook", title, links.storybook)

  if (items.length === 0) return []

  return [
    { type: "thematicBreak" },
    {
      type: "paragraph",
      children: [
        { type: "strong", children: [{ type: "text", value: "See also:" }] },
      ],
    },
    { type: "list", ordered: false, spread: false, children: items },
  ] as RootContent[]
}
