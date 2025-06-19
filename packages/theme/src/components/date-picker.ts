import type { VariantProps } from "tailwind-variants"

import { tv } from "../utils/tv"

export const datePickerStyles = tv({
  base: [],
  variants: {
    variant: {},
    size: {},
  },
  defaultVariants: {},
})

export type DatePickerVariantProps = VariantProps<typeof datePickerStyles>
