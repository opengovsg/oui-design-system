"use client"

import { useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"
import { Sidenav } from "@/components/sidenav"
import { useRoute } from "@/lib/use-route"
import { Menu } from "lucide-react"
import { Breadcrumb, Breadcrumbs, DialogTrigger } from "react-aria-components"

import { Button } from "@opengovsg/oui"
import { cn } from "@opengovsg/oui-theme"

import { Drawer } from "./drawer"

export const MobileBreadcrumbs = () => {
  const route = useRoute()

  const crumbs = route
    .getSidebarNavItems()
    .map((group) => {
      const item = group.items.find((item) => item.url === route.currentUrl)
      return item ? [group.title, item.title] : null
    })
    .filter(Boolean)[0]

  return (
    // TODO: Create and use OUI breadcrumbs
    <Breadcrumbs className="flex items-center">
      {crumbs?.map((crumb, index) => (
        <Breadcrumb
          className={({ isCurrent }) =>
            cn(
              isCurrent ? "font-semibold" : "after:px-1 after:content-['›'/'']",
            )
          }
          key={index}
        >
          {crumb}
        </Breadcrumb>
      ))}
    </Breadcrumbs>
  )
}

export const MobileSidebarNav = () => {
  const [isOpen, setIsOpen] = useState(false)
  const route = useRoute()
  const navItems = route.getSidebarNavItems()

  const pathname = usePathname()
  const pathnameRef = useRef(pathname)

  useEffect(() => {
    if (pathnameRef.current !== pathname) {
      setIsOpen(false)
    }
    pathnameRef.current = pathname
  }, [pathname, setIsOpen])

  return (
    <div className="py-2 md:hidden">
      <DialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
        <Button
          variant="clear"
          size="sm"
          color="neutral"
          aria-label="Open or close navbar"
          className="h-auto w-full flex-wrap justify-start"
        >
          <Menu className="size-4 shrink-0" />
          <MobileBreadcrumbs />
        </Button>

        <Drawer>
          {navItems.map((group) => (
            <Sidenav
              key={group.title}
              currentUrl={route.currentUrl}
              title={group.title}
              items={group.items}
            />
          ))}
        </Drawer>
      </DialogTrigger>
    </div>
  )
}
