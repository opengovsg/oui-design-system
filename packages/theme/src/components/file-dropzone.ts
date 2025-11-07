import type { VariantProps } from "tailwind-variants"

import { tv } from "../utils/tv"

export const fileDropzoneStyles = tv({
  base: [],
  variants: {
    variant: {},
    size: {},
  },
  defaultVariants: {},
})

export type FileDropzoneVariantProps = VariantProps<typeof fileDropzoneStyles>
