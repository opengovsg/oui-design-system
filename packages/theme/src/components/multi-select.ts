import type { VariantProps } from "tailwind-variants"

import { tv } from "../utils/tv"

export const multiSelectStyles = tv({
  base: [],
  variants: {
    variant: {},
    size: {},
  },
  defaultVariants: {},
})

export type MultiSelectVariantProps = VariantProps<typeof multiSelectStyles>
