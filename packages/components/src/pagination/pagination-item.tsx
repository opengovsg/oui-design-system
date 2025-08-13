import type { UsePaginationItemProps } from "./use-pagination-item"
import { forwardRef } from "../system/utils"
import { usePaginationItem } from "./use-pagination-item"

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface PaginationItemProps extends UsePaginationItemProps {}

export const PaginationItem = forwardRef<"li", PaginationItemProps>(
  (props, ref) => {
    const { Component, children, getItemProps } = usePaginationItem({
      ...props,
      ref,
    })

    return <Component {...getItemProps()}>{children}</Component>
  },
)
