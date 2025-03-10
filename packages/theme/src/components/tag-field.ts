import type { VariantProps } from "tailwind-variants"

import { tv } from "../utils/tv"

export const tagFieldStyles = tv({
  slots: {
    root: "flex flex-col gap-2",
    label: "",
    group: "flex-wrap gap-1 p-2",
    tag: "",
    input: "h-auto min-w-24 p-0",
    trigger: "",
    description: "",
    error: "",
    popover: "",
    list: "",
    listItem: "",
  },
  variants: {
    isDisabled: {
      true: {
        group: "",
      },
    },
    variant: {},
    size: {},
  },
  defaultVariants: {},
})

export type TagFieldVariantProps = VariantProps<typeof tagFieldStyles>
export type TagFieldSlots = keyof ReturnType<typeof tagFieldStyles>
