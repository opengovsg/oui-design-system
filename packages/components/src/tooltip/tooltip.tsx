"use client"

import type {
  TooltipProps as AriaTooltipProps,
  TooltipRenderProps,
  TooltipTriggerComponentProps,
} from "react-aria-components"
import {
  Tooltip as AriaTooltip,
  TooltipTrigger as AriaTooltipTrigger,
  OverlayArrow,
} from "react-aria-components"

import type {
  SlotsToClassesWithRenderProps,
  TooltipSlots,
  TooltipVariantProps,
} from "@opengovsg/oui-theme"
import { composeRenderProps, tooltipStyles } from "@opengovsg/oui-theme"

import { mapPropsVariants } from "../system/utils"

export interface TooltipProps
  extends Omit<AriaTooltipProps, "children">,
    TooltipVariantProps {
  children: React.ReactNode
  /**
   * Whether to show the arrow pointing to the trigger element.
   * @default true
   */
  showArrow?: boolean

  classNames?: SlotsToClassesWithRenderProps<TooltipSlots, TooltipRenderProps>
}

export function Tooltip(originalProps: TooltipProps) {
  const [{ children, showArrow = true, classNames, ...props }, variantProps] =
    mapPropsVariants(originalProps, tooltipStyles.variantKeys)

  const styles = tooltipStyles(variantProps)

  return (
    <AriaTooltip
      isEntering={variantProps.isEntering}
      isExiting={variantProps.isExiting}
      offset={10}
      {...props}
      className={composeRenderProps(
        props.className ?? classNames?.base,
        (className, renderProps) =>
          styles.base({
            ...renderProps,
            className,
          }),
      )}
    >
      {(renderProps) => (
        <>
          {showArrow && (
            <OverlayArrow>
              <svg
                width={8}
                height={8}
                viewBox="0 0 8 8"
                className={composeRenderProps(
                  classNames?.arrow,
                  (className, renderProps) =>
                    styles.arrow({
                      className,
                      ...renderProps,
                    }),
                )(renderProps)}
              >
                <path d="M0 0 L4 4 L8 0" />
              </svg>
            </OverlayArrow>
          )}
          {children}
        </>
      )}
    </AriaTooltip>
  )
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface TooltipTriggerProps extends TooltipTriggerComponentProps {}

export function TooltipTrigger(props: TooltipTriggerProps) {
  return <AriaTooltipTrigger delay={300} {...props} />
}
