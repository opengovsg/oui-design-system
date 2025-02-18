import type { VariantProps } from "tailwind-variants"

import { tv } from "../utils/tv"

export const textFieldStyles = tv({
  base: [],
  variants: {
    variant: {},
    size: {},
  },
  defaultVariants: {},
})

export type TextFieldVariantProps = VariantProps<typeof textFieldStyles>
