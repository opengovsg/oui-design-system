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
import {
  popoverArrowStyles,
  popoverOverlayStyles,
  popoverStyles,
} from "@opengovsg/oui-theme"

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
  // The enter animation lives on the inner wrapper, not this overlay, so it does
  // not corrupt react-aria's open-time measurement (which decides flipping). The
  // overlay carries only the exit animation, which react-aria needs to detect to
  // delay unmount.
  const wrapperClassName = composeRenderProps(
    className ?? classNames?.base,
    (className) => popoverStyles({ className }),
  )
  return (
    <AriaPopover offset={offset} {...props} className={popoverOverlayStyles()}>
      {composeRenderProps(children, (children, renderProps) => (
        <>
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
          {/* `data-placement` mirrors react-aria's so the `placement-*:` slide
              variants resolve against this wrapper. */}
          <div
            data-placement={renderProps.placement}
            className={
              typeof wrapperClassName === "function"
                ? wrapperClassName({
                    ...renderProps,
                    defaultClassName: undefined,
                  })
                : wrapperClassName
            }
          >
            {children}
          </div>
        </>
      ))}
    </AriaPopover>
  )
}
