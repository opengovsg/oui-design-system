import { source } from "@/lib/source"
import { createFromSource } from "fumadocs-core/search/server"

// Built-in Orama search index, powered by the docs content source.
export const { GET } = createFromSource(source)
