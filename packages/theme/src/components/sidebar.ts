import type { VariantProps } from "tailwind-variants"

import { tv } from "../utils/tv"

export const sidebarStyles = tv({
  slots: {
    item: "",
    section: "",
    header: "",
    list: "",
    label: "",
    chevron: "",
  },
  variants: {
    variant: {},
    size: {},
    isNested: {
      true: {},
    },
  },
  defaultVariants: {},
})

export type SidebarVariantProps = VariantProps<typeof sidebarStyles>
