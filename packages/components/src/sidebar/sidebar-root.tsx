"use client"

import type {
  SidebarSlots,
  SidebarVariantProps,
  SlotsToClasses,
} from "@opengovsg/oui-theme"
import { dataAttr, sidebarStyles } from "@opengovsg/oui-theme"
import { useControlledState } from "@react-stately/utils"
import type { PropsWithChildren } from "react"
import type {
  TooltipProps,
  TooltipTriggerComponentProps,
} from "react-aria-components"
import { Provider } from "react-aria-components"

import { mapPropsVariants } from "../system/utils"
import { SidebarCollapseContext, SidebarStyleContext } from "./context"

export interface SidebarRootProps extends PropsWithChildren<SidebarVariantProps> {
  className?: string
  classNames?: SlotsToClasses<SidebarSlots>

  /** Whether the sidebar is collapsed (controlled). */
  isCollapsed?: boolean
  /** Whether the sidebar is collapsed by default (uncontrolled). */
  defaultCollapsed?: boolean
  /** Handler that is called when the sidebar's collapsed state changes. */
  onCollapsedChange?: (isCollapsed: boolean) => void

  tooltipProps?: Partial<TooltipProps>
  tooltipTriggerProps?: Partial<TooltipTriggerComponentProps>
}

export const SidebarRoot = ({
  className,
  classNames,
  defaultCollapsed,
  onCollapsedChange,
  tooltipProps,
  tooltipTriggerProps,
  ...originalProps
}: SidebarRootProps) => {
  const [props, variantProps] = mapPropsVariants(
    originalProps,
    sidebarStyles.variantKeys,
  )

  const [isCollapsed, setCollapsed] = useControlledState(
    variantProps.isCollapsed,
    defaultCollapsed ?? false,
    onCollapsedChange,
  )

  const slots = sidebarStyles({ ...variantProps, isCollapsed })

  return (
    <Provider
      values={[
        [SidebarStyleContext, { slots, classNames }],
        [
          SidebarCollapseContext,
          { isCollapsed, setCollapsed, tooltipProps, tooltipTriggerProps },
        ],
      ]}
    >
      <nav
        data-collapsed={dataAttr(isCollapsed)}
        className={slots.base({
          className: className ?? classNames?.base,
        })}
      >
        <ul
          className={slots.ul({
            className: classNames?.ul,
          })}
          {...props}
        />
      </nav>
    </Provider>
  )
}
