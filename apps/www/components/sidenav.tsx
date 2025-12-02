import type { NavItem } from "@/config/docs.config"
import type { LinkProps } from "next/link"
import type { JSX } from "react"
import Link from "next/link"

import { Badge } from "@opengovsg/oui"
import { cn } from "@opengovsg/oui-theme"

interface SidenavItem extends Omit<NavItem, "items" | "url"> {
  url: LinkProps["href"] | undefined
}

interface SidenavProps {
  currentUrl?: string
  title?: React.ReactNode
  items: SidenavItem[]
}

const NewBadge = () => {
  return (
    <Badge
      classNames={{
        base: "bg-gradient-to-br from-indigo-500 to-pink-500 border-small border-white/50 shadow-pink-500/30",
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

const SidenavItem = ({
  children,
}: {
  children: ({ className }: { className: string }) => JSX.Element
}) => {
  return children({
    className:
      "flex py-1.5 px-3 rounded-sm hover:bg-interaction-muted-main-hover active:bg-interaction-muted-main-active current:bg-interaction-muted-main-active gap-2 items-center current:shadow-xs",
  })
}

export const Sidenav = ({ title, items, currentUrl }: SidenavProps) => {
  return (
    <div className="flex w-full flex-col gap-1">
      {title && <div className="flex flex-col px-5 font-semibold">{title}</div>}
      <div className="flex flex-col gap-px px-2">
        {items.map((item, index) => (
          <SidenavItem key={index}>
            {({ className }) => {
              console.log({ currentUrl, itemUrl: item.url })
              return item.external ? (
                <a
                  className={className}
                  href={item.url as string}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-current={item.url === currentUrl ? "page" : undefined}
                >
                  {item.title}
                </a>
              ) : (
                <Link
                  className={className}
                  href={item.url!}
                  data-current={item.url === currentUrl ? "page" : undefined}
                >
                  <span
                    className={cn(
                      item.status === "wip" && "line-through opacity-50",
                    )}
                  >
                    {item.title}
                  </span>
                  {item.status === "new" && <NewBadge />}
                  {item.status === "wip" && <WipBadge />}
                  {item.status === "redirect" && <RedirectBadge />}
                </Link>
              )
            }}
          </SidenavItem>
        ))}
      </div>
    </div>
  )
}
