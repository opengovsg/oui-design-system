import type { Metadata } from "next"
import { notFound, redirect } from "next/navigation"
import { getMDXComponents } from "@/components/mdx"
import { siteConfig } from "@/config/site"
import { resolveDocLinks } from "@/lib/doc-links"
import { getFirstChildUrl } from "@/lib/nav-redirect"
import { source } from "@/lib/source"
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
  EditOnGitHub,
} from "fumadocs-ui/layouts/docs/page"

import { DocLinks } from "./components/doc-links"

interface PageProps {
  params: Promise<{ slug?: string[] }>
}

export default async function Page(props: PageProps) {
  const { slug = [] } = await props.params
  const page = source.getPage(slug)

  if (!page) {
    // The `/docs` root and section folders have no page of their own — send
    // them to their first child.
    const firstChild = getFirstChildUrl(slug)
    if (firstChild) redirect(firstChild)
    notFound()
  }

  const MDX = page.data.body
  const links = resolveDocLinks(page.data.links)
  // siteConfig.editUrl points at apps/www/content; page.path is relative to
  // content/docs, so the `docs/` segment is added back here.
  const editUrl = `${siteConfig.editUrl}/docs/${page.path}`

  return (
    <DocsPage
      toc={page.data.toc}
      full={page.data.full}
      tableOfContent={{ enabled: page.data.tableOfContent !== false }}
    >
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocLinks links={links} />
      <DocsBody>
        <MDX components={getMDXComponents()} />
        <div className="mt-12 border-t pt-6">
          <EditOnGitHub href={editUrl} />
        </div>
      </DocsBody>
    </DocsPage>
  )
}

export async function generateStaticParams() {
  return source.generateParams()
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { slug = [] } = await props.params
  const page = source.getPage(slug)
  if (!page) return {}

  return {
    title: page.data.title,
    description: page.data.description,
  }
}
