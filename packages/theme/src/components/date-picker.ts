import type { VariantProps } from "tailwind-variants"

import { tv } from "../utils/tv"

export const datePickerStyles = tv({
  slots: {
    base: "group isolate flex w-full flex-col gap-1",
    group: "",
    input: "h-auto flex-1",
    dialog: "flex",
    selectorIcon: "",
    calendarButton: "z-1 -m-px text-inherit -outline-offset-1",
  },
  variants: {
    variant: {},
    size: {
      xs: {},
      sm: {},
      md: {},
    },
  },
  defaultVariants: {
    size: "md",
  },
})

export type DatePickerSlots = keyof ReturnType<typeof datePickerStyles>
export type DatePickerVariantProps = VariantProps<typeof datePickerStyles>
