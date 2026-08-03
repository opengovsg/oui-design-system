import { createMDX } from "fumadocs-mdx/next"
import type { NextConfig } from "next"

const config: NextConfig = {
  // Serve each doc's LLM markdown at the conventional `/docs/<path>.md` URL
  // (handled by app/llms.mdx/[[...slug]]/route.ts).
  async rewrites() {
    return [{ source: "/docs/:path*.md", destination: "/llms.mdx/:path*" }]
  },
}

const withMDX = createMDX()

export default withMDX(config)
