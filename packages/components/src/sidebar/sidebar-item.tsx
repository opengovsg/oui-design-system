import { useMemo } from "react"
import { Link, Tooltip, TooltipTrigger } from "react-aria-components"

import { dataAttr } from "@opengovsg/oui-theme"

import type { SidebarItemProps } from "./types"
import { renderChildren } from "../system/react-utils/children"
import { forwardRef } from "../system/utils"
import {
  useSidebarCollapseContext,
  useSidebarNestContext,
  useSidebarStyleContext,
} from "./context"

export const SidebarItem = forwardRef<"li", SidebarItemProps>(
  (
    { children, startContent, endContent, tooltip, isSelected, ...props },
    ref,
  ) => {
    const { slots, classNames } = useSidebarStyleContext()
    const { isNested, isExpanded } = useSidebarNestContext() ?? {}
    const { isCollapsed } = useSidebarCollapseContext() ?? {}

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
        <TooltipTrigger delay={0}>
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
          {/* TODO: Style tooltip and move to theme */}
          {isCollapsed && (
            <Tooltip offset={4} placement="right">
              {tooltip}
            </Tooltip>
          )}
        </TooltipTrigger>
      </li>
    )
  },
)

SidebarItem.displayName = "SidebarItem"
