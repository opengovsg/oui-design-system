import { PropsWithChildren } from "react"
import Link, { LinkProps } from "next/link"
import { usePathname } from "next/navigation"
import { Sidenav } from "@/components/sidenav"
import { useRoute } from "@/lib/use-route"
import { Menu, X } from "lucide-react"
import {
  Dialog,
  DialogTrigger,
  Modal,
  ModalOverlay,
} from "react-aria-components"

import { Button } from "@opengovsg/oui"
import { cn, dataAttr } from "@opengovsg/oui-theme"

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

  return (
    <DialogTrigger>
      <Button
        isIconOnly
        variant="clear"
        size="xs"
        color="neutral"
        aria-label="Open or close navbar"
        className="lg:hidden"
      >
        <Menu />
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
          className={({ isEntering, isExiting, state }) =>
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
              className="absolute top-2 right-2"
              slot="close"
            >
              <X />
            </Button>
            <div className="flex flex-col items-start justify-stretch">
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
          </Dialog>
        </Modal>
      </ModalOverlay>
    </DialogTrigger>
  )
}
