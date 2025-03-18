import type { VariantProps } from "tailwind-variants"

import { racFocusRing } from "../utils/classes"
import { tv } from "../utils/tv"

export const badgeCloseButtonStyles = tv({
  extend: racFocusRing,
})

export const badgeStyles = tv({
  slots: {
    base: "relative box-border inline-flex max-w-fit min-w-min items-center justify-between whitespace-nowrap",
    dot: "",
    content: "flex-1 text-inherit",
  },
  variants: {
    isCloseable: {
      true: "",
    },
    isDisabled: {
      true: { base: "opacity-disabled pointer-events-none" },
    },
    variant: {
      solid: {},
      subtle: {},
      outline: {},
      dot: {},
    },
    size: {
      xs: {},
      sm: {},
      md: {},
      lg: {},
    },
    color: {
      main: "",
      sub: "",
      success: "",
      warning: "",
      critical: "",
    },
    radius: {
      none: {
        base: "rounded-none",
      },
      sm: {
        base: "rounded-sm",
      },
      md: {
        base: "rounded-md",
      },
      lg: {
        base: "rounded-lg",
      },
      full: {
        base: "rounded-full",
      },
    },
  },
  defaultVariants: {
    variant: "solid",
    color: "main",
    size: "md",
    radius: "sm",
  },
})

export type BadgeVariantProps = VariantProps<typeof badgeStyles>
export type BadgeSlots = keyof typeof badgeStyles.slots
