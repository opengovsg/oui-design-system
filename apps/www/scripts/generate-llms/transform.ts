import type { Code, Parent, Root } from "mdast"
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
  // Placeholder — implemented in Task 7
  void tree
}

function transformCardGroups(tree: Root): void {
  // Placeholder — implemented in Task 8
  void tree
}
