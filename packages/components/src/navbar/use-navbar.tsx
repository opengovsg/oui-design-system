"use client"

import { useCallback, useEffect, useRef } from "react"
import { usePreventScroll } from "@react-aria/overlays"
import { mergeProps, useResizeObserver } from "@react-aria/utils"
import { useControlledState } from "@react-stately/utils"
import { useDeepCompareMemo } from "use-deep-compare"

import type {
  NavbarSlots,
  NavbarVariantProps,
  SlotsToClasses,
} from "@opengovsg/oui-theme"
import { cn, dataAttr, navbarStyles } from "@opengovsg/oui-theme"

import type { ReactRef } from "../system/react-utils"
import type { HtmlUiProps, PropGetter } from "../system/types"
import { useDomRef } from "../system/react-utils"
import { mapPropsVariants } from "../system/utils"

interface Props extends HtmlUiProps<"nav"> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLElement | null>
  /**
   * The height of the navbar.
   * @default "4rem" (64px)
   */
  height?: number | string
  /**
   * Whether the menu is open.
   * @default false
   */
  isMenuOpen?: boolean
  /**
   * Whether the menu should be open by default.
   * @default false
   */
  isMenuDefaultOpen?: boolean
  /**
   * Whether the navbar should block scroll when the menu is open or not.
   * @default true
   */
  shouldBlockScroll?: boolean
  /**
   * The event handler for the menu open state.
   * @param isOpen boolean
   * @returns void
   */
  onMenuOpenChange?: (isOpen: boolean) => void
  /**
   * Classname or List of classes to change the classNames of the element.
   * if `className` is passed, it will be added to the base slot.
   */
  classNames?: SlotsToClasses<NavbarSlots>
}

export type UseNavbarProps = Props & NavbarVariantProps

export function useNavbar(originalProps: UseNavbarProps) {
  const [
    {
      ref,
      as,
      height = "4rem",
      shouldBlockScroll = true,
      isMenuOpen: isMenuOpenProp,
      isMenuDefaultOpen,
      onMenuOpenChange = () => {},
      className,
      classNames,
      ...otherProps
    },
    variantProps,
  ] = mapPropsVariants(originalProps, navbarStyles.variantKeys)

  const Component = as || "nav"

  const domRef = useDomRef(ref)

  const menuRef = useRef<HTMLButtonElement | null>(null)

  const prevWidth = useRef(0)
  const navHeight = useRef(0)

  const handleMenuOpenChange = useCallback(
    (isOpen: boolean | undefined) => {
      onMenuOpenChange(isOpen || false)
    },
    [onMenuOpenChange],
  )

  const [isMenuOpen, setIsMenuOpen] = useControlledState<boolean>(
    isMenuOpenProp,
    isMenuDefaultOpen ?? false,
    handleMenuOpenChange,
  )

  const updateWidth = useCallback(() => {
    if (domRef.current) {
      const width = domRef.current.offsetWidth

      if (width !== prevWidth.current) {
        prevWidth.current = width
      }
    }
  }, [domRef])

  usePreventScroll({
    isDisabled: !(shouldBlockScroll && isMenuOpen),
  })

  useResizeObserver({
    ref: domRef,
    onResize: () => {
      const currentWidth = domRef.current?.offsetWidth
      const scrollWidth =
        window.innerWidth - document.documentElement.clientWidth

      if (currentWidth && currentWidth + scrollWidth == prevWidth.current) {
        return
      }

      if (currentWidth !== prevWidth.current) {
        updateWidth()
        setIsMenuOpen(false)
      }
    },
  })

  useEffect(() => {
    updateWidth()

    navHeight.current = domRef.current?.offsetHeight || 0
  }, [domRef, updateWidth])

  const slots = useDeepCompareMemo(
    () =>
      navbarStyles({
        ...variantProps,
      }),
    [variantProps],
  )

  const baseStyles = cn(classNames?.base, className)

  const getBaseProps: PropGetter = (props = {}) => ({
    ...mergeProps(otherProps, props),
    "data-menu-open": dataAttr(isMenuOpen),
    ref: domRef,
    className: slots.base({ class: cn(baseStyles, props?.className) }),
    style: {
      "--navbar-height": typeof height === "number" ? `${height}px` : height,
      ...otherProps?.style,
      ...props?.style,
    },
  })

  const getWrapperProps: PropGetter = (props = {}) => ({
    ...props,
    "data-menu-open": dataAttr(isMenuOpen),
    className: slots.wrapper({
      class: cn(classNames?.wrapper, props?.className),
    }),
  })

  return {
    Component,
    slots,
    domRef,
    height,
    isMenuOpen,
    classNames,
    setIsMenuOpen,
    menuRef,
    getBaseProps,
    getWrapperProps,
    position: variantProps.position ?? "sticky",
  }
}

export type UseNavbarReturn = ReturnType<typeof useNavbar>
