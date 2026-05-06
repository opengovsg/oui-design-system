"use client"

import { useContext } from "react"

import { cn } from "@opengovsg/oui-theme"

import type { HtmlUiProps } from "../system/types"
import { forwardRef } from "../system/utils"
import { ModalVariantContext } from "./modal-variant-context"

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ModalBodyProps extends HtmlUiProps<"div"> {}

export const ModalBody = forwardRef(function ModalBody(
  { as, ...props }: ModalBodyProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const { slots, classNames } = useContext(ModalVariantContext)!

  const Component = as || "div"

  return (
    <Component
      ref={ref}
      {...props}
      className={slots.body({
        className: cn(classNames?.body, props.className),
      })}
    />
  )
})
