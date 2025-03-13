import type { VariantProps } from "tailwind-variants"

import { tv } from "../utils/tv"

export const labelStyles = tv({
  base: "text-base-content-strong w-fit cursor-default",
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
