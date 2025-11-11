import type { VariantProps } from "tailwind-variants"

import { tv } from "../utils/tv"

export const numberFieldStyles = tv({
  base: [],
  variants: {
    variant: {},
    size: {},
  },
  defaultVariants: {},
})

export type NumberFieldVariantProps = VariantProps<typeof numberFieldStyles>
