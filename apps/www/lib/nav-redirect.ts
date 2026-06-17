import type * as PageTree from "fumadocs-core/page-tree"
import { source } from "@/lib/source"

/** Page urls in page-tree (i.e. meta.json) order, depth-first. */
function orderedPageUrls(nodes: PageTree.Node[]): string[] {
  const out: string[] = []
  for (const node of nodes) {
    if (node.type === "page") {
      out.push(node.url)
    } else if (node.type === "folder") {
      if (node.index) out.push(node.index.url)
      out.push(...orderedPageUrls(node.children))
    }
  }
  return out
}

/**
 * Resolve a slug that has no page of its own (the `/docs` root or a section
 * folder such as `/docs/getting-started`) to its first child page.
 */
export function getFirstChildUrl(slug: string[]): string | undefined {
  const urls = orderedPageUrls(source.pageTree.children)
  if (slug.length === 0) return urls[0]
  const prefix = `/docs/${slug.join("/")}`
  return urls.find((url) => url === prefix || url.startsWith(`${prefix}/`))
}
