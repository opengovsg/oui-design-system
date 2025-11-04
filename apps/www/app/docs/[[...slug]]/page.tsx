import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { MdxContentRenderer } from "@/components/mdx/content-renderer"
import { docsConfig } from "@/config/docs.config"
import { flattenToc } from "@/lib/flatten-toc"
import { docs } from "#site/content"

import { EditPageButton } from "../components/edit-page-button"
import { PageHeader } from "./components/page-header"
import { Toc } from "./components/toc"

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
    notFound()
  }

  return (
    <div className="mx-auto grid w-full grid-cols-1 gap-10 lg:max-w-2xl xl:max-w-6xl xl:grid-cols-[minmax(0,1fr)_var(--container-2xs)]">
      <div className="px-4 pt-10 pb-24 sm:px-6 xl:pr-0">
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
