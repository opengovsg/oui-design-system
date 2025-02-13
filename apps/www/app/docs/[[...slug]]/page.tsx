import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { MdxContentRenderer } from "@/components/mdx/content-renderer"
import { docsConfig } from "@/config/docs.config"
import { cn } from "@opengovsg/oui-theme"
import { docs } from "#site/content"

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
    <main className="relative p-2 md:p-4 lg:gap-10 lg:px-8 lg:py-6 xl:grid xl:grid-cols-[1fr_200px]">
      <div className="mx-auto w-full min-w-0">
        {/* <Breadcrumb className="mb-4">
          <BreadcrumbList>
            {doc.slug.split("/").map((slug, index) => (
              <div className="flex items-center gap-2" key={index}>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href={`/${doc.slug
                      .split("/")
                      .slice(0, index + 1)
                      .join("/")}`}
                    className={cn(
                      index === doc.slug.split("/").length - 1
                        ? "text-foreground"
                        : "text-muted-foreground",
                    )}
                  >
                    {slug.charAt(0).toUpperCase() + slug.slice(1)}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {index < doc.slug.split("/").length - 1 && (
                  <BreadcrumbSeparator />
                )}
              </div>
            ))}
          </BreadcrumbList>
        </Breadcrumb> */}

        <div className="space-y-2">
          <h1 className={cn("scroll-m-20 text-3xl font-bold tracking-tight")}>
            {doc.title}
          </h1>
          {doc && (
            <p className="text-muted-foreground text-base">{doc.description}</p>
          )}
        </div>
        <div className="pt-8 pb-12">
          <MdxContentRenderer code={doc.body} />
        </div>
      </div>
      <div className="hidden text-sm xl:block">
        <div className="sticky top-16 -mt-10 h-[calc(100vh-3.5rem)] pt-4">
          {doc.toc.visible && (
            <>{JSON.stringify(doc.toc.content)}</>
            // <DashboardTableOfContents toc={doc.toc.content} />
          )}
        </div>
      </div>
    </main>
  )
}
