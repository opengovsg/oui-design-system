import type { VariantProps } from "tailwind-variants"

import { tv } from "../utils/tv"

export const checkboxStyles = tv({
  base: [],
  variants: {
    variant: {},
    size: {},
  },
  defaultVariants: {},
})

export type CheckboxVariantProps = VariantProps<typeof checkboxStyles>
