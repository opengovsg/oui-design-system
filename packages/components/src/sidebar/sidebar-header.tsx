import type { SidebarHeaderProps } from "./types"
import { renderChildren } from "../system/react-utils/children"
import { forwardRef } from "../system/utils"
import { useSidebarStyleContext } from "./context"

export const SidebarHeader = forwardRef<"div", SidebarHeaderProps>(
  ({ children, startContent, endContent, ...props }, ref) => {
    const { slots, classNames } = useSidebarStyleContext()

    return (
      <li
        className={slots.headerLi({
          className: classNames?.headerLi,
        })}
      >
        <h2
          className={slots.header({
            className: classNames?.header,
          })}
          ref={ref}
          {...props}
        >
          {startContent}
          {renderChildren({}, children)}
          {endContent}
        </h2>
      </li>
    )
  },
)

SidebarHeader.displayName = "SidebarHeader"
