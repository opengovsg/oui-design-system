import { defineCollection, defineConfig, s } from "velite"

const cwd = process.cwd()

const slugify = (str: string) => {
  return str
    .replace(/.*\/content\//, "")
    .replace(/\.mdx$/, "")
    .replace(cwd, "")
}

const docs = defineCollection({
  name: "Docs", // collection type name
  pattern: "content/docs/**/*.mdx",
  schema: s
    .object({
      title: s.string().max(99),
      description: s.string(),
      metadata: s.metadata(),
      content: s.markdown(),
      status: s.string().optional(),
      links: s
        .object({
          source: s.string().optional(),
          storybook: s.string().optional(),
          theme: s.string().optional(),
        })
        .optional(),
    })
    // more additional fields (computed fields)
    .transform((data, { meta }) => {
      return {
        ...data,
        slug: slugify(meta.path),
        category: meta.path
          .replace(/.*\/content\//, "")
          .replace(/\/[^/]*$/, "")
          .replace(cwd, ""),
      }
    }),
})

export default defineConfig({
  collections: {
    docs,
  },
})
