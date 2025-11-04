import { PropsWithChildren, useEffect, useRef, useState } from "react"
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
      className="current:font-semibold block w-full px-4 py-2"
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
  const pathnameRef = useRef(pathname)

  useEffect(() => {
    if (pathnameRef.current !== pathname) {
      setIsOpen(false)
    }
    pathnameRef.current = pathname
  }, [pathname, setIsOpen])

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
        {secondaryNavItems.map((item) => (
          <MobileNavLink
            key={item.title}
            href={item.url}
            isCurrent={item.current}
          >
            {item.title}
          </MobileNavLink>
        ))}
      </Drawer>
    </DialogTrigger>
  )
}
