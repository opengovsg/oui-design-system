import type { VariantProps } from "tailwind-variants"

import { focusVisibleClasses } from "../utils"
import { tv } from "../utils/tv"

export const calendarStyles = tv({
  slots: {
    base: "relative inline-block max-w-full overflow-x-auto overflow-y-hidden rounded-sm shadow-sm",
    prevButton: "",
    nextButton: "",
    buttonGroup: "justify-self-end",
    header:
      "text-interaction-sub-active flex flex-wrap items-center justify-between",
    title: "",
    content: "",
    cell: [
      "text-base-content-default outside-month:text-interaction-support-disabled-content disabled:text-interaction-support-disabled-content unavailable:text-interaction-support-disabled-content unavailable:line-through unavailable:cursor-default my-0.5 flex cursor-pointer items-center justify-center rounded-full transition-colors duration-150 disabled:cursor-default",
      ...focusVisibleClasses,
    ],
    grid: "",
    calendar: "",
    gridWrapper: "flex flex-wrap gap-4",
    gridHeader: "",
    gridHeaderCell: "text-base-content-default",
    gridBody: "",
    yearSelector: "min-w-fit",
    monthSelector: "min-w-fit",
    yearList: "",
    monthList: "",
    selectorText: "text-interaction-sub-active",
    selectors: "flex flex-row gap-0.5",
  },
  variants: {
    variant: {},
    isMultipleMonths: {
      true: {
        cell: "outside-month:hidden",
      },
    },
    isSelected: {
      false: {
        cell: "not-unavailable:hover:bg-interaction-muted-main-hover not-unavailable:pressed:bg-interaction-muted-main-active",
      },
      true: {
        cell: "bg-interaction-main-default text-base-content-inverse invalid:bg-interaction-critical-default forced-colors:bg-[Highlight] forced-colors:text-[HighlightText] forced-colors:invalid:bg-[Mark]",
      },
    },
    size: {
      sm: {
        base: "px-2 py-2",
        gridHeaderCell: "prose-caption-1 w-10 p-2.5",
        header: "prose-subhead-2 min-h-10 px-4",
        cell: "prose-body-2 mx-auto h-9 w-9",
        monthSelector: "p-1",
        selectorText: "prose-subhead-2",
        yearSelector: "p-1",
        nextButton: "-mr-4",
        selectors: "-ml-2",
      },
      md: {
        base: "px-2 py-3",
        gridHeaderCell: "prose-subhead-2 w-11 p-3",
        header: "prose-subhead-1 min-h-11 px-4",
        cell: "prose-body-1 mx-auto h-10 w-10",
        monthSelector: "p-1",
        selectorText: "prose-subhead-1",
        yearSelector: "p-1",
        nextButton: "-mr-4",
        selectors: "-ml-1.5",
      },
    },
  },
  defaultVariants: {
    size: "sm",
  },
})

export type CalendarVariantProps = VariantProps<typeof calendarStyles>
export type CalendarSlots = keyof ReturnType<typeof calendarStyles>
