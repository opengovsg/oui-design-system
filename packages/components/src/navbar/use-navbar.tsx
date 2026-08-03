"use client"

import type {
  NavbarSlots,
  NavbarVariantProps,
  SlotsToClasses,
} from "@opengovsg/oui-theme"
import { cn, dataAttr, navbarStyles } from "@opengovsg/oui-theme"
import { mergeProps, useResizeObserver } from "@react-aria/utils"
import { useControlledState } from "@react-stately/utils"
import type { HTMLMotionProps } from "motion/react"
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react"
import { usePreventScroll } from "react-aria"

import { useScrollPosition } from "../hooks/use-scroll-position"
import type { ReactRef } from "../system/react-utils"
import { useDomRef } from "../system/react-utils"
import type { HtmlUiProps, PropGetter } from "../system/types"
import { mapPropsVariants } from "../system/utils"

// Add a buffer to prevent navbar display state change when scroll position is small
const NAVBAR_PRESENCE_BUFFER = 10

interface Props extends HtmlUiProps<"nav"> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLElement | null>
  /**
   * The parent element where the navbar is placed within.
   * This is used to determine the scroll position for `shouldShowOnScrollUp`.
   * @default `window`
   */
  parentRef?: React.RefObject<HTMLElement>
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
   * Whether the navbar should show up when user is scrolling up or not.
   * Will only take effect if the `position` of the navbar is set to `static`.
   * @default false
   */
  shouldShowOnScrollUp?: boolean
  /**
   * Whether the navbar parent scroll event should be listened to or not.
   * @default false
   */
  disableScrollHandler?: boolean
  /**
   * The scroll event handler for the navbar. The event fires when the navbar parent element is scrolled.
   * it only works if `disableScrollHandler` is set to `false` or `shouldShowOnScrollUp` is set to `true`.
   */
  onScrollPositionChange?: (scrollPosition: number) => void
  /**
   * Whether the navbar should block scroll when the menu is open or not.
   * @default true
   */
  shouldBlockScroll?: boolean
  /**
   * The props to modify motion animation. Use the `variants` API to create your own animation.
   * This motion is only available if the `shouldShowOnScrollUp` prop is set to `true`.
   */
  motionProps?: Omit<HTMLMotionProps<"nav">, "ref">
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
      parentRef,
      height = "4rem",
      shouldBlockScroll = true,
      shouldShowOnScrollUp = false,
      disableScrollHandler = false,
      onScrollPositionChange,
      isMenuOpen: isMenuOpenProp,
      isMenuDefaultOpen,
      onMenuOpenChange = () => {},
      className,
      classNames,
      motionProps,
      ...otherProps
    },
    variantProps,
  ] = mapPropsVariants(originalProps, navbarStyles.variantKeys)

  const Component = as || "nav"

  const domRef = useDomRef(ref)
  const menuRef = useRef<HTMLButtonElement | null>(null)

  const handleMenuOpenChange = useCallback(
    (isOpen: boolean | undefined) => {
      onMenuOpenChange(isOpen || false)
    },
    [onMenuOpenChange],
  )

  const [menuTopOffset, setMenuOffset] = useState(0)
  const [isNavbarHidden, setIsNavbarHidden] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useControlledState<boolean>(
    isMenuOpenProp,
    isMenuDefaultOpen ?? false,
    handleMenuOpenChange,
  )

  usePreventScroll({
    isDisabled: !(shouldBlockScroll && isMenuOpen),
  })

  useResizeObserver({
    ref: domRef,
    onResize: () => {
      setMenuOffset(domRef.current?.getBoundingClientRect().top || 0)
    },
  })

  const truePosition = variantProps.position ?? "sticky"
  const positionVariantProp = shouldShowOnScrollUp ? "sticky" : truePosition

  const slots = navbarStyles({
    ...variantProps,
    position: positionVariantProp,
  })

  const baseStyles = cn(classNames?.base, className)

  const navHeight = useRef(0)
  useEffect(() => {
    navHeight.current = domRef.current?.offsetHeight || 0
  }, [domRef])

  const [scrollElement, setScrollElement] = useState<HTMLElement | null>(null)
  useLayoutEffect(() => {
    setScrollElement(parentRef?.current ?? null)
  }, [parentRef])

  useScrollPosition({
    element: scrollElement,
    isEnabled: shouldShowOnScrollUp || !disableScrollHandler,
    callback: ({ prevPos, currPos }) => {
      onScrollPositionChange?.(currPos.y)
      if (shouldShowOnScrollUp) {
        setIsNavbarHidden((prev) => {
          const next =
            currPos.y > prevPos.y + NAVBAR_PRESENCE_BUFFER &&
            currPos.y > navHeight.current

          return next !== prev ? next : prev
        })
      }
    },
  })

  const heightPx = typeof height === "number" ? `${height}px` : height
  const menuTopOffsetPx = `calc(${heightPx} + ${menuTopOffset}px)`

  const getBaseProps: PropGetter = (props = {}) => ({
    ...mergeProps(otherProps, props),
    "data-hidden": dataAttr(isNavbarHidden),
    "data-menu-open": dataAttr(isMenuOpen),
    ref: domRef,
    className: slots.base({ class: cn(baseStyles, props?.className) }),
    style: {
      "--navbar-height": heightPx,
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
    menuTopOffset,
    menuTopOffsetPx,
    isNavbarHidden,
    shouldShowOnScrollUp: shouldShowOnScrollUp && truePosition === "static",
    isMenuOpen,
    classNames,
    setIsMenuOpen,
    menuRef,
    getBaseProps,
    getWrapperProps,
    position: positionVariantProp,
    motionProps,
  }
}

export type UseNavbarReturn = ReturnType<typeof useNavbar>
