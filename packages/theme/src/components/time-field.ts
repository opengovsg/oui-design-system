import type { VariantProps } from "tailwind-variants"

import { tv } from "../utils/tv"

export const timeFieldStyles = tv({
  base: [],
  variants: {
    variant: {},
    size: {},
  },
  defaultVariants: {},
})

export type TimeFieldVariantProps = VariantProps<typeof timeFieldStyles>
