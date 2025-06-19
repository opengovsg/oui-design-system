import type { VariantProps } from "tailwind-variants"

import { tv } from "../utils/tv"

export const dateFieldStyles = tv({
  base: [],
  variants: {
    variant: {},
    size: {},
  },
  defaultVariants: {},
})

export type DateFieldVariantProps = VariantProps<typeof dateFieldStyles>
