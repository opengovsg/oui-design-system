import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypePrettyCode, { Options } from "rehype-pretty-code"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"
import { createHighlighter } from "shiki"
import { visit } from "unist-util-visit"
import { defineCollection, defineConfig, s } from "velite"

import { docsConfig } from "./config/docs.config"
import { rehypeNpmCommand } from "./plugins/rehype-npm-command"

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
      body: s.mdx({ copyLinkedFiles: false }),
      toc: s
        .object({
          content: s.toc(),
          visible: s.boolean().default(true),
        })
        .default({}),
      links: s
        .object({
          source: s.string().optional(),
          storybook: s.string().optional(),
          theme: s.string().optional(),
          reactaria: s.string().optional(),
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
            ? `${docsConfig.repoUrl}/tree/${docsConfig.repoBranch}/packages/theme/src/components/${links.theme}.ts`
            : undefined,
          reactaria: links.reactaria
            ? `https://react-spectrum.adobe.com/react-aria/${links.reactaria}.html`
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
      () => (tree) => {
        visit(tree, (node) => {
          if (node?.type === "element" && node?.tagName === "pre") {
            const [codeEl] = node.children
            if (codeEl.tagName !== "code") {
              return
            }

            if (codeEl.data?.meta) {
              // Extract event from meta and pass it down the tree.
              const regex = /event="([^"]*)"/
              const match = codeEl.data?.meta.match(regex)
              if (match) {
                node.__event__ = match ? match[1] : null
                codeEl.data.meta = codeEl.data.meta.replace(regex, "")
              }
            }

            node.__rawString__ = codeEl.children?.[0].value
            node.__src__ = node.properties?.__src__
            node.__style__ = node.properties?.__style__
          }
        })
      },
      [
        rehypePrettyCode,
        {
          theme: "aurora-x",
          getHighlighter: createHighlighter,
        } as Options,
      ],
      () => (tree) => {
        visit(tree, (node) => {
          if (node?.type === "element" && node?.tagName === "figure") {
            if (!("data-rehype-pretty-code-figure" in node.properties)) {
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

      rehypeNpmCommand,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "wrap",
          properties: {
            className: ["subheading-anchor"],
          },
        },
      ],
    ],
    remarkPlugins: [remarkGfm],
  },
})
