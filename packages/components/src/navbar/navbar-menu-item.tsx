"use client"

import type { ClassNameOrFunction } from "@opengovsg/oui-theme"
import { cn, dataAttr, navbarMenuItemStyles } from "@opengovsg/oui-theme"
import { composeRenderProps, useRenderProps } from "react-aria-components"

import { useDomRef } from "../system/react-utils"
import type { HtmlUiProps } from "../system/types"
import { forwardRef } from "../system/utils"
import { useNavbarContext } from "./navbar-context"

export interface NavbarMenuItemRenderProps {
  isActive: boolean
}

export interface NavbarMenuItemProps extends Omit<
  HtmlUiProps<"li">,
  "className"
> {
  /**
   * Whether the item is active or not.
   * @default false
   */
  isActive?: boolean
  children?: React.ReactNode
  className?: ClassNameOrFunction<NavbarMenuItemRenderProps>
}

export const NavbarMenuItem = forwardRef<"li", NavbarMenuItemProps>(
  (props, ref) => {
    const { className, children, isActive, ...otherProps } = props

    const domRef = useDomRef(ref)

    const { isMenuOpen, classNames } = useNavbarContext()

    const renderProps = useRenderProps({
      className: composeRenderProps(className, (className, renderProps) =>
        navbarMenuItemStyles({
          className: cn(classNames?.menuItem, className),
          ...renderProps,
        }),
      ),
      values: {
        isActive: !!isActive,
      },
    })

    return (
      <li
        ref={domRef}
        className={renderProps.className}
        data-active={dataAttr(isActive)}
        data-open={dataAttr(isMenuOpen)}
        {...otherProps}
      >
        {children}
      </li>
    )
  },
)

NavbarMenuItem.displayName = "NavbarMenuItem"
