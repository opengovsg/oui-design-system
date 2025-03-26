import type { VariantProps } from "tailwind-variants"

import { focusVisibleClasses } from "../utils"
import { tv } from "../utils/tv"

export const calendarStyles = tv({
  slots: {
    base: "relative isolate inline-block h-fit max-w-full overflow-y-hidden rounded-sm shadow-sm",
    prevButton: "",
    nextButton: "",
    buttonGroup: "justify-self-end",
    header:
      "text-interaction-sub-active flex flex-wrap items-center justify-between",
    title: "",
    content: "",
    cell: [
      "text-base-content-default outside-month:text-interaction-support-disabled-content disabled:text-interaction-support-disabled-content unavailable:text-interaction-support-disabled-content unavailable:line-through unavailable:cursor-default data-[highlighted=true]:border-utility-focus-default relative my-0.25 flex cursor-pointer items-center justify-center rounded-full border border-transparent transition-colors duration-150 disabled:cursor-default",
      ...focusVisibleClasses,
    ],
    grid: "",
    calendar: "",
    gridWrapper: "-m-1 flex gap-x-4 overflow-x-auto p-1 max-sm:block",
    gridHeader: "",
    gridHeaderCell: "text-base-content-default",
    gridBody: "",
    yearSelector: "min-w-fit",
    monthSelector: "min-w-fit",
    yearList: "",
    monthList: "",
    selectorText: "text-interaction-sub-active",
    selectors: "flex flex-row gap-0.5",
    bottomContentWrapper:
      "border-base-divider-medium flex flex-1 items-center justify-center border-t",
    todayButton: "",
    errorMessage: "",
  },
  variants: {
    variant: {},
    isRange: {
      true: {
        cell: "outside-month:before:hidden transition-none before:absolute before:inset-0 before:z-[-1] before:content-['']",
      },
    },
    isMultipleMonths: {
      true: {
        cell: "outside-month:hidden",
      },
    },
    isSelected: {
      true: "",
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
        bottomContentWrapper: "-mx-2 px-2 pt-2",
        calendar: "pb-2",
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
        bottomContentWrapper: "-mx-2 -mb-1 px-2 pt-2",
        calendar: "pb-3",
      },
    },
  },
  compoundVariants: [
    {
      isRange: false,
      isSelected: true,
      className: {
        cell: "bg-interaction-main-default text-base-content-inverse invalid:bg-interaction-critical-default forced-colors:bg-[Highlight] forced-colors:text-[HighlightText] forced-colors:invalid:bg-[Mark]",
      },
    },
    {
      isRange: false,
      isSelected: false,
      className: {
        cell: "not-unavailable:hover:bg-interaction-muted-main-hover not-unavailable:pressed:bg-interaction-muted-main-active",
      },
    },
    {
      isRange: true,
      isSelected: true,
      className: {
        cell: "selection-start:not-data-[range-end=true]:before:rounded-s-full selection-start:data-[range-end=true]:before:rounded-e-sm selection-end:before:w-[50%] selection-end:rounded-full selection-start:rounded-full selection-start:bg-interaction-main-default selection-start:text-base-content-inverse selection-end:bg-interaction-main-default selection-end:text-base-content-inverse before:bg-interaction-muted-main-active selection-start:before:ms-0 selection-end:before:me-0 selection-end:not-selection-start:data-[range-start=true]:before:rounded-s-sm selection-start:data-[range-end=true]:before:w-[50%] selection-start:data-[range-end=true]:before:left-[50%] before:-mx-1 data-[range-end=true]:before:me-0 data-[range-end=true]:before:rounded-e-sm data-[range-start=true]:before:ms-0 data-[range-start=true]:before:rounded-s-sm",
      },
    },
  ],
  defaultVariants: {
    size: "sm",
  },
})

export type CalendarVariantProps = VariantProps<typeof calendarStyles>
export type CalendarSlots = keyof ReturnType<typeof calendarStyles>
