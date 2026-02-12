import { useMemo } from "react"
import { Link } from "react-aria-components"

import { dataAttr } from "@opengovsg/oui-theme"

import type { SidebarItemProps } from "./types"
import { renderChildren } from "../system/react-utils/children"
import { forwardRef } from "../system/utils"
import { useSidebarNestContext, useSidebarStyleContext } from "./context"

export const SidebarItem = forwardRef<"li", SidebarItemProps>(
  ({ children, startContent, endContent, isActive, ...props }, ref) => {
    const { slots } = useSidebarStyleContext()
    const { nested } = useSidebarNestContext() ?? { nested: false }

    const dataActive = useMemo(() => {
      if (typeof isActive === "function") {
        return isActive()
      }
      return isActive
    }, [isActive])

    return (
      <li
        data-active={dataAttr(dataActive)}
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
