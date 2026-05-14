import { mkdir, readdir, rm, writeFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

import type { NavItem } from "../../config/docs.config"
import type { ComponentEntry, GuideEntry } from "./llms-txt"
import type { ParsedDoc } from "./types"
import { docsConfig } from "../../config/docs.config"
import { renderComponentMarkdown } from "./component-md"
import { writeCoverageReport } from "./coverage"
import { renderGettingStartedMarkdown } from "./getting-started-md"
import { renderLlmsFullTxt } from "./llms-full-txt"
import { renderLlmsTxt } from "./llms-txt"
import { loadDoc } from "./load-docs"
import { applyTransforms } from "./transform"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT = path.resolve(__dirname, "..", "..")
const CONTENT_DIR = path.join(ROOT, "content", "docs")
const EXAMPLES_DIR = path.join(ROOT, "registry", "examples")
const PUBLIC_DIR = path.join(ROOT, "public")
const SITE_URL = docsConfig.url.replace(/\/$/, "")

async function listMdxFiles(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true })
  return entries
    .filter((e) => e.isFile() && e.name.endsWith(".mdx"))
    .map((e) => path.join(dir, e.name))
    .sort()
}

async function listMdxFilesIfDirExists(dir: string): Promise<string[]> {
  try {
    return await listMdxFiles(dir)
  } catch {
    return []
  }
}

function collectWipSlugs(nav: NavItem[]): Set<string> {
  // Walk the docs nav tree and return slugs flagged status: "wip".
  // WIP components are not yet shipped — exclude them from the agent-facing
  // surface entirely (no per-doc .md, no llms.txt entry, no coverage entry).
  const out = new Set<string>()
  const walk = (items: NavItem[]): void => {
    for (const item of items) {
      if (item.status === "wip" && item.url) out.add(item.url)
      if (item.items) walk(item.items)
    }
  }
  walk(nav)
  return out
}

const WIP_SLUGS = collectWipSlugs(docsConfig.navigation)

async function main(): Promise<void> {
  const allComponentFiles = await listMdxFiles(
    path.join(CONTENT_DIR, "components"),
  )
  const componentFiles = allComponentFiles.filter((filePath) => {
    const slug = path.basename(filePath, ".mdx")
    return !WIP_SLUGS.has(slug)
  })
  const guideFiles = await listMdxFiles(
    path.join(CONTENT_DIR, "getting-started"),
  )
  const contributingFiles = await listMdxFilesIfDirExists(
    path.join(CONTENT_DIR, "contributing"),
  )
  const topicalGuideFiles = await listMdxFilesIfDirExists(
    path.join(CONTENT_DIR, "guides"),
  )

  // 1. Parse all docs and apply transforms.
  const components: ParsedDoc[] = []
  for (const filePath of componentFiles) {
    const doc = await loadDoc(filePath, "component")
    await applyTransforms(doc, { examplesDir: EXAMPLES_DIR })
    components.push(doc)
  }

  const guides: ParsedDoc[] = []
  for (const filePath of guideFiles) {
    const doc = await loadDoc(filePath, "getting-started")
    await applyTransforms(doc, { examplesDir: EXAMPLES_DIR })
    guides.push(doc)
  }

  const contributingDocs: ParsedDoc[] = []
  for (const filePath of contributingFiles) {
    const doc = await loadDoc(filePath, "getting-started")
    await applyTransforms(doc, { examplesDir: EXAMPLES_DIR })
    contributingDocs.push(doc)
  }

  const topicalGuides: ParsedDoc[] = []
  for (const filePath of topicalGuideFiles) {
    const doc = await loadDoc(filePath, "guide")
    await applyTransforms(doc, { examplesDir: EXAMPLES_DIR })
    topicalGuides.push(doc)
  }

  // 2. Render markdown for each doc.
  const componentMarkdowns = new Map<string, string>()
  for (const doc of components) {
    const md = renderComponentMarkdown(doc)
    componentMarkdowns.set(doc.slug, md)
  }

  const guideMarkdowns = new Map<string, string>()
  for (const doc of guides) {
    guideMarkdowns.set(doc.slug, renderGettingStartedMarkdown(doc))
  }

  const topicalGuideMarkdowns = new Map<string, string>()
  for (const doc of topicalGuides) {
    topicalGuideMarkdowns.set(doc.slug, renderGettingStartedMarkdown(doc))
  }

  // 3. Write per-doc files. Clean the output tree first so renamed or
  //    WIP-filtered slugs don't leave stale .md files behind.
  await rm(path.join(PUBLIC_DIR, "llm"), { recursive: true, force: true })
  await mkdir(path.join(PUBLIC_DIR, "llm", "components"), { recursive: true })
  await mkdir(path.join(PUBLIC_DIR, "llm", "getting-started"), {
    recursive: true,
  })

  for (const [slug, md] of componentMarkdowns) {
    await writeFile(
      path.join(PUBLIC_DIR, "llm", "components", `${slug}.md`),
      md,
      "utf8",
    )
  }
  for (const [slug, md] of guideMarkdowns) {
    await writeFile(
      path.join(PUBLIC_DIR, "llm", "getting-started", `${slug}.md`),
      md,
      "utf8",
    )
  }

  if (contributingDocs.length > 0) {
    await mkdir(path.join(PUBLIC_DIR, "llm", "contributing"), {
      recursive: true,
    })
    const contributingMarkdowns = new Map<string, string>()
    for (const doc of contributingDocs) {
      contributingMarkdowns.set(doc.slug, renderGettingStartedMarkdown(doc))
    }
    for (const [slug, md] of contributingMarkdowns) {
      await writeFile(
        path.join(PUBLIC_DIR, "llm", "contributing", `${slug}.md`),
        md,
        "utf8",
      )
    }
  }

  if (topicalGuides.length > 0) {
    await mkdir(path.join(PUBLIC_DIR, "llm", "guides"), { recursive: true })
    for (const [slug, md] of topicalGuideMarkdowns) {
      await writeFile(
        path.join(PUBLIC_DIR, "llm", "guides", `${slug}.md`),
        md,
        "utf8",
      )
    }
  }

  // 4. Build entries for llms.txt.
  const componentEntries: ComponentEntry[] = components.map((doc) => ({
    slug: doc.slug,
    title: doc.frontmatter.title,
    description: doc.frontmatter.description,
    category: doc.frontmatter.category ?? "Misc",
  }))
  const guideEntries: GuideEntry[] = guides.map((doc) => ({
    slug: doc.slug,
    title: doc.frontmatter.title,
    description: doc.frontmatter.description,
  }))
  const topicalGuideEntries: GuideEntry[] = topicalGuides.map((doc) => ({
    slug: doc.slug,
    title: doc.frontmatter.title,
    description: doc.frontmatter.description,
  }))

  const llmsTxt = renderLlmsTxt({
    siteUrl: SITE_URL,
    gettingStarted: guideEntries,
    guides: topicalGuideEntries,
    components: componentEntries,
  })
  await writeFile(path.join(PUBLIC_DIR, "llms.txt"), llmsTxt, "utf8")

  // 5. Concatenate llms-full.txt in the same order: guides first, then components by category in canonical order, alphabetical within.
  const orderedSections = [
    ...guides.map((doc) => guideMarkdowns.get(doc.slug)!),
    ...topicalGuides.map((doc) => topicalGuideMarkdowns.get(doc.slug)!),
    ...orderComponentsForFullTxt(components).map(
      (doc) => componentMarkdowns.get(doc.slug)!,
    ),
  ]
  await writeFile(
    path.join(PUBLIC_DIR, "llms-full.txt"),
    renderLlmsFullTxt(orderedSections),
    "utf8",
  )

  // 6. Invariants.
  assertInvariants({ components, guides, llmsTxt })

  await writeCoverageReport(
    components,
    componentMarkdowns,
    path.join(ROOT, ".velite", "llms-coverage.json"),
  )

  console.log(
    `Generated llms.txt + llms-full.txt + ${components.length} components + ${guides.length} guides`,
  )
}

function orderComponentsForFullTxt(docs: ParsedDoc[]): ParsedDoc[] {
  const CATEGORY_ORDER: ParsedDoc["frontmatter"]["category"][] = [
    "Form & Input",
    "Layout & Navigation",
    "Overlays",
    "Feedback",
    "Display",
    "Misc",
  ]
  const indexOf = (c?: string) =>
    CATEGORY_ORDER.indexOf(c as never) === -1
      ? CATEGORY_ORDER.length
      : CATEGORY_ORDER.indexOf(c as never)

  return [...docs].sort((a, b) => {
    const ai = indexOf(a.frontmatter.category)
    const bi = indexOf(b.frontmatter.category)
    if (ai !== bi) return ai - bi
    return a.frontmatter.title.localeCompare(b.frontmatter.title)
  })
}

function assertInvariants(args: {
  components: ParsedDoc[]
  guides: ParsedDoc[]
  llmsTxt: string
}): void {
  // Every component .md is listed in llms.txt.
  for (const doc of args.components) {
    const expected = `/llm/components/${doc.slug}.md`
    if (!args.llmsTxt.includes(expected)) {
      throw new Error(
        `Invariant failed: ${doc.slug} is not referenced in llms.txt`,
      )
    }
  }
  // No empty link URLs in llms.txt.
  const emptyLinks = args.llmsTxt.match(/\]\(\s*\)/g)
  if (emptyLinks) {
    throw new Error(
      `Invariant failed: llms.txt contains empty link URLs (${emptyLinks.length} occurrences)`,
    )
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
