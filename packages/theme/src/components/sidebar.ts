import type { VariantProps } from "tailwind-variants"

import { tv } from "../utils/tv"

export const sidebarStyles = tv({
  slots: {
    base: "",
    ul: "",
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
    isExpanded: {
      true: {},
    },
    isDisabled: {
      true: {},
    },
    isNested: {
      true: {},
    },
  },
  defaultVariants: {},
})

export type SidebarVariantProps = VariantProps<typeof sidebarStyles>
export type SidebarSlots = keyof ReturnType<typeof sidebarStyles>
