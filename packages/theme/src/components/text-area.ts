import type { VariantProps } from "tailwind-variants"

import { tv } from "../utils/tv"
import { inputStyles } from "./input"

export const textAreaStyles = tv({
  extend: inputStyles,
  base: [],
  variants: {
    variant: {},
    size: {
      xs: "h-auto",
      sm: "h-auto",
      md: "h-auto",
    },
  },
  defaultVariants: {},
})

export type TextAreaVariantProps = VariantProps<typeof textAreaStyles>
