import type { Code, List, ListItem, Paragraph, Parent, Root, Text } from "mdast"
import type { MdxJsxFlowElement, MdxJsxTextElement } from "mdast-util-mdx-jsx"
import { visit } from "unist-util-visit"

import { loadExample } from "./load-example"
import type { ParsedDoc } from "./types"

interface TransformOptions {
  examplesDir: string
}

type AnyMdxJsx = MdxJsxFlowElement | MdxJsxTextElement

const getAttr = (node: AnyMdxJsx, name: string): string | undefined => {
  const attr = node.attributes?.find(
    (a) => a.type === "mdxJsxAttribute" && a.name === name,
  )
  if (!attr || attr.type !== "mdxJsxAttribute") return undefined
  return typeof attr.value === "string" ? attr.value : undefined
}

export async function applyTransforms(
  doc: ParsedDoc,
  opts: TransformOptions,
): Promise<void> {
  await transformComponentPreviews(doc.body, opts)
  unwrapSteps(doc.body)
  transformCardGroups(doc.body)
  removeBrElements(doc.body)
  transformKbdElements(doc.body)
  stripUnknownJsx(doc.body)
}

function assertNoUnhandledJsx(doc: ParsedDoc): void {
  const unknown: string[] = []
  visit(doc.body, (node) => {
    if (
      node.type === "mdxJsxFlowElement" ||
      node.type === "mdxJsxTextElement"
    ) {
      unknown.push((node as AnyMdxJsx).name ?? "<anonymous>")
    }
  })
  if (unknown.length > 0) {
    const names = [...new Set(unknown)].join(", ")
    throw new Error(
      `Unhandled MDX JSX nodes in "${doc.slug}": ${names}. ` +
        `Add a transform in transform.ts or remove the JSX from the MDX.`,
    )
  }
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

function removeBrElements(tree: Root): void {
  // Remove <br /> elements as they're purely presentational and not needed for LLM output
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
  // Convert <Kbd>text</Kbd> into plain text, since keyboard notation is less relevant in LLM context
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

    // Extract text content from children
    const textContent = extractTextContent(jsxNode.children)

    // Replace the Kbd node with a text node
    const textNode: Text = {
      type: "text",
      value: textContent,
    }
    ;(parent as Parent).children.splice(index, 1, textNode)
  })
}

function stripUnknownJsx(tree: Root): void {
  // Remove any remaining JSX elements (like <Toaster />, etc) that aren't handled by transforms.
  // For elements with children, preserve the children; for self-closing elements, just remove.
  const toRemove: Array<{ parent: Parent; index: number }> = []

  visit(tree, (node, index, parent) => {
    if (!parent || index == null) return
    if (
      node.type !== "mdxJsxFlowElement" &&
      node.type !== "mdxJsxTextElement"
    ) {
      return
    }
    toRemove.push({ parent: parent as Parent, index })
  })

  // Process in reverse to keep indices valid
  for (let i = toRemove.length - 1; i >= 0; i--) {
    const { parent, index } = toRemove[i]
    const jsxNode = parent.children[index] as AnyMdxJsx
    const children = jsxNode.children ?? []

    // Replace the JSX element with its children (or nothing if no children)
    parent.children.splice(index, 1, ...children)
  }
}

function transformCardGroups(tree: Root): void {
  // 1. Convert each <Card> into a ListItem with `[title](href) — description`.
  // 2. Convert each <CardGroup> into a List wrapping its now-ListItem children.

  // First: replace Card nodes with ListItems
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

    ;(parent as Parent).children.splice(index, 1, listItem as unknown as Parent["children"][number])
  })

  // Second: replace CardGroup nodes with List nodes containing the ListItem siblings
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
      (c): c is ListItem => c.type === "listItem",
    )

    const list: List = {
      type: "list",
      ordered: false,
      spread: false,
      children: items,
    }

    ;(parent as Parent).children.splice(index, 1, list as unknown as Parent["children"][number])
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
