"use client"

import type { PopoverProps as AriaPopoverProps } from "react-aria-components"
import {
  Popover as AriaPopover,
  composeRenderProps,
  OverlayArrow,
  PopoverContext,
  useSlottedContext,
} from "react-aria-components"

import type { SlotsToClasses, VariantProps } from "@opengovsg/oui-theme"
import { popoverArrowStyles, popoverStyles } from "@opengovsg/oui-theme"

export interface PopoverProps
  extends Omit<AriaPopoverProps, "children">,
    VariantProps<typeof popoverStyles> {
  showArrow?: boolean
  children: React.ReactNode

  /**
   * List of classes to change the className of the element.
   *
   * @example
   * ```text
   * Component: Popover
   *
   * Class names:
   * - base: the popover itself. Will be ignored if `className` is provided.
   * - arrow: the arrow of the popover.
   */
  classNames?: SlotsToClasses<"arrow" | "base">
}

export const Popover = ({
  children,
  showArrow,
  className,
  classNames,
  ...props
}: PopoverProps) => {
  const popoverContext = useSlottedContext(PopoverContext)!
  const isSubmenu = popoverContext?.trigger === "SubmenuTrigger"
  let offset = showArrow ? 12 : 8
  offset = isSubmenu ? offset - 6 : offset
  return (
    <AriaPopover
      offset={offset}
      {...props}
      className={composeRenderProps(
        className ?? classNames?.base,
        (className, renderProps) =>
          popoverStyles({ ...renderProps, className }),
      )}
    >
      {showArrow && (
        <OverlayArrow className="group">
          <svg
            width={12}
            height={12}
            viewBox="0 0 12 12"
            className={popoverArrowStyles({ className: classNames?.arrow })}
          >
            <path d="M0 0 L6 6 L12 0" />
          </svg>
        </OverlayArrow>
      )}
      {children}
    </AriaPopover>
  )
}
