import { JSX } from "react"
import Link, { LinkProps } from "next/link"
import { tv } from "@opengovsg/oui-theme"

interface SidenavItem {
  title: React.ReactNode
  url: LinkProps["href"] | undefined
  external?: boolean
  status?: string
}

interface SidenavProps {
  currentUrl?: string
  title?: React.ReactNode
  items: SidenavItem[]
}

const SidenavItem = ({
  children,
}: {
  children: ({ className }: { className: string }) => JSX.Element
}) => {
  return children({
    className: "flex py-1.5 ps-4 pe-3 rounded-sm current:font-medium",
  })
}

export const Sidenav = ({ title, items, currentUrl }: SidenavProps) => {
  return (
    <div className="flex flex-col gap-2">
      {title && <div className="flex flex-col ps-4 font-semibold">{title}</div>}
      <div className="flex gap-px">
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
                  {item.title}
                </Link>
              )
            }}
          </SidenavItem>
        ))}
      </div>
    </div>
  )
}
