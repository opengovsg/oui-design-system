import type { VariantProps } from "tailwind-variants"

import { tv } from "../utils/tv"

export const datePickerStyles = tv({
  slots: {
    base: "group isolate flex flex-col gap-1",
    group: "",
    input: "flex-1",
    dialog: "flex",
    selectorButton: "group-focus-within:",
    calendarButton: "z-1 -m-px text-inherit -outline-offset-1",
  },
  variants: {
    variant: {},
    size: {
      xs: {
        group: "h-9",
        input: "px-3 py-2",
      },
      sm: {
        group: "h-10",
        input: "px-3 py-2.5",
      },
      md: {
        group: "h-11",
        input: "px-4 py-2.5",
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
})

export type DatePickerSlots = keyof ReturnType<typeof datePickerStyles>
export type DatePickerVariantProps = VariantProps<typeof datePickerStyles>
