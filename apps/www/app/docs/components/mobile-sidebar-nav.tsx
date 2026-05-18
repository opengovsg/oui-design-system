"use client"

import { Fragment, useState } from "react"
import { usePathname } from "next/navigation"
import { useRoute } from "@/lib/use-route"
import { Menu } from "lucide-react"
import { Breadcrumb, Breadcrumbs, DialogTrigger } from "react-aria-components"

import {
  Badge,
  Button,
  SidebarHeader,
  SidebarItem,
  SidebarRoot,
} from "@opengovsg/oui"
import { cn } from "@opengovsg/oui-theme"

import { Drawer } from "./drawer"

const NewBadge = () => {
  return (
    <Badge
      classNames={{
        base: "bg-linear-to-br from-indigo-500 to-pink-500 border-small border-white/50 shadow-pink-500/30",
        content: "drop-shadow shadow-black text-white",
      }}
      variant="solid"
      radius="full"
      size="xs"
    >
      New
    </Badge>
  )
}

const WipBadge = () => {
  return (
    <Badge
      variant="outline"
      radius="full"
      color="neutral"
      className="decoration-inherit"
      size="xs"
    >
      WIP
    </Badge>
  )
}

const RedirectBadge = () => {
  return (
    <Badge
      variant="outline"
      radius="full"
      color="neutral"
      className="bg-transparent decoration-inherit"
      size="xs"
    >
      ↗
    </Badge>
  )
}

const StatusBadge = ({ status }: { status?: string }) => {
  if (status === "new") return <NewBadge />
  if (status === "wip") return <WipBadge />
  if (status === "redirect") return <RedirectBadge />
  return null
}

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
  const [prevPathname, setPrevPathname] = useState(pathname)
  if (prevPathname !== pathname) {
    setPrevPathname(pathname)
    setIsOpen(false)
  }

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
          <SidebarRoot size="sm" className="gap-8">
            {navItems.map((group) => (
              <Fragment key={group.title ?? "ungrouped"}>
                {group.title && <SidebarHeader>{group.title}</SidebarHeader>}
                {group.items.map((item) => (
                  <SidebarItem
                    key={item.url ?? item.title}
                    href={item.url}
                    isSelected={item.current}
                    endContent={<StatusBadge status={item.status} />}
                    {...(item.external && {
                      target: "_blank",
                      rel: "noopener noreferrer",
                    })}
                  >
                    <span
                      className={cn(
                        item.status === "wip" && "line-through opacity-50",
                      )}
                    >
                      {item.title}
                    </span>
                  </SidebarItem>
                ))}
              </Fragment>
            ))}
          </SidebarRoot>
        </Drawer>
      </DialogTrigger>
    </div>
  )
}
