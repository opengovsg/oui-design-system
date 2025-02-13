import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeKatex from "rehype-katex"
import rehypePrettyCode, { LineElement } from "rehype-pretty-code"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"
import { visit } from "unist-util-visit"
import { defineCollection, defineConfig, s } from "velite"

import { docsConfig } from "./config/docs.config"

export const docs = defineCollection({
  name: "Docs",
  pattern: "docs/**/*.mdx",
  schema: s
    .object({
      slug: s.path(),
      title: s.string(),
      description: s.string(),
      published: s.boolean().default(true),
      label: s.enum(["New", "Updated"]).optional(),
      body: s.mdx(),
      toc: s.object({
        content: s.toc(),
        visible: s.boolean().default(true),
      }),
      links: s
        .object({
          source: s.string().optional(),
          storybook: s.string().optional(),
          theme: s.string().optional(),
        })
        .optional(),
    })
    .transform((data) => {
      const links = data.links ?? {}
      return {
        ...data,
        slugAsParams: data.slug.split("/").slice(1).join("/"),
        links: {
          ...links,
          source: links.source
            ? `${docsConfig.repoUrl}/tree/${docsConfig.repoBranch}/packages/components/src/${links.source}`
            : undefined,
          storybook: links.storybook
            ? `${docsConfig.storybookUrl}/?path=/story/${links.storybook}`
            : undefined,
          theme: links.theme
            ? `${docsConfig.repoUrl}/tree/${docsConfig.repoBranch}/packages/theme/src/components/${links.source}.ts`
            : undefined,
        },
      }
    }),
})

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: { docs },
  mdx: {
    rehypePlugins: [
      rehypeSlug,
      rehypeKatex,
      [
        rehypePrettyCode,
        {
          theme: "houston",
          onVisitLine(node: LineElement) {
            // Prevent lines from collapsing in `display: grid` mode, and allow empty
            // lines to be copy/pasted
            if (node.children.length === 0) {
              node.children = [{ type: "text", value: " " }]
            }
          },
          onVisitHighlightedLine(node: LineElement) {
            node.properties.className?.push("line--highlighted")
          },
          onVisitHighlightedWord(node: LineElement) {
            node.properties.className = ["word--highlighted"]
          },
        },
      ],
      () => (tree) => {
        visit(tree, (node) => {
          if (node?.type === "element" && node?.tagName === "div") {
            if ("data-rehype-pretty-code-title" in node.properties) {
              node.properties["data-rehype-pretty-code-title"] = "Code"
            }

            if (!("data-rehype-pretty-code-fragment" in node.properties)) {
              return
            }

            const preElement = node.children.at(-1)
            if (preElement.tagName !== "pre") {
              return
            }

            preElement.properties["__withMeta__"] =
              node.children.at(0).tagName === "div"
            preElement.properties["__rawString__"] = node.__rawString__

            if (node.__src__) {
              preElement.properties["__src__"] = node.__src__
            }

            if (node.__event__) {
              preElement.properties["__event__"] = node.__event__
            }

            if (node.__style__) {
              preElement.properties["__style__"] = node.__style__
            }
          }
        })
      },
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ["subheading-anchor"],
            ariaLabel: "Link to section",
          },
        },
      ],
    ],
    remarkPlugins: [remarkMath, remarkGfm],
  },
})
