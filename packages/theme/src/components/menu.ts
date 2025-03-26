import type { VariantProps } from "tailwind-variants"

import { tv } from "../utils/tv"

export const menuStyles = tv({
  base: [],
  variants: {
    variant: {},
    size: {},
  },
  defaultVariants: {},
})

export type MenuVariantProps = VariantProps<typeof menuStyles>
