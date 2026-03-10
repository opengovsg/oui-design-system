"use client"

import { useMemo } from "react"
import { CircleAlert, CircleCheck, Info } from "lucide-react"

import type { UseInfoboxProps } from "./use-infobox"
import { useInfobox } from "./use-infobox"

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface InfoboxProps extends UseInfoboxProps {}

export const Infobox = (props: InfoboxProps) => {
  const { Component, children, slots, classNames, icon, variant } =
    useInfobox(props)

  const displayedIcon = useMemo(() => {
    // Custom icon provided - pass through as-is
    if (icon) {
      return icon
    }

    // Explicitly no icon
    if (icon === null) {
      return null
    }

    // Default icon based on variant with slot styling
    const iconClassName = slots.icon({ className: classNames?.icon })

    switch (variant) {
      case "error":
        return <CircleAlert className={iconClassName} />
      case "success":
        return <CircleCheck className={iconClassName} />
      case "warning":
      case "info":
      default:
        return <Info className={iconClassName} />
    }
  }, [icon, variant, slots, classNames?.icon])

  return (
    <Component className={slots.base({ className: classNames?.base })}>
      {displayedIcon}
      <div className={slots.wrapper({ className: classNames?.wrapper })}>
        {children}
      </div>
    </Component>
  )
}
