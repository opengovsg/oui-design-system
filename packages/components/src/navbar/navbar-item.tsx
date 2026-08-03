"use client"

import { cn, dataAttr } from "@opengovsg/oui-theme"

import { useDomRef } from "../system/react-utils"
import type { HtmlUiProps } from "../system/types"
import { forwardRef } from "../system/utils"
import { useNavbarContext } from "./navbar-context"

export interface NavbarItemProps extends HtmlUiProps<"li"> {
  children?: React.ReactNode
  /**
   * Whether the item is active or not.
   * @default false
   */
  isActive?: boolean
}

export const NavbarItem = forwardRef<"div", NavbarItemProps>((props, ref) => {
  const { as, className, children, isActive, ...otherProps } = props

  const Component = as || "div"
  const domRef = useDomRef(ref)

  const { slots, classNames } = useNavbarContext()

  return (
    <Component
      ref={domRef}
      className={slots.item({ className: cn(classNames?.item, className) })}
      data-active={dataAttr(isActive)}
      {...otherProps}
    >
      {children}
    </Component>
  )
})

NavbarItem.displayName = "NavbarItem"
