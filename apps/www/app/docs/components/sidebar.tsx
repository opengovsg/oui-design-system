"use client"

import { Fragment, useMemo } from "react"
import { useRoute } from "@/lib/use-route"

import { Badge, SidebarHeader, SidebarItem, SidebarRoot } from "@opengovsg/oui"
import { cn } from "@opengovsg/oui-theme"

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

const UpdatedBadge = () => {
  return (
    <Badge
      classNames={{
        base: "bg-linear-to-br from-brand-primary-200 to-brand-primary-400 border-small border-white/50 shadow-blue-500/30",
        content: "drop-shadow shadow-black text-white",
      }}
      variant="solid"
      radius="full"
      size="xs"
    >
      Updated
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
  switch (status) {
    case "new":
      return <NewBadge />
    case "updated":
      return <UpdatedBadge />
    case "wip":
      return <WipBadge />
    case "redirect":
      return <RedirectBadge />
    default:
      return null
  }
}

export const DocsSidebar = () => {
  const route = useRoute()

  const sidebarNavItems = useMemo(() => route.getSidebarNavItems(), [route])

  return (
    <div className="absolute inset-0">
      <aside className="sticky top-(--header-height) bottom-0 left-0 h-full max-h-(--content-height) w-full overflow-y-auto px-3 py-6">
        <SidebarRoot className="gap-8">
          {sidebarNavItems?.map((group) => (
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
      </aside>
    </div>
  )
}
