import { useMemo } from "react"
import { Link } from "react-aria-components"

import { dataAttr } from "@opengovsg/oui-theme"

import type { SidebarItemProps } from "./types"
import { renderChildren } from "../system/react-utils/children"
import { forwardRef } from "../system/utils"
import { useSidebarNestContext, useSidebarStyleContext } from "./context"

export const SidebarItem = forwardRef<"li", SidebarItemProps>(
  ({ children, startContent, endContent, isSelected, ...props }, ref) => {
    const { slots, classNames } = useSidebarStyleContext()
    const { isNested, isExpanded } = useSidebarNestContext() ?? {}

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
        <Link
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
              {renderChildren(renderProps, children)}
              {endContent}
            </>
          )}
        </Link>
      </li>
    )
  },
)

SidebarItem.displayName = "SidebarItem"
