import type { VariantProps } from "tailwind-variants"

import { tv } from "../utils/tv"

export const fieldBorderStyles = tv({
  variants: {
    variant: {
      outline: "",
    },
    isFocusWithin: {
      true: "",
    },
    isInvalid: {
      true: "",
    },
    isDisabled: {
      true: "",
    },
  },
  compoundVariants: [
    {
      variant: "outline",
      isFocusWithin: true,
      className:
        "border-utility-focus-default shadow-utility-focus-default shadow-[0_0_0_1px]",
    },
    {
      variant: "outline",
      isFocusWithin: false,
      className: "border-base-divider-strong",
    },
    {
      variant: "outline",
      isInvalid: true,
      isFocusWithin: false,
      className: "border-interaction-critical-default",
    },
  ],
})

export const fieldGroupStyles = tv({
  extend: fieldBorderStyles,
  base: "group flex items-center rounded-sm border bg-white not-motion-reduce:transition-shadow",
  variants: {
    isDisabled: {
      true: "bg-interaction-support-disabled text-interaction-support-disabled-content",
    },
  },
  defaultVariants: {
    variant: "outline",
  },
})

export type FieldVariantProps = VariantProps<typeof fieldGroupStyles>
export type FieldSlots = keyof ReturnType<typeof fieldGroupStyles>
