import { createFromSource } from "fumadocs-core/search/server"

import { source } from "@/lib/source"

// Built-in Orama search index, powered by the docs content source.
export const { GET } = createFromSource(source)
