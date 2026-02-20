import type { VariantProps } from "tailwind-variants"

import { tv } from "../utils/tv"

export const infoboxStyles = tv({
  slots: {
    base: "flex items-start gap-2 rounded-sm",
    icon: "shrink-0",
  },
  variants: {
    variant: {
      info: {
        base: "bg-utility-feedback-info-subtle",
        icon: "text-utility-feedback-info",
      },
      warning: {
        base: "bg-utility-feedback-warning-subtle",
        icon: "text-utility-feedback-warning",
      },
      error: {
        base: "bg-utility-feedback-critical-subtle",
        icon: "text-utility-feedback-critical",
      },
      success: {
        base: "bg-utility-feedback-success-subtle",
        icon: "text-utility-feedback-success",
      },
    },
    size: {
      sm: {
        base: "prose-body-2 px-2.5 py-2",
        icon: "h-5 w-4",
      },
      md: {
        base: "prose-body-1 p-4",
        icon: "size-6",
      },
    },
  },
  defaultVariants: {
    variant: "info",
    size: "md",
  },
})

export type InfoboxVariantProps = VariantProps<typeof infoboxStyles>
export type InfoboxSlots = keyof typeof infoboxStyles.slots
