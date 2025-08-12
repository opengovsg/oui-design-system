import type { VariantProps } from "tailwind-variants"

import { tv } from "../utils/tv"
import { inputStyles } from "./input"

export const dateInputStyles = tv({
  slots: {
    base: "block min-w-[150px]",
    segment:
      "type-literal:px-0 inline rounded-xs p-0.5 caret-transparent outline-0",
  },
  variants: {
    variant: {},
    isPlaceholder: {
      true: {
        segment: "text-interaction-support-placeholder",
      },
      false: {
        segment: "text-base-content-default",
      },
    },
    isDisabled: {
      true: {
        segment: "text-interaction-support-disabled-content",
      },
    },
    isFocused: {
      true: {
        segment: "bg-interaction-main-default text-white dark:text-white",
      },
    },
    size: {
      xs: {
        base: "prose-body-2 placeholder:prose-subhead-5 max-sm:prose-body-1",
      },
      sm: {
        base: "prose-body-2 max-sm:prose-body",
      },
      md: {
        base: "prose-body-1",
      },
    },
  },
})

export type DateInputSlots = keyof ReturnType<typeof dateInputStyles>
export type DateInputVariantProps = VariantProps<typeof dateInputStyles>

export const dateFieldStyles = tv({
  extend: inputStyles,
})

export type DateFieldVariantProps = VariantProps<typeof dateFieldStyles>
