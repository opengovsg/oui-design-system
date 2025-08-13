"use client"

import type { HtmlUiProps } from "../system/types"
import { useDomRef } from "../system/react-utils"
import { forwardRef } from "../system/utils"

export interface PaginationCursorProps extends HtmlUiProps<"span"> {
  /**
   * The current active page.
   */
  activePage?: number
}

export const PaginationCursor = forwardRef<"span", PaginationCursorProps>(
  (props, ref) => {
    const { as, activePage, ...otherProps } = props

    const Component = as || "span"
    const domRef = useDomRef(ref)

    return (
      <Component ref={domRef} aria-hidden={true} {...otherProps}>
        {activePage}
      </Component>
    )
  },
)
