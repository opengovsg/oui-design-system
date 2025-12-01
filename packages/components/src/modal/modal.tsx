"use client"

import type { ModalOverlayProps } from "react-aria-components"
import { forwardRef, useMemo } from "react"
import {
  Modal as AriaModal,
  ModalOverlay,
  Provider,
} from "react-aria-components"

import type {
  ModalSlots,
  SlotsToClasses,
  VariantProps,
} from "@opengovsg/oui-theme"
import { composeRenderProps, modalStyles } from "@opengovsg/oui-theme"

import type { ButtonProps } from "../button"
import { mapPropsVariants } from "../system/utils"
import { ModalVariantContext } from "./modal-variant-context"

export interface ModalProps
  extends ModalOverlayProps,
    VariantProps<typeof modalStyles> {
  classNames?: SlotsToClasses<ModalSlots>
}

export const Modal = forwardRef(function Modal(
  originalProps: ModalProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const [{ classNames, ...props }, variantProps] = mapPropsVariants(
    originalProps,
    modalStyles.variantKeys,
  )

  const { isDismissable = true } = props
  const slots = modalStyles(variantProps)

  const buttonSize: ButtonProps["size"] = useMemo(() => {
    switch (variantProps.size) {
      case "mobile":
        return "md"
      default: {
        return "lg"
      }
    }
  }, [variantProps.size])

  return (
    <Provider
      values={[
        [
          ModalVariantContext,
          { ...variantProps, classNames, buttonSize, slots },
        ],
      ]}
    >
      <ModalOverlay
        {...props}
        isDismissable={isDismissable}
        className={slots.overlay({
          className: classNames?.overlay,
        })}
      >
        <AriaModal
          {...props}
          ref={ref}
          isDismissable={isDismissable}
          className={composeRenderProps(
            props.className ?? classNames?.base,
            (className, renderProps) =>
              slots.base({ className, ...renderProps }),
          )}
        />
      </ModalOverlay>
    </Provider>
  )
})

Modal.displayName = "Modal"
