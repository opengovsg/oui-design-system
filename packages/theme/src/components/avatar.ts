import type { VariantProps } from "tailwind-variants"

import { tv } from "../utils/tv"

export const avatarStyles = tv({
  base: [],
  variants: {
    variant: {},
    size: {},
  },
  defaultVariants: {},
})

export type AvatarVariantProps = VariantProps<typeof avatarStyles>
