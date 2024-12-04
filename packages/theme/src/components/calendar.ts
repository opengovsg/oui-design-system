import type { VariantProps } from "tailwind-variants";
import { tv } from "../utils/tv";

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
        cell: "text-zinc-900 dark:text-zinc-200 hover:bg-gray-100 dark:hover:bg-zinc-700 pressed:bg-gray-200 dark:pressed:bg-zinc-600",
      },
      true: {
        cell: "bg-blue-600 invalid:bg-red-600 text-white forced-colors:bg-[Highlight] forced-colors:invalid:bg-[Mark] forced-colors:text-[HighlightText]",
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
});

export type CalendarVariantProps = VariantProps<typeof calendarStyles>;
export type CalendarSlots = keyof ReturnType<typeof calendarStyles>;
