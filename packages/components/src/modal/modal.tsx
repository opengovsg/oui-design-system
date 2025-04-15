"use client"

import type { LocalizedStrings } from "react-aria"
import type {
  DialogProps,
  HeadingProps,
  ModalOverlayProps,
} from "react-aria-components"
import { forwardRef, isValidElement, useContext } from "react"
import { XIcon } from "lucide-react"
import { useMessageFormatter } from "react-aria"
import {
  Modal as AriaModal,
  Dialog,
  Heading,
  ModalOverlay,
  Provider,
} from "react-aria-components"

import type { VariantProps } from "@opengovsg/oui-theme"
import { cn, composeRenderProps, modalStyles } from "@opengovsg/oui-theme"

import type { ButtonProps } from "../button"
import type { HtmlUiProps } from "../system/types"
import { Button } from "../button"
import { mapPropsVariants } from "../system/utils"
import { ModalVariantContext } from "./modal-variant-context"

const i18nStrings: LocalizedStrings = {
  "en-SG": {
    dismiss: "Dismiss",
  },
  "zh-SG": {
    dismiss: "取消",
  },
  "ms-SG": {
    dismiss: "Tutup",
  },
  "ta-SG": {
    dismiss: "மூடு",
  },
}

interface ModalProps
  extends ModalOverlayProps,
    VariantProps<typeof modalStyles> {}

export function Modal(originalProps: ModalProps) {
  const [props, variantProps] = mapPropsVariants(
    originalProps,
    modalStyles.variantKeys,
  )

  const { isDismissable = true } = props
  const slots = modalStyles(variantProps)

  return (
    <Provider values={[[ModalVariantContext, { ...variantProps, slots }]]}>
      <ModalOverlay
        {...props}
        isDismissable={isDismissable}
        className={slots.overlay}
      >
        <AriaModal
          {...props}
          isDismissable={isDismissable}
          className={composeRenderProps(
            props.className,
            (className, renderProps) =>
              slots.base({ className, ...renderProps }),
          )}
        />
      </ModalOverlay>
    </Provider>
  )
}

interface ModalContentProps extends Omit<DialogProps, "children"> {
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
  const { slots, classNames } = useContext(ModalVariantContext)!

  const formatMessage = useMessageFormatter(i18nStrings)

  const closeButtonContent = isValidElement(closeButtonContentProp) ? (
    closeButtonContentProp
  ) : (
    <XIcon />
  )

  return (
    <Dialog {...props}>
      {({ close }) => (
        <>
          {!hideCloseButton && (
            <Button
              slot="close"
              isIconOnly
              aria-label={formatMessage("dismiss")}
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

export type ModalHeaderProps = HeadingProps

export function ModalHeader(props: ModalHeaderProps) {
  const { slots, classNames } = useContext(ModalVariantContext)!

  return (
    <Heading
      slot="title"
      {...props}
      className={slots.header({
        className: cn(classNames?.header, props.className),
      })}
    />
  )
}

export type ModalBodyProps = HtmlUiProps<"div">

export const ModalBody = forwardRef(function ModalBody(
  { as, ...props }: ModalBodyProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const { slots, classNames } = useContext(ModalVariantContext)!

  const Component = as || "div"

  return (
    <Component
      ref={ref}
      className={slots.body({
        className: cn(classNames?.body, props.className),
      })}
      {...props}
    />
  )
})

export type ModalFooter = HtmlUiProps<"footer">

export const ModalFooter = forwardRef(function ModalFooter(
  { as, ...props }: ModalFooter,
  ref: React.ForwardedRef<HTMLElement>,
) {
  const { slots, classNames } = useContext(ModalVariantContext)!
  const Component = as || "footer"

  return (
    <Component
      ref={ref}
      className={slots.footer({
        className: cn(classNames?.footer, props.className),
      })}
      {...props}
    />
  )
})
