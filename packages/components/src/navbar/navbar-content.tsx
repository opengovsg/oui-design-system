"use client"

import { cn } from "@opengovsg/oui-theme"

import { useDomRef } from "../system/react-utils"
import type { HtmlUiProps } from "../system/types"
import { forwardRef } from "../system/utils"
import { useNavbarContext } from "./navbar-context"

export interface NavbarContentProps extends HtmlUiProps<"ul"> {
  /**
   * The content of the Navbar.Content. It is usually the `NavbarItem`,
   */
  children?: React.ReactNode | React.ReactNode[]
  /**
   * The justify of the content
   * @default start
   */
  justify?: "start" | "end" | "center"
}

export const NavbarContent = forwardRef<"div", NavbarContentProps>(
  (props, ref) => {
    const { as, className, children, justify = "start", ...otherProps } = props

    const Component = as || "div"
    const domRef = useDomRef(ref)

    const { slots, classNames } = useNavbarContext()

    return (
      <Component
        ref={domRef}
        className={slots.content?.({
          className: cn(classNames?.content, className),
        })}
        data-justify={justify}
        {...otherProps}
      >
        {children}
      </Component>
    )
  },
)

NavbarContent.displayName = "NavbarContent"
