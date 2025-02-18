import type { VariantProps } from "tailwind-variants"

import { tv } from "../utils/tv"

export const comboBoxStyles = tv({
  base: [],
  variants: {
    variant: {},
    size: {},
  },
  defaultVariants: {},
})

export type ComboBoxVariantProps = VariantProps<typeof comboBoxStyles>
