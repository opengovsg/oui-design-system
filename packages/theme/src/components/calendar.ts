import type { VariantProps } from "tailwind-variants"

import { focusVisibleClasses } from "../utils"
import { tv } from "../utils/tv"

// TODO: Use typography from design system
// TODO: Use design tokens from design system
// TODO: Actually add theme

export const calendarStyles = tv({
  slots: {
    base: "relative inline-block w-fit max-w-full overflow-x-auto overflow-y-hidden rounded-sm shadow-sm",
    prevButton: "",
    nextButton: "",
    header: "flex items-center justify-between",
    title: "",
    content: "",
    cell: [
      "text-base-content-default disabled:text-interaction-support-disabled-content my-0.5 flex cursor-pointer items-center justify-center rounded-full disabled:cursor-default",
      ...focusVisibleClasses,
    ],
    cellButton: "",
    errorMessage: "",
    gridHeader: "",
    gridHeaderCell: "text-base-content-default",
  },
  variants: {
    variant: {},
    isSelected: {
      false: {
        cell: "pressed:bg-interaction-muted-main-active hover:bg-interaction-muted-main-hover text-zinc-900",
      },
      true: {
        cell: "bg-interaction-main-default text-base-content-inverse invalid:bg-interaction-critical-default forced-colors:bg-[Highlight] forced-colors:text-[HighlightText] forced-colors:invalid:bg-[Mark]",
      },
    },
    size: {
      sm: {
        base: "px-2 py-2",
        gridHeaderCell: "prose-caption-1 w-11 p-2.5",
        header: "prose-subhead-2 px-4",
        cell: "prose-body-2 mx-auto h-10 w-10",
      },
      md: {
        base: "px-2 py-3",
        gridHeaderCell: "prose-subhead-2 w-[52px] p-3",
        header: "prose-subhead-2 px-4",
        cell: "prose-body-1 mx-auto h-11 w-11",
      },
    },
  },
  compoundVariants: [],
  compoundSlots: [
    {
      slots: ["prevButton", "nextButton"],
      class: "",
    },
  ],
  defaultVariants: {
    size: "md",
  },
})

export type CalendarVariantProps = VariantProps<typeof calendarStyles>
export type CalendarSlots = keyof ReturnType<typeof calendarStyles>
