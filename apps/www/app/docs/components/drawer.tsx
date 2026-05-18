import type { PropsWithChildren } from "react"
import { X } from "lucide-react"
import { Dialog, Modal, ModalOverlay } from "react-aria-components"

import { Button } from "@opengovsg/oui"
import { cn } from "@opengovsg/oui-theme"

export const Drawer = ({ children }: PropsWithChildren) => {
  return (
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
            "fixed right-0 bottom-0 max-h-[calc(var(--visual-viewport-height)-4rem)] w-full overflow-y-auto rounded-t-sm bg-white",
            isEntering && "animate-modal-slide-enter",
            isExiting && "animate-modal-slide-exit",
          )
        }
      >
        <Dialog className="h-full">
          <div className="pointer-events-none sticky top-0 right-0 left-0 flex h-0 justify-end pt-2 pr-2">
            <Button
              isIconOnly
              size="xs"
              color="neutral"
              variant="clear"
              className="pointer-events-auto"
              slot="close"
            >
              <X />
            </Button>
          </div>
          <div className="flex flex-col items-start justify-stretch gap-2 pt-8 pb-8">
            {children}
          </div>
        </Dialog>
      </Modal>
    </ModalOverlay>
  )
}
