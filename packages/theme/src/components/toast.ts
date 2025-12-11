import type { VariantProps } from "tailwind-variants"

import { tv } from "../utils/tv"

export const toastStyles = tv({
  base: [],
  variants: {
    variant: {},
    size: {},
  },
  defaultVariants: {},
})

export type ToastVariantProps = VariantProps<typeof toastStyles>
