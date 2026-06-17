import type { ReactNode } from "react"
import { baseOptions } from "@/lib/layout.shared"
import { source } from "@/lib/source"
import { DocsLayout } from "fumadocs-ui/layouts/docs"

import { ThemeSelector } from "./components/theme-selector"

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      {...baseOptions()}
      tree={source.pageTree}
      sidebar={{
        // OUI design-system theme switcher (Base / generated themes), pinned to
        // the top of the sidebar.
        // `key` because fumadocs renders the banner inside an array of sidebar
        // header children.
        banner: (
          <div
            key="oui-theme-banner"
            className="flex items-center justify-between gap-2 px-1 py-1.5 text-sm"
          >
            <span className="text-fd-muted-foreground">Theme</span>
            <ThemeSelector />
          </div>
        ),
      }}
    >
      {children}
    </DocsLayout>
  )
}
