"use client"

import { useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"
import { Sidenav } from "@/components/sidenav"
import { useRoute } from "@/lib/use-route"
import { Menu, X } from "lucide-react"
import {
  Breadcrumb,
  Breadcrumbs,
  Dialog,
  DialogTrigger,
  Modal,
  ModalOverlay,
} from "react-aria-components"

import { Button } from "@opengovsg/oui"
import { cn } from "@opengovsg/oui-theme"

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
        <ModalOverlay
          isDismissable
          className={({ isEntering, isExiting }) =>
            cn(
              "bg-grey-900/30 fixed top-0 left-0 z-100 h-(--visual-viewport-height) w-screen backdrop-blur-sm",
              isEntering && "animate-modal-blur-enter",
              isExiting && "animate-modal-blur-exit",
            )
          }
        >
          <Modal
            className={({ isEntering, isExiting }) =>
              cn(
                "fixed right-0 bottom-0 max-h-(--visual-viewport-height) w-full overflow-y-auto bg-white",
                isEntering && "animate-modal-slide-enter",
                isExiting && "animate-modal-slide-exit",
              )
            }
          >
            <Dialog className="h-full py-8">
              <Button
                isIconOnly
                size="xs"
                color="neutral"
                variant="clear"
                className="fixed top-2 right-2"
                slot="close"
              >
                <X />
              </Button>
              <div className="flex flex-col items-start justify-stretch">
                {navItems.map((group) => (
                  <Sidenav
                    key={group.title}
                    currentUrl={route.currentUrl}
                    title={group.title}
                    items={group.items}
                  />
                ))}
              </div>
            </Dialog>
          </Modal>
        </ModalOverlay>
      </DialogTrigger>
    </div>
  )
}
