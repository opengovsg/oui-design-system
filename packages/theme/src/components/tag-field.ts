import type { VariantProps } from "tailwind-variants"

import { tv } from "../utils/tv"

export const tagFieldStyles = tv({
  base: [],
  variants: {
    variant: {},
    size: {},
  },
  defaultVariants: {},
})

export type TagFieldVariantProps = VariantProps<typeof tagFieldStyles>
