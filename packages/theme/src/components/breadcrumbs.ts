import type { VariantProps } from "tailwind-variants"

import { tv } from "../utils/tv"

export const breadcrumbsStyles = tv({
  base: [],
  variants: {
    variant: {},
    size: {},
  },
  defaultVariants: {},
})

export type BreadcrumbsVariantProps = VariantProps<typeof breadcrumbsStyles>
