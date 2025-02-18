import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"
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
    remarkPlugins: [remarkGfm],
  },
})
