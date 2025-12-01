"use client"

import type { DialogProps } from "react-aria-components"
import { isValidElement, useContext } from "react"
import { XIcon } from "lucide-react"
import { useMessageFormatter } from "react-aria"
import { Dialog } from "react-aria-components"

import { cn } from "@opengovsg/oui-theme"

import type { ButtonProps } from "../button"
import { Button } from "../button"
import { i18nStrings } from "./i18n"
import { ModalVariantContext } from "./modal-variant-context"

export interface ModalContentProps extends Omit<DialogProps, "children"> {
  children: React.ReactNode | ((onClose: () => void) => React.ReactNode)
  closeButtonContent?: React.ReactNode
  hideCloseButton?: boolean
  closeButtonProps?: Omit<ButtonProps, "className" | "slot">
}

export function ModalContent({
  closeButtonContent: closeButtonContentProp,
  hideCloseButton,
  closeButtonProps,
  ...props
}: ModalContentProps) {
  const { slots, classNames, buttonSize } = useContext(ModalVariantContext)!

  const formatMessage = useMessageFormatter(i18nStrings)

  const closeButtonContent = isValidElement(closeButtonContentProp) ? (
    closeButtonContentProp
  ) : (
    <XIcon />
  )

  return (
    <Dialog
      {...props}
      className={slots.dialog({
        className: props.className ?? classNames?.dialog,
      })}
    >
      {({ close }) => (
        <>
          {!hideCloseButton && (
            <Button
              slot="close"
              isIconOnly
              aria-label={formatMessage("dismiss")}
              size={buttonSize}
              variant="clear"
              color="neutral"
              {...closeButtonProps}
              className={slots.closeButton({
                className: cn(classNames?.closeButton, props.className),
              })}
            >
              {closeButtonContent}
            </Button>
          )}
          {typeof props.children === "function"
            ? props.children(close)
            : props.children}
        </>
      )}
    </Dialog>
  )
}
