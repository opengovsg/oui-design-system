import type { VariantProps } from "tailwind-variants"

import { tv } from "../utils/tv"
import { inputStyles } from "./input"

export const dateSegmentStyles = tv({
  base: "type-literal:px-0 inline rounded-xs p-0.5 caret-transparent outline-0",
  variants: {
    variant: {},
    isEditable: {
      true: {},
      false: "text-interaction-support-placeholder",
    },
    isPlaceholder: {
      true: "text-interaction-support-placeholder",
    },
    isDisabled: {
      true: "text-interaction-support-disabled-content",
    },
    isFocused: {
      true: "bg-interaction-main-default text-white dark:text-white",
    },
  },
  compoundVariants: [
    {
      isPlaceholder: false,
      isEditable: true,
      isFocused: false,
      className: "text-base-content-default",
    },
  ],
})

export type DateSegmentVariantProps = VariantProps<typeof dateSegmentStyles>

export const dateInputStyles = tv({
  extend: inputStyles,
  variants: {
    isDisabled: {
      true: "",
    },
    // Override y padding since this input is actually a wrapper around the segments
    size: {
      xs: "py-1.75",
      sm: "py-2.25",
      md: "py-2.25",
    },
  },
  base: "focus-within:border-utility-focus-default focus-within:shadow-[0_0_0_1px]",
})

export type DateInputVariantProps = VariantProps<typeof dateInputStyles>
