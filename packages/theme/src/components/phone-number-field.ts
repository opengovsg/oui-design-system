import type { VariantProps } from "tailwind-variants"

import { tv } from "../utils/tv"

export const phoneNumberFieldStyles = tv({
  base: [],
  variants: {
    variant: {},
    size: {},
  },
  defaultVariants: {},
})

export type PhoneNumberFieldVariantProps = VariantProps<typeof phoneNumberFieldStyles>
