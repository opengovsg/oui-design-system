import type { Metadata } from "next"
import { notFound, redirect } from "next/navigation"
import { MdxContentRenderer } from "@/components/mdx/content-renderer"
import { docsConfig, type NavItem } from "@/config/docs.config"
import { flattenToc } from "@/lib/flatten-toc"
import { docs } from "#site/content"

import { EditPageButton } from "../components/edit-page-button"
import { PageHeader } from "./components/page-header"
import { Toc } from "./components/toc"

/**
 * Walk the navigation config to find the first child URL for a given slug path.
 * For example, [] → "getting-started", ["getting-started"] → "getting-started/installation".
 */
function getFirstChildSlug(slugSegments: string[]): string | null {
  const rootNav = docsConfig.navigation[0]
  if (!rootNav?.items) return null

  let items: NavItem[] = rootNav.items
  for (const segment of slugSegments) {
    const match = items.find((item) => item.url === segment)
    if (!match?.items) return null
    items = match.items
  }

  function findFirstUrl(navItems: NavItem[]): string | null {
    for (const item of navItems) {
      if (item.url) return item.url
      if (item.items) {
        const url = findFirstUrl(item.items)
        if (url) return url
      }
    }
    return null
  }

  const firstChildUrl = findFirstUrl(items)
  if (!firstChildUrl) return null

  return [...slugSegments, firstChildUrl].join("/")
}

interface DynamicPageProps {
  params: Promise<{ slug: string[] }>
}

async function getDocFromParams({ params }: DynamicPageProps) {
  const parameters = await params
  const slug = parameters.slug?.join("/") || ""
  const doc = docs.find((doc) => doc.slugAsParams === slug)

  if (!doc) {
    return null
  }

  return doc
}

export async function generateMetadata({
  params,
}: DynamicPageProps): Promise<Metadata> {
  const doc = await getDocFromParams({ params })

  if (!doc) {
    return {}
  }

  return {
    title: doc.title,
    description: doc.description,
  }
}

export async function generateStaticParams(): Promise<{ slug: string[] }[]> {
  return docs.map((doc) => ({
    slug: doc.slugAsParams.split("/"),
  }))
}

export default async function DocPage({ params }: DynamicPageProps) {
  const doc = await getDocFromParams({ params })

  if (!doc) {
    const parameters = await params
    const slugSegments = parameters.slug ?? []
    const firstChildSlug = getFirstChildSlug(slugSegments)

    if (firstChildSlug) {
      redirect(`/docs/${firstChildSlug}`)
    }

    notFound()
  }

  return (
    <div className="mx-auto grid w-full grid-cols-1 gap-10 lg:max-w-2xl xl:max-w-6xl xl:grid-cols-[minmax(0,1fr)_var(--container-2xs)]">
      <div className="px-4 pt-4 pb-4 sm:px-6 md:pt-10 md:pb-24 xl:pr-0">
        <PageHeader {...doc} />
        <div className="pt-8 pb-12">
          <MdxContentRenderer code={doc.body} />
        </div>
      </div>
      <div className="max-xl:hidden">
        <div className="sticky top-14 max-h-[calc(100svh-3.5rem)] overflow-x-hidden px-6 pt-10 pb-24">
          {doc.toc.visible && <Toc items={flattenToc(doc.toc.content)} />}
          <EditPageButton href={`${docsConfig.editUrl}/${doc.slug}.mdx`} />
        </div>
      </div>
    </div>
  )
}
