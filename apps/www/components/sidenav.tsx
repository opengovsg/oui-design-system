import type { LinkProps } from "next/link"
import type { JSX } from "react"
import Link from "next/link"
import { NavItem } from "@/config/docs.config"

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

const SidenavItem = ({
  children,
}: {
  children: ({ className }: { className: string }) => JSX.Element
}) => {
  return children({
    className:
      "flex py-1.5 ps-4 pe-3 rounded-sm current:font-medium gap-2 items-center",
  })
}

export const Sidenav = ({ title, items, currentUrl }: SidenavProps) => {
  return (
    <div className="flex flex-col gap-2">
      {title && <div className="flex flex-col ps-4 font-semibold">{title}</div>}
      <div className="flex flex-col gap-px">
        {items.map((item, index) => (
          <SidenavItem key={index}>
            {({ className }) => {
              return item.external ? (
                <a
                  className={className}
                  href={item.url as string}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-current={item.url === currentUrl ? "page" : undefined}
                >
                  {item.title}
                </a>
              ) : (
                <Link
                  className={className}
                  href={item.url!}
                  aria-current={item.url === currentUrl ? "page" : undefined}
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
                </Link>
              )
            }}
          </SidenavItem>
        ))}
      </div>
    </div>
  )
}
