import type { Code, List, ListItem, Paragraph, Parent, Root, Text } from "mdast"
import type { MdxJsxFlowElement, MdxJsxTextElement } from "mdast-util-mdx-jsx"
import { siteConfig } from "@/config/site"
import { visit } from "unist-util-visit"

import { loadExample } from "./load-example"

interface TransformOptions {
  examplesDir: string
  /** `<kind>/<slug>` keys of docs that exist on the LLM markdown surface. */
  exposedSlugs: Set<string>
}

type AnyMdxJsx = MdxJsxFlowElement | MdxJsxTextElement

const getAttr = (node: AnyMdxJsx, name: string): string | undefined => {
  const attr = node.attributes?.find(
    (a) => a.type === "mdxJsxAttribute" && a.name === name,
  )
  if (!attr || attr.type !== "mdxJsxAttribute") return undefined
  return typeof attr.value === "string" ? attr.value : undefined
}

/**
 * Rewrites the doc body MDAST into plain Markdown suitable for LLM consumption:
 * live `<ComponentPreview>` demos become the underlying example source, install
 * widgets become shell commands, and presentational JSX is unwrapped. Ported
 * from the old `scripts/generate-llms/transform.ts`.
 */
export async function applyTransforms(
  tree: Root,
  opts: TransformOptions,
): Promise<void> {
  await transformComponentPreviews(tree, opts)
  unwrapSteps(tree)
  transformCardGroups(tree)
  transformShadcnInstall(tree)
  removeBrElements(tree)
  transformKbdElements(tree)
  rewriteInternalLinks(tree, opts.exposedSlugs)
  removeToasterElements(tree)
  stripUnknownJsx(tree)
}

async function transformComponentPreviews(
  tree: Root,
  opts: TransformOptions,
): Promise<void> {
  const replacements: Array<{
    parent: Parent
    index: number
    name: string
  }> = []

  visit(tree, (node, index, parent) => {
    if (!parent || index == null) return
    if (
      node.type !== "mdxJsxFlowElement" &&
      node.type !== "mdxJsxTextElement"
    ) {
      return
    }
    if ((node as AnyMdxJsx).name !== "ComponentPreview") return
    const name = getAttr(node as AnyMdxJsx, "name")
    if (!name) {
      throw new Error(
        `<ComponentPreview /> is missing a 'name' attribute (in body)`,
      )
    }
    replacements.push({ parent: parent as Parent, index, name })
  })

  // Process in reverse so indices stay valid as we mutate.
  for (let i = replacements.length - 1; i >= 0; i--) {
    const { parent, index, name } = replacements[i]
    const source = await loadExample(opts.examplesDir, name)
    const codeBlock: Code = {
      type: "code",
      lang: "tsx",
      value: `// registry/examples/${name}.tsx\n${source}`,
    }
    parent.children.splice(index, 1, codeBlock)
  }
}

function unwrapSteps(tree: Root): void {
  const targets = new Set(["Steps", "Step"])

  // Iterate until no more unwraps happen (Steps wraps Step, so two passes minimum).
  let changed = true
  while (changed) {
    changed = false
    visit(tree, (node, index, parent) => {
      if (!parent || index == null) return
      if (
        node.type !== "mdxJsxFlowElement" &&
        node.type !== "mdxJsxTextElement"
      ) {
        return
      }
      const name = (node as AnyMdxJsx).name
      if (!name || !targets.has(name)) return

      const children = (node as AnyMdxJsx).children ?? []
      ;(parent as Parent).children.splice(index, 1, ...children)
      changed = true
      return "skip"
    })
  }
}

function transformShadcnInstall(tree: Root): void {
  // <ShadcnInstall name="<slug>" /> → a fenced bash code block with the
  // `npx shadcn@latest add <registryBaseUrl>/<slug>.json` command.
  visit(tree, (node, index, parent) => {
    if (!parent || index == null) return
    if (
      node.type !== "mdxJsxFlowElement" &&
      node.type !== "mdxJsxTextElement"
    ) {
      return
    }
    if ((node as AnyMdxJsx).name !== "ShadcnInstall") return
    const name = getAttr(node as AnyMdxJsx, "name")
    if (!name) {
      throw new Error(`<ShadcnInstall /> is missing a 'name' attribute`)
    }
    const codeBlock: Code = {
      type: "code",
      lang: "bash",
      value: `npx shadcn@latest add ${siteConfig.registryBaseUrl}/${name}.json`,
    }
    ;(parent as Parent).children.splice(index, 1, codeBlock)
    return "skip"
  })
}

function removeBrElements(tree: Root): void {
  visit(tree, (node, index, parent) => {
    if (!parent || index == null) return
    if (
      node.type !== "mdxJsxFlowElement" &&
      node.type !== "mdxJsxTextElement"
    ) {
      return
    }
    if ((node as AnyMdxJsx).name !== "br") return
    ;(parent as Parent).children.splice(index, 1)
    return "skip"
  })
}

function transformKbdElements(tree: Root): void {
  visit(tree, (node, index, parent) => {
    if (!parent || index == null) return
    if (
      node.type !== "mdxJsxFlowElement" &&
      node.type !== "mdxJsxTextElement"
    ) {
      return
    }
    const jsxNode = node as AnyMdxJsx
    if (jsxNode.name !== "Kbd") return

    const textContent = extractTextContent(jsxNode.children)
    const textNode: Text = { type: "text", value: textContent }
    ;(parent as Parent).children.splice(index, 1, textNode)
  })
}

function rewriteInternalLinks(tree: Root, exposedSlugs: Set<string>): void {
  // Rewrite cross-doc /docs/<kind>/<slug> links so agents traversing the LLM
  // markdown surface stay inside the markdown routes (`/llms.mdx/...`). Links to
  // docs that aren't on the LLM surface (WIP/unpublished — no `.mdx` route) are
  // left pointing at the canonical `/docs/...` HTML page so they don't 404.
  const KIND_PATHS = ["components", "getting-started", "guides"]
  const pattern = new RegExp(
    `^/docs/(${KIND_PATHS.join("|")})/([^/#?]+)(#.*)?$`,
  )
  visit(tree, "link", (node) => {
    if (typeof node.url !== "string") return
    const match = node.url.match(pattern)
    if (!match) return
    const [, kind, slug, frag = ""] = match
    if (!exposedSlugs.has(`${kind}/${slug}`)) return
    node.url = `/llms.mdx/${kind}/${slug}${frag}`
  })
}

function removeToasterElements(tree: Root): void {
  // <Toaster /> is a placement marker for the docs site, not content.
  visit(tree, (node, index, parent) => {
    if (!parent || index == null) return
    if (
      node.type !== "mdxJsxFlowElement" &&
      node.type !== "mdxJsxTextElement"
    ) {
      return
    }
    if ((node as AnyMdxJsx).name !== "Toaster") return
    ;(parent as Parent).children.splice(index, 1)
    return "skip"
  })
}

function stripUnknownJsx(tree: Root): string[] {
  // Real OUI docs use inline component JSX (e.g. <SearchField>, <Avatar>) as
  // live demos. We strip the JSX wrapper and preserve children.
  const stripped: string[] = []
  const toRemove: Array<{ parent: Parent; index: number }> = []

  visit(tree, (node, index, parent) => {
    if (!parent || index == null) return
    if (
      node.type !== "mdxJsxFlowElement" &&
      node.type !== "mdxJsxTextElement"
    ) {
      return
    }
    const name = (node as AnyMdxJsx).name
    stripped.push(name ?? "<anonymous>")
    toRemove.push({ parent: parent as Parent, index })
  })

  for (let i = toRemove.length - 1; i >= 0; i--) {
    const { parent, index } = toRemove[i]
    const jsxNode = parent.children[index] as AnyMdxJsx
    const children = jsxNode.children ?? []
    parent.children.splice(index, 1, ...children)
  }

  return stripped
}

function transformCardGroups(tree: Root): void {
  // 1. Convert each <Card> into a ListItem with `[title](href) — description`.
  visit(tree, (node, index, parent) => {
    if (!parent || index == null) return
    if (
      node.type !== "mdxJsxFlowElement" &&
      node.type !== "mdxJsxTextElement"
    ) {
      return
    }
    if ((node as AnyMdxJsx).name !== "Card") return

    const title = getAttr(node as AnyMdxJsx, "title") ?? ""
    const href = getAttr(node as AnyMdxJsx, "href") ?? ""
    const description = extractTextContent((node as AnyMdxJsx).children).trim()

    const paragraph: Paragraph = {
      type: "paragraph",
      children: [
        {
          type: "link",
          url: href,
          title: null,
          children: [{ type: "text", value: title } satisfies Text],
        },
        ...(description
          ? [{ type: "text", value: ` — ${description}` } satisfies Text]
          : []),
      ],
    }

    const listItem: ListItem = {
      type: "listItem",
      spread: false,
      children: [paragraph],
    }

    ;(parent as Parent).children.splice(
      index,
      1,
      listItem as unknown as Parent["children"][number],
    )
  })

  // 2. Convert each <CardGroup> into a List wrapping its now-ListItem children.
  visit(tree, (node, index, parent) => {
    if (!parent || index == null) return
    if (
      node.type !== "mdxJsxFlowElement" &&
      node.type !== "mdxJsxTextElement"
    ) {
      return
    }
    if ((node as AnyMdxJsx).name !== "CardGroup") return

    const items = ((node as AnyMdxJsx).children ?? []).filter(
      (c) => (c as { type: string }).type === "listItem",
    ) as unknown as ListItem[]

    const list: List = {
      type: "list",
      ordered: false,
      spread: false,
      children: items,
    }

    ;(parent as Parent).children.splice(
      index,
      1,
      list as unknown as Parent["children"][number],
    )
  })
}

function extractTextContent(nodes: AnyMdxJsx["children"] | undefined): string {
  if (!nodes) return ""
  let out = ""
  for (const child of nodes) {
    if (child.type === "text") out += child.value
    else if (
      "children" in child &&
      Array.isArray((child as { children: unknown[] }).children)
    ) {
      out += extractTextContent(
        (child as { children: AnyMdxJsx["children"] }).children,
      )
    }
  }
  return out
}
