import type { VariantProps } from "tailwind-variants"

import { tv } from "../utils/tv"

export const labelStyles = tv({
  base: "text-base-content-strong flex w-fit cursor-default flex-col",
  variants: {
    size: {
      xs: "prose-subhead-2",
      sm: "prose-subhead-2",
      md: "prose-subhead-1",
    },
  },
  defaultVariants: {
    size: "md",
  },
})

export type LabelVariantProps = VariantProps<typeof labelStyles>

export const descriptionStyles = tv({
  base: "text-base-content-medium",
  variants: {
    size: {
      xs: "prose-body-2",
      sm: "prose-body-2",
      md: "prose-body-2",
    },
  },
  defaultVariants: {
    size: "md",
  },
})

export type DescriptionVariantProps = VariantProps<typeof descriptionStyles>

export const fieldErrorStyles = tv({
  slots: {
    icon: "",
    text: "text-utility-feedback-critical flex flex-row flex-wrap items-center gap-2",
  },
  variants: {
    size: {
      xs: { text: "prose-body-2", icon: "h-4 w-4" },
      sm: { text: "prose-body-2", icon: "h-4 w-4" },
      md: { text: "prose-body-2", icon: "h-4 w-4" },
    },
  },
  defaultVariants: {
    size: "md",
  },
})

export type FieldErrorVariantProps = VariantProps<typeof fieldErrorStyles>
export type FieldErrorSlots = keyof ReturnType<typeof fieldErrorStyles>

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
