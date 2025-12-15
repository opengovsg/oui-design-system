"use client"

import { cn } from "@opengovsg/oui-theme"

import type { HtmlUiProps } from "../system/types"
import { useDomRef } from "../system/react-utils"
import { forwardRef } from "../system/utils"
import { useNavbarContext } from "./navbar-context"

export interface NavbarBrandProps extends HtmlUiProps<"div"> {
  children?: React.ReactNode | React.ReactNode[]
}

export const NavbarBrand = forwardRef<"div", NavbarBrandProps>((props, ref) => {
  const { as, className, children, ...otherProps } = props

  const Component = as || "div"
  const domRef = useDomRef(ref)

  const { slots, classNames } = useNavbarContext()

  return (
    <Component
      ref={domRef}
      className={slots.brand?.({ className: cn(classNames?.brand, className) })}
      {...otherProps}
    >
      {children}
    </Component>
  )
})

NavbarBrand.displayName = "NavbarBrand"
