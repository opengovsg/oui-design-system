import type { Root } from "mdast"

export type Category =
  | "Form & Input"
  | "Layout & Navigation"
  | "Overlays"
  | "Feedback"
  | "Display"
  | "Misc"

export interface DocFrontmatter {
  title: string
  description: string
  category?: Category
  links?: {
    source?: string
    theme?: string
    storybook?: string
    reactaria?: string
  }
}

export interface ParsedDoc {
  slug: string
  kind: "component" | "getting-started"
  frontmatter: DocFrontmatter
  body: Root
}
