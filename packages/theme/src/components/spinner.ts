import type { VariantProps } from "tailwind-variants"

import { tv } from "../utils/tv"

// TODO: Use typography from design system
// TODO: Use design tokens from design system
// TODO: Add more color schemes

export const spinnerStyles = tv({
  slots: {
    base: "relative inline-flex flex-col items-center justify-center gap-2",
    wrapper: "relative flex",
    circle1: [
      "absolute",
      "w-full",
      "h-full",
      "rounded-full",
      "animate-spinner-ease-spin",
      "border-2",
      "border-solid",
      "border-t-transparent",
      "border-l-transparent",
      "border-r-transparent",
    ],
    circle2: [
      "absolute",
      "w-full",
      "h-full",
      "rounded-full",
      "opacity-75",
      "animate-spinner-linear-spin",
      "border-2",
      "border-dotted",
      "border-t-transparent",
      "border-l-transparent",
      "border-r-transparent",
    ],
  },
  variants: {
    size: {
      xs: {
        wrapper: "h-4 w-4",
        circle1: "border-2",
        circle2: "border-2",
      },
      sm: {
        wrapper: "h-5 w-5",
        circle1: "border-2",
        circle2: "border-2",
      },
      md: {
        wrapper: "h-8 w-8",
        circle1: "border-3",
        circle2: "border-3",
      },
      lg: {
        wrapper: "h-10 w-10",
        circle1: "border-3",
        circle2: "border-3",
      },
    },
    color: {
      current: {
        circle1: "border-b-current",
        circle2: "border-b-current",
      },
      white: {
        circle1: "border-b-white",
        circle2: "border-b-white",
      },
    },
  },
  defaultVariants: {
    size: "md",
    color: "current",
  },
})

export type SpinnerVariantProps = VariantProps<typeof spinnerStyles>
export type SpinnerSlots = keyof ReturnType<typeof spinnerStyles>
