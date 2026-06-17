import {
  defineConfig,
  defineDocs,
  frontmatterSchema,
  metaSchema,
} from "fumadocs-mdx/config"
import { z } from "zod"

/**
 * Content source for the docs site.
 *
 * Frontmatter fields: `category`, `status` (sidebar badge), `published`, and
 * `links` (source / theme / storybook / reactaria). Full link URLs are derived
 * from `config/site.ts` at render time (see `lib/doc-links.ts`) rather than in
 * the schema.
 *
 * Code highlighting, heading anchors, `package-install` code blocks and search
 * structure are all provided by the default Fumadocs MDX preset
 * (`rehypeCode`, `remarkHeading`, `remarkNpm`, `remarkStructure`), so no extra
 * remark/rehype plugins are configured here.
 */
export const docs = defineDocs({
  dir: "content/docs",
  docs: {
    schema: frontmatterSchema.extend({
      category: z
        .enum([
          "Form & Input",
          "Layout & Navigation",
          "Overlays",
          "Feedback",
          "Display",
          "Misc",
        ])
        .default("Misc"),
      // Sidebar status badge.
      status: z.enum(["new", "updated", "wip", "redirect"]).optional(),
      published: z.boolean().default(true),
      links: z
        .object({
          source: z.string().optional(),
          theme: z.string().optional(),
          storybook: z.string().optional(),
          reactaria: z.string().optional(),
        })
        .optional(),
      // Whether to render the table of contents. Named `tableOfContent` to
      // avoid colliding with Fumadocs' computed `page.data.toc` heading list.
      tableOfContent: z.boolean().default(true),
    }),
  },
  meta: {
    schema: metaSchema,
  },
})

export default defineConfig()
