import { readFile } from "node:fs/promises"
import path from "node:path"
import type { Root } from "mdast"
import matter from "gray-matter"
import remarkGfm from "remark-gfm"
import remarkMdx from "remark-mdx"
import remarkParse from "remark-parse"
import { unified } from "unified"

import type { DocFrontmatter, ParsedDoc } from "./types"
import { docsConfig } from "../../config/docs.config"

const processor = unified().use(remarkParse).use(remarkMdx).use(remarkGfm)

const isAbsoluteUrl = (v: string): boolean => /^https?:\/\//.test(v)

/**
 * Mirrors the frontmatter `.transform()` in `velite.config.ts` so that the
 * generator sees the same resolved URLs Velite produces for the HTML site.
 * Values already starting with `http://` or `https://` pass through unchanged
 * (this keeps fixtures and any future absolute-URL frontmatter robust).
 */
function resolveLinks(
  raw: DocFrontmatter["links"] | undefined,
): DocFrontmatter["links"] {
  if (!raw) return undefined
  const resolve = (
    v: string | undefined,
    template: (slug: string) => string,
  ): string | undefined =>
    v === undefined ? undefined : isAbsoluteUrl(v) ? v : template(v)

  return {
    source: resolve(
      raw.source,
      (slug) =>
        `${docsConfig.repoUrl}/tree/${docsConfig.repoBranch}/packages/components/src/${slug}`,
    ),
    theme: resolve(
      raw.theme,
      (slug) =>
        `${docsConfig.repoUrl}/tree/${docsConfig.repoBranch}/packages/theme/src/components/${slug}.ts`,
    ),
    storybook: resolve(
      raw.storybook,
      (slug) => `${docsConfig.storybookUrl}/?path=/story/${slug}`,
    ),
    reactaria: resolve(
      raw.reactaria,
      (slug) => `https://react-aria.adobe.com/${slug}`,
    ),
  }
}

export async function loadDoc(
  filePath: string,
  kind: ParsedDoc["kind"],
): Promise<ParsedDoc> {
  const raw = await readFile(filePath, "utf8")
  const { data, content } = matter(raw)
  const tree = processor.parse(content) as Root

  const frontmatter = {
    ...(data as DocFrontmatter),
    links: resolveLinks((data as DocFrontmatter).links),
  }

  return {
    slug: path.basename(filePath, ".mdx"),
    kind,
    frontmatter,
    body: tree,
  }
}
