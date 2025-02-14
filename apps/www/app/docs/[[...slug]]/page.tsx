import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { MdxContentRenderer } from "@/components/mdx/content-renderer"
import { docsConfig } from "@/config/docs.config"
import { cn } from "@opengovsg/oui-theme"
import { docs } from "#site/content"

import { PageHeader } from "./components/page-header"

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
    <div className="mx-auto grid w-full max-w-2xl grid-cols-1 gap-10 xl:max-w-5xl xl:grid-cols-[minmax(0,1fr)_var(--container-2xs)]">
      <div className="px-4 pt-10 pb-24 sm:px-6 xl:pr-0">
        <PageHeader {...doc} />
        <div className="pt-8 pb-12">
          <MdxContentRenderer code={doc.body} />
        </div>
      </div>
      <div className="max-xl:hidden">
        <div className="sticky top-14 max-h-[calc(100svh-3.5rem)] overflow-x-hidden px-6 pt-10 pb-24">
          <div className="flex flex-col gap-3">
            <h3 className="font-mono text-sm/6 font-medium tracking-widest text-gray-500 uppercase sm:text-xs/6 dark:text-gray-400">
              On this page
            </h3>
            {doc.toc.visible && (
              <ul className="flex flex-col gap-2 border-l border-[color-mix(in_oklab,_var(--color-gray-950),white_90%)] dark:border-[color-mix(in_oklab,_var(--color-gray-950),white_20%)]">
                {doc.toc.content.map((item) => (
                  <li
                    className="-ml-px flex flex-col items-start gap-2"
                    key={item.title}
                  >
                    <a className="inline-block border-l border-transparent pl-5 text-base/8 text-gray-600 hover:border-gray-950/25 hover:text-gray-950 aria-[current]:border-gray-950 aria-[current]:font-semibold aria-[current]:text-gray-950 sm:pl-4 sm:text-sm/6 dark:text-gray-300 dark:hover:border-white/25 dark:hover:text-white dark:aria-[current]:border-white dark:aria-[current]:text-white">
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
