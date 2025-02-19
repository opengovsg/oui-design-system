import type { VariantProps } from "tailwind-variants"

import { tv } from "../utils/tv"
import { inputStyles } from "./input"

export const comboBoxStyles = tv({
  slots: {
    container: "group flex flex-col gap-2",
    group: "",
    expandButton: "h-full cursor-pointer",
    expandIcon: "",
    field: "h-full w-full outline-hidden",
  },
  base: [],
  variants: {
    variant: {},
    isDisabled: {
      true: {
        expandButton: "cursor-default",
      },
    },
    size: {
      xs: {
        group: inputStyles.variants.size.xs,
      },
      sm: {
        group: inputStyles.variants.size.sm,
        expandIcon: "h-4 w-4",
      },
      md: {
        group: [inputStyles.variants.size.md, "gap-1 px-4"],
        expandButton: "-my-2 -mr-4 h-10 px-4",
        expandIcon: "h-5 w-5",
      },
      lg: {
        group: inputStyles.variants.size.lg,
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
})

export type ComboBoxVariantProps = VariantProps<typeof comboBoxStyles>
export type ComboBoxSlots = keyof ReturnType<typeof comboBoxStyles>
