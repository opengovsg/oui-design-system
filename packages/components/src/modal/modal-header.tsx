"use client"

import { cn } from "@opengovsg/oui-theme"
import { useContext } from "react"
import type { HeadingProps } from "react-aria-components"
import { Heading } from "react-aria-components"

import { ModalVariantContext } from "./modal-variant-context"

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ModalHeaderProps extends HeadingProps {}

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
