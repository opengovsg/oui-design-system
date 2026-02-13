import type { VariantProps } from "tailwind-variants"

import { tv } from "../utils/tv"

export const tooltipStyles = tv({
  base: [],
  variants: {
    variant: {},
    size: {},
  },
  defaultVariants: {},
})

export type TooltipVariantProps = VariantProps<typeof tooltipStyles>
