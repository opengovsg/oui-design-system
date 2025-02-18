import type { VariantProps } from "tailwind-variants"

import { tv } from "../utils/tv"

export const inputStyles = tv({
  base: [],
  variants: {
    variant: {},
    size: {},
  },
  defaultVariants: {},
})

export type InputVariantProps = VariantProps<typeof inputStyles>
