import { useMemo } from "react"
import { Link } from "react-aria-components"

import { dataAttr } from "@opengovsg/oui-theme"

import type { SidebarItemProps } from "./types"
import { renderChildren } from "../system/react-utils/children"
import { forwardRef } from "../system/utils"
import { useSidebarNestContext, useSidebarStyleContext } from "./context"

export const SidebarItem = forwardRef<"li", SidebarItemProps>(
  ({ children, startContent, endContent, isSelected, ...props }, ref) => {
    const { slots } = useSidebarStyleContext()
    const { nested } = useSidebarNestContext() ?? { nested: false }

    const dataSelected = useMemo(() => {
      if (typeof isSelected === "function") {
        return isSelected()
      }
      return isSelected
    }, [isSelected])

    return (
      <li
        data-selected={dataAttr(dataSelected)}
        className={slots.item({ isNested: nested })}
        ref={ref}
      >
        <Link {...props}>
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
