import { getLLMText, isLlmExposed } from "@/lib/llms/get-llm-text"
import { source } from "@/lib/source"

// All docs concatenated into a single Markdown file for bulk ingestion.
export const revalidate = false

export async function GET() {
  const pages = source.getPages().filter(isLlmExposed)
  const scanned = await Promise.all(pages.map(getLLMText))

  return new Response(scanned.join("\n\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  })
}
