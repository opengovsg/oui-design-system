"use client"

import { dataAttr } from "@opengovsg/oui-theme"
import { useMemo } from "react"
import { Link } from "react-aria-components"

import { renderChildren } from "../system/react-utils/children"
import { forwardRef } from "../system/utils"
import { Tooltip, TooltipTrigger } from "../tooltip"
import {
  useSidebarCollapseContext,
  useSidebarNestContext,
  useSidebarStyleContext,
} from "./context"
import type { SidebarItemProps } from "./types"

export const SidebarItem = forwardRef<"li", SidebarItemProps>(
  (
    { children, startContent, endContent, tooltip, isSelected, ...props },
    ref,
  ) => {
    const { slots, classNames } = useSidebarStyleContext()
    const { isNested, isExpanded } = useSidebarNestContext() ?? {}
    const { isCollapsed, tooltipProps, tooltipTriggerProps } =
      useSidebarCollapseContext() ?? {}

    const dataSelected = useMemo(() => {
      if (typeof isSelected === "function") {
        return isSelected()
      }
      return isSelected
    }, [isSelected])

    return (
      <li
        data-selected={dataAttr(dataSelected)}
        data-nested={dataAttr(isNested)}
        className={slots.item({
          isNested,
          className: classNames?.item,
        })}
        ref={ref}
      >
        <TooltipTrigger delay={0} {...tooltipTriggerProps}>
          <Link
            aria-label={isCollapsed ? tooltip : undefined}
            {...props}
            className={slots.label({
              isNested,
              isExpanded,
              className: classNames?.label,
            })}
          >
            {(renderProps) => (
              <>
                {startContent}
                {!isCollapsed && renderChildren(renderProps, children)}
                {!isCollapsed && endContent}
              </>
            )}
          </Link>
          {isCollapsed && (
            <Tooltip placement="end" {...tooltipProps}>
              {tooltip}
            </Tooltip>
          )}
        </TooltipTrigger>
      </li>
    )
  },
)

SidebarItem.displayName = "SidebarItem"
