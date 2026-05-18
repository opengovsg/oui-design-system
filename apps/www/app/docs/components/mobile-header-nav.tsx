import { PropsWithChildren, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useRoute } from "@/lib/use-route"
import { Menu } from "lucide-react"
import { DialogTrigger } from "react-aria-components"

import { Button } from "@opengovsg/oui"
import { dataAttr } from "@opengovsg/oui-theme"

import { Drawer } from "./drawer"

const MobileNavLink = ({
  isCurrent,
  href,
  children,
}: PropsWithChildren<{
  href?: string
  isCurrent: boolean
}>) => {
  if (!href) {
    return <p>{children}</p>
  }
  return (
    <Link
      href={href}
      data-current={dataAttr(isCurrent)}
      className="current:font-semibold current:bg-interaction-muted-main-active current:shadow-xs block w-full px-3 py-1.5"
    >
      {children}
    </Link>
  )
}

export const MobileHeaderNav = () => {
  const route = useRoute()
  const secondaryNavItems = route.getSecondaryNavItems()

  const [isOpen, setIsOpen] = useState(false)

  const pathname = usePathname()
  const [prevPathname, setPrevPathname] = useState(pathname)
  if (prevPathname !== pathname) {
    setPrevPathname(pathname)
    setIsOpen(false)
  }

  return (
    <DialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
      <Button
        isIconOnly
        variant="clear"
        size="xs"
        color="neutral"
        aria-label="Open or close navbar"
        className="md:hidden"
      >
        <Menu />
      </Button>
      <Drawer>
        <div className="w-full px-2">
          {secondaryNavItems.map((item) => (
            <MobileNavLink
              key={item.title}
              href={item.url}
              isCurrent={item.current}
            >
              {item.title}
            </MobileNavLink>
          ))}
        </div>
      </Drawer>
    </DialogTrigger>
  )
}
