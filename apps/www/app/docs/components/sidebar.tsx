"use client"

import { useMemo } from "react"
import { Sidenav } from "@/components/sidenav"
import { useRoute } from "@/lib/use-route"

export const DocsSidebar = () => {
  const route = useRoute()

  const sidebarNavItems = useMemo(() => route.getSidebarNavItems(), [route])

  return (
    <div className="absolute inset-0">
      <aside className="sticky top-[var(--header-height)] bottom-0 left-0 h-full max-h-[var(--content-height)] overflow-y-auto p-6 md:w-3xs lg:w-2xs">
        <nav className="flex flex-col gap-8">
          <ul className="flex flex-col gap-2">
            {sidebarNavItems?.map((group) => (
              <Sidenav
                key={group.title}
                currentUrl={route.currentUrl}
                title={group.title}
                items={group.items}
              />
            ))}
          </ul>
        </nav>
      </aside>
    </div>
  )
}
