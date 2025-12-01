"use client"

import { useContext } from "react"

import { cn } from "@opengovsg/oui-theme"

import type { HtmlUiProps } from "../system/types"
import { forwardRef } from "../system/utils"
import { ModalVariantContext } from "./modal-variant-context"

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ModalFooterProps extends HtmlUiProps<"footer"> {}

export const ModalFooter = forwardRef(function ModalFooter(
  { as, ...props }: ModalFooterProps,
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

ModalFooter.displayName = "ModalFooter"
