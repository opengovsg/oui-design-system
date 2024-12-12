import type { VariantProps } from "tailwind-variants"

import { tv } from "../utils/tv"

// TODO: Use typography from design system
// TODO: Use design tokens from design system
// TODO: Actually add theme

export const calendarStyles = tv({
  slots: {
    base: "",
    prevButton: "",
    nextButton: "",
    header: "",
    title: "",
    content: "",
    cell: "bg-red-500",
    cellButton: "",
    errorMessage: "",
  },
  variants: {
    variant: {},
    isSelected: {
      false: {
        cell: "pressed:bg-gray-200 dark:pressed:bg-zinc-600 text-zinc-900 hover:bg-gray-100 dark:text-zinc-200 dark:hover:bg-zinc-700",
      },
      true: {
        cell: "bg-blue-600 text-white invalid:bg-red-600 forced-colors:bg-[Highlight] forced-colors:text-[HighlightText] forced-colors:invalid:bg-[Mark]",
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
})

export type CalendarVariantProps = VariantProps<typeof calendarStyles>
export type CalendarSlots = keyof ReturnType<typeof calendarStyles>
