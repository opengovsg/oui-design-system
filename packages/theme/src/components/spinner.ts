import type { VariantProps } from "tailwind-variants";
import { tv } from "../utils/tv";

// TODO: Use typography from design system
// TODO: Use design tokens from design system
// TODO: Add more color schemes

export const spinnerStyles = tv({
  slots: {
    base: "relative inline-flex flex-col gap-2 items-center justify-center",
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
      sm: {
        wrapper: "w-5 h-5",
        circle1: "border-2",
        circle2: "border-2",
      },
      md: {
        wrapper: "w-8 h-8",
        circle1: "border-3",
        circle2: "border-3",
      },
      lg: {
        wrapper: "w-10 h-10",
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
});

export type SpinnerVariantProps = VariantProps<typeof spinnerStyles>;
export type SpinnerSlots = keyof ReturnType<typeof spinnerStyles>;
