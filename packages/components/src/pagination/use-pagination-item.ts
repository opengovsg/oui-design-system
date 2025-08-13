"use client"

import type { LinkDOMProps, PressEvent } from "@react-types/shared"
import type { Ref } from "react"
import { useMemo } from "react"
import { useFocusRing } from "@react-aria/focus"
import { useHover, usePress } from "@react-aria/interactions"
import {
  chain,
  mergeProps,
  shouldClientNavigate,
  useRouter,
} from "@react-aria/utils"

import { cn, dataAttr } from "@opengovsg/oui-theme"

import type { HtmlUiProps, PropGetter } from "../system/types"
import type { PaginationItemValue } from "./hooks/use-pagination"
import { filterDOMProps, useDomRef } from "../system/react-utils"

interface Props extends Omit<HtmlUiProps<"li">, "onClick"> {
  /**
   * Ref to the DOM node.
   */
  ref?: Ref<HTMLElement>
  /**
   * Value of the item.
   */
  value?: PaginationItemValue
  /**
   * Whether the item is active.
   * @default false
   */
  isActive?: boolean
  /**
   * Whether the item is disabled.
   * @default false
   */
  isDisabled?: boolean
  /**
   * Callback fired when the item is clicked.
   * @param e MouseEvent
   * @deprecated Use `onPress` instead.
   */
  onClick?: HtmlUiProps<"li">["onClick"]
  /**
   * Callback fired when the item is clicked.
   * @param e PressEvent
   */
  onPress?: (e: PressEvent) => void
  /**
   * Function to get the aria-label of the item.
   */
  getAriaLabel?: (page?: PaginationItemValue) => string | undefined
}

export type UsePaginationItemProps = Props & LinkDOMProps

export function usePaginationItem(props: UsePaginationItemProps) {
  const {
    as,
    ref,
    value,
    children,
    isActive,
    isDisabled,
    onPress,
    onClick,
    getAriaLabel,
    className,
    ...otherProps
  } = props

  const isLink = !!props?.href
  const Component = as || isLink ? "a" : "li"
  const shouldFilterDOMProps = typeof Component === "string"
  const domRef = useDomRef(ref)

  const router = useRouter()

  const ariaLabel = useMemo(
    () =>
      isActive ? `${getAriaLabel?.(value)} active` : getAriaLabel?.(value),
    [isActive, getAriaLabel, value],
  )

  const { isPressed, pressProps } = usePress({
    isDisabled,
    onPress,
  })

  const { focusProps, isFocused, isFocusVisible } = useFocusRing({})
  const { isHovered, hoverProps } = useHover({ isDisabled })

  const getItemProps: PropGetter = (props = {}) => {
    return {
      ref: domRef,
      role: "button",
      tabIndex: isDisabled ? -1 : 0,
      "aria-label": ariaLabel,
      "aria-current": dataAttr(isActive),
      "aria-disabled": dataAttr(isDisabled),
      "data-disabled": dataAttr(isDisabled),
      "data-active": dataAttr(isActive),
      "data-focus": dataAttr(isFocused),
      "data-hover": dataAttr(isHovered),
      "data-pressed": dataAttr(isPressed),
      "data-focus-visible": dataAttr(isFocusVisible),
      ...mergeProps(
        props,
        pressProps,
        focusProps,
        hoverProps,
        filterDOMProps(otherProps, {
          enabled: shouldFilterDOMProps,
        }),
      ),
      className: cn(className, props.className),
      onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
        chain(pressProps?.onClick, onClick)(e)

        // If a custom router is provided, prevent default and forward if this link should client navigate.
        if (
          !router.isNative &&
          e.currentTarget instanceof HTMLAnchorElement &&
          e.currentTarget.href &&
          // If props are applied to a router Link component, it may have already prevented default.
          !e.isDefaultPrevented() &&
          shouldClientNavigate(e.currentTarget, e) &&
          props.href
        ) {
          e.preventDefault()
          router.open(e.currentTarget, e, props.href, props.routerOptions)
        }
      },
    }
  }

  return {
    Component,
    children,
    ariaLabel,
    isFocused,
    isFocusVisible,
    getItemProps,
  }
}

export type UsePaginationItemReturn = ReturnType<typeof usePaginationItem>
