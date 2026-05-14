"use client"

import { Overlay } from "@react-aria/overlays"
import { chain } from "react-aria"

import { cn, dataAttr } from "@opengovsg/oui-theme"

import type { HtmlUiProps } from "../system/types"
import { useDomRef } from "../system/react-utils"
import { forwardRef } from "../system/utils"
import { useNavbarContext } from "./navbar-context"

export interface NavbarMenuProps extends HtmlUiProps<"ul"> {
  children?: React.ReactNode
  /**
   * The container element in which the navbar menu overlay portal will be placed.
   * @default below the navbar element
   */
  portalContainer?: Element
}

export const NavbarMenu = forwardRef<"ul", NavbarMenuProps>(
  (
    { className, children, portalContainer, style, onKeyDown, ...props },
    ref,
  ) => {
    const domRef = useDomRef(ref)

    const {
      slots,
      isMenuOpen,
      menuTopOffsetPx,
      classNames,
      setIsMenuOpen,
      domRef: parentRef,
      menuRef,
    } = useNavbarContext()

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation()
        setIsMenuOpen(false)
        // Return focus to the menu toggle button
        menuRef.current?.focus()
      }
    }

    if (!isMenuOpen) return null

    return (
      <Overlay
        disableFocusManagement // Handled by FocusScope in Navbar
        portalContainer={portalContainer ?? parentRef.current ?? undefined}
      >
        <ul
          ref={domRef}
          className={slots.menu?.({
            className: cn(classNames?.menu, className),
          })}
          data-open={dataAttr(isMenuOpen)}
          style={{
            ...style,
            // @ts-expect-error due to not having any type declaration for CSS variables in React style prop
            "--menu-offset": menuTopOffsetPx,
          }}
          onKeyDown={chain(handleKeyDown, onKeyDown)}
          {...props}
        >
          {children}
        </ul>
      </Overlay>
    )
  },
)

NavbarMenu.displayName = "NavbarMenu"
