"use client"

import type { ReactNode } from "react"
import type { ToggleButtonProps } from "react-aria-components"
import { useMemo } from "react"
import { chain, useLocalizedStringFormatter } from "react-aria"
import { ToggleButton } from "react-aria-components"

import type { ButtonVariantProps, SlotsToClasses } from "@opengovsg/oui-theme"
import { buttonStyles, cn, dataAttr } from "@opengovsg/oui-theme"

import { useNavbarContext } from "../navbar-context"
import { i18nStrings } from "./i18n"

export interface NavbarMenuToggleProps
  extends ToggleButtonProps,
    Pick<ButtonVariantProps, "size" | "radius" | "isIconOnly"> {
  /**
   * The icon to display.
   */
  icon?: ReactNode | ((isOpen: boolean) => ReactNode) | null
  classNames?: SlotsToClasses<"toggle" | "toggleIcon">
}

export const NavbarMenuToggle = ({
  icon,
  className,
  onChange,
  classNames,
  size = "sm",
  radius,
  isIconOnly = true,
  ...props
}: NavbarMenuToggleProps) => {
  const {
    slots,
    classNames: contextClassNames,
    isMenuOpen,
    setIsMenuOpen,
    menuRef,
    position,
    menuTopOffset,
  } = useNavbarContext()

  // Scroll to top when menu is opened if navbar position is not sticky so that
  // there is no gap between the navbar and the menu if the user has scrolled down.
  const shouldScrollToTop = (isMenuOpen: boolean) => {
    if (!isMenuOpen || position === "sticky" || typeof window === "undefined") {
      return
    }
    window.scrollTo({ top: menuTopOffset, behavior: "instant" })
  }

  const stringFormatter = useLocalizedStringFormatter(i18nStrings)

  const toggleStyles = useMemo(() => {
    return buttonStyles({
      variant: "unstyled",
      size,
      radius,
      isIconOnly,
      className: slots.toggle({
        className: cn(
          contextClassNames?.toggle,
          className ?? classNames?.toggle,
        ),
      }),
    })
  }, [
    className,
    classNames?.toggle,
    contextClassNames?.toggle,
    isIconOnly,
    radius,
    size,
    slots,
  ])

  const child = useMemo(() => {
    if (typeof icon === "function") {
      return icon(isMenuOpen ?? false)
    }

    return (
      icon || (
        <span
          className={slots.toggleIcon({
            class: cn(contextClassNames?.toggleIcon, classNames?.toggleIcon),
          })}
        />
      )
    )
  }, [
    icon,
    slots,
    classNames?.toggleIcon,
    contextClassNames?.toggleIcon,
    isMenuOpen,
  ])

  return (
    <ToggleButton
      aria-label={
        isMenuOpen
          ? stringFormatter.format("Close navigation menu")
          : stringFormatter.format("Open navigation menu")
      }
      ref={menuRef}
      data-open={dataAttr(isMenuOpen)}
      className={toggleStyles}
      isSelected={isMenuOpen}
      onChange={chain(onChange, shouldScrollToTop, setIsMenuOpen)}
      {...props}
    >
      {child}
    </ToggleButton>
  )
}
