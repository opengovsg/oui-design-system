"use client"

import { forwardRef, useMemo } from "react"
import { XIcon } from "lucide-react"

import type { UseBadgeProps } from "./use-badge"
import { useBadge } from "./use-badge"

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface BadgeProps extends UseBadgeProps {}

export const Badge = forwardRef<HTMLDivElement, BadgeProps>((props, ref) => {
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

  const start = useMemo(() => {
    if (props.variant === "dot" && !startContent) {
      return <span className={slots.dot({ className: classNames?.dot })} />
    }
    return startContent
  }, [props.variant, startContent, slots, classNames?.dot])

  const end = useMemo(() => {
    if (isCloseable) {
      return (
        <span {...getCloseButtonProps()}>
          {endContent ?? <XIcon className="size-full" />}
        </span>
      )
    }
    return endContent
  }, [endContent, getCloseButtonProps, isCloseable])

  return (
    <Component {...getChipProps()}>
      {start}
      <span className={slots.content({ className: classNames?.content })}>
        {children}
      </span>
      {end}
    </Component>
  )
})

Badge.displayName = "Badge"
