import { notFound } from "next/navigation"
import { getLLMText, isLlmExposed } from "@/lib/llms/get-llm-text"
import { source } from "@/lib/source"

// Per-page Markdown for LLMs, served at `/llms.mdx/<slug>`.
export const revalidate = false

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug?: string[] }> },
) {
  const { slug } = await params
  const page = source.getPage(slug)
  if (!page || !isLlmExposed(page)) notFound()

  return new Response(await getLLMText(page), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  })
}

export function generateStaticParams() {
  return source
    .getPages()
    .filter(isLlmExposed)
    .map((page) => ({ slug: page.slugs }))
}
