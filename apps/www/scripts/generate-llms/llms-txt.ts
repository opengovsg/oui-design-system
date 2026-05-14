import type { Category } from "./types"

export interface ComponentEntry {
  slug: string
  title: string
  description: string
  category: Category
}

export interface GuideEntry {
  slug: string
  title: string
  description: string
}

export interface RenderLlmsTxtInput {
  siteUrl: string
  gettingStarted: GuideEntry[]
  guides: GuideEntry[]
  components: ComponentEntry[]
}

const CATEGORY_ORDER: Category[] = [
  "Form & Input",
  "Layout & Navigation",
  "Overlays",
  "Feedback",
  "Display",
  "Misc",
]

const INTRO = `# @opengovsg/oui

> Open Government Products Singapore design system. React components built on react-aria-components, distributed as the @opengovsg/oui npm package and themed via @opengovsg/oui-theme.

Install: \`pnpm add @opengovsg/oui @opengovsg/oui-theme tailwindcss react-aria-components motion\`

Import: \`import { Button } from "@opengovsg/oui"\`
`

export function renderLlmsTxt(input: RenderLlmsTxtInput): string {
  const sections: string[] = [INTRO]

  // Getting started
  sections.push(
    renderSection("Getting started", input.gettingStarted, (g) =>
      guideBullet(g, input.siteUrl),
    ),
  )

  // Guides
  sections.push(
    renderSection(
      "Guides",
      input.guides,
      (g) =>
        `- [${g.title}](${input.siteUrl}/llm/guides/${g.slug}.md): ${g.description}`,
    ),
  )

  // One section per category that has at least one component, in CATEGORY_ORDER.
  const byCategory = new Map<Category, ComponentEntry[]>()
  for (const c of input.components) {
    const list = byCategory.get(c.category) ?? []
    list.push(c)
    byCategory.set(c.category, list)
  }

  for (const cat of CATEGORY_ORDER) {
    const list = byCategory.get(cat)
    if (!list || list.length === 0) continue
    list.sort((a, b) => a.title.localeCompare(b.title))
    sections.push(
      renderSection(cat, list, (c) => componentBullet(c, input.siteUrl)),
    )
  }

  // Optional / full corpus pointer
  sections.push(
    `## Optional\n\n- [llms-full.txt](${input.siteUrl}/llms-full.txt): All docs concatenated into a single file for bulk ingestion.`,
  )

  return sections.join("\n\n") + "\n"
}

function renderSection<T>(
  heading: string,
  items: T[],
  toBullet: (item: T) => string,
): string {
  const body =
    items.length === 0 ? "(none yet)" : items.map(toBullet).join("\n")
  return `## ${heading}\n\n${body}`
}

function guideBullet(g: GuideEntry, siteUrl: string): string {
  return `- [${g.title}](${siteUrl}/llm/getting-started/${g.slug}.md): ${g.description}`
}

function componentBullet(c: ComponentEntry, siteUrl: string): string {
  return `- [${c.title}](${siteUrl}/llm/components/${c.slug}.md): ${c.description}`
}
