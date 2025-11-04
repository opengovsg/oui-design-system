import type { VariantProps } from "tailwind-variants"

import { tv } from "../utils/tv"

export const dateRangePickerStyles = tv({
  slots: {
    dateWrapper: "inline-flex flex-1 items-center overflow-x-auto",
    startInput: "min-w-fit flex-0",
    endInput: "min-w-fit flex-0",
    base: "group isolate flex flex-col gap-1",
    group:
      "group-disabled:text-interaction-support-disabled-content text-base-content-default",
    dialog: "flex",
    calendarButton: "z-1 -m-px text-inherit -outline-offset-1",
    connector: "",
  },
  variants: {
    variant: {},
    size: {
      xs: {
        group: "h-9",
        dateWrapper: "px-3 py-2",
        startInput: "pe-1.5",
        endInput: "ps-1.5",
        connector:
          "prose-body-2 placeholder:prose-subhead-5 max-sm:prose-body-1",
      },
      sm: {
        group: "h-10",
        dateWrapper: "px-3 py-2.5",
        startInput: "pe-1.5",
        endInput: "ps-1.5",
        connector: "prose-body-2 max-sm:prose-body",
      },
      md: {
        group: "h-11",
        dateWrapper: "px-4 py-2.5",
        startInput: "pe-2",
        endInput: "ps-2",
        connector: "prose-body-1",
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
})

export type DateRangePickerSlots = keyof ReturnType<
  typeof dateRangePickerStyles
>
export type DateRangePickerVariantProps = VariantProps<
  typeof dateRangePickerStyles
>
