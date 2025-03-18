"use client"

import { forwardRef, useMemo } from "react"
import { XIcon } from "lucide-react"

import type { UseBadgeProps } from "./use-badge"
import { useBadge } from "./use-badge"

export const Badge = forwardRef<HTMLDivElement, UseBadgeProps>((props, ref) => {
  const {
    Component,
    children,
    slots,
    classNames,
    getChipProps,
    getCloseButtonProps,
    startContent,
    endContent,
    isCloseable,
  } = useBadge({ ...props, ref })

  const end = useMemo(() => {
    if (isCloseable) {
      return <span {...getCloseButtonProps()}>{endContent ?? <XIcon />}</span>
    }
    return endContent
  }, [endContent, getCloseButtonProps, isCloseable])

  return (
    <Component {...getChipProps()}>
      {startContent}
      <span className={slots.content({ className: classNames?.content })}>
        {children}
      </span>
      {end}
    </Component>
  )
})

Badge.displayName = "Badge"
