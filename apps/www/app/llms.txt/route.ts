import { siteConfig } from "@/config/site"
import { isLlmExposed } from "@/lib/llms/get-llm-text"
import { source } from "@/lib/source"

export const revalidate = false

const SITE = siteConfig.url.replace(/\/$/, "")

const CATEGORY_ORDER = [
  "Form & Input",
  "Layout & Navigation",
  "Overlays",
  "Feedback",
  "Display",
  "Misc",
] as const

const INTRO = `# @opengovsg/oui

> Open Government Products Singapore design system. React components built on react-aria-components, distributed as the @opengovsg/oui npm package and themed via @opengovsg/oui-theme.

Install: \`pnpm add @opengovsg/oui @opengovsg/oui-theme tailwindcss react-aria-components motion\`

Import: \`import { Button } from "@opengovsg/oui"\``

export async function GET() {
  const pages = source.getPages().filter(isLlmExposed)

  const mdUrl = (slugs: string[]) => `${SITE}/llms.mdx/${slugs.join("/")}`
  const bullet = (p: (typeof pages)[number]) =>
    `- [${p.data.title}](${mdUrl(p.slugs)})${
      p.data.description ? `: ${p.data.description}` : ""
    }`

  const sections: string[] = [INTRO]

  const inKind = (kind: string) =>
    pages
      .filter((p) => p.slugs[0] === kind)
      .sort((a, b) => a.data.title.localeCompare(b.data.title))

  const gettingStarted = inKind("getting-started")
  if (gettingStarted.length) {
    sections.push(
      `## Getting started\n\n${gettingStarted.map(bullet).join("\n")}`,
    )
  }

  const guides = inKind("guides")
  if (guides.length) {
    sections.push(`## Guides\n\n${guides.map(bullet).join("\n")}`)
  }

  const components = pages.filter((p) => p.slugs[0] === "components")
  for (const category of CATEGORY_ORDER) {
    const list = components
      .filter((p) => (p.data.category ?? "Misc") === category)
      .sort((a, b) => a.data.title.localeCompare(b.data.title))
    if (list.length) {
      sections.push(`## ${category}\n\n${list.map(bullet).join("\n")}`)
    }
  }

  sections.push(
    `## Optional\n\n- [llms-full.txt](${SITE}/llms-full.txt): All docs concatenated into a single file for bulk ingestion.`,
  )

  return new Response(sections.join("\n\n") + "\n", {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  })
}
