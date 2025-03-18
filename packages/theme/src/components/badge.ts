import type { VariantProps } from "tailwind-variants"

import { cn } from "../utils"
import { racFocusRing } from "../utils/classes"
import { tv } from "../utils/tv"
import { colorVariants, colorVariantsWithState } from "../utils/variants"

export const badgeCloseButtonStyles = tv({
  extend: racFocusRing,
  base: cn(
    colorVariantsWithState.clear.neutral,
    "inline-flex cursor-pointer items-center justify-center rounded-full text-inherit transition",
  ),
  variants: {
    size: {
      xs: "size-3",
      sm: "size-4",
      md: "size-4",
    },
  },
  defaultVariants: {
    size: "sm",
  },
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
      true: { base: "pointer-events-none opacity-60" },
    },
    variant: {
      solid: {},
      subtle: {},
      outline: {
        base: "border",
      },
      dot: {
        base: "text-base-content-default",
        dot: "mr-1 rounded-full",
      },
    },
    size: {
      xs: {
        base: "prose-legal h-5 gap-1 px-2 py-1",
        dot: "size-1.5",
      },
      sm: {
        base: "prose-caption-1 h-6 gap-1 px-2 py-1",
        dot: "size-2",
      },
      md: {
        base: "prose-body-2 h-7 gap-1 px-2.5 py-1",
        dot: "size-2",
      },
    },
    color: {
      main: "",
      sub: "",
      success: "",
      neutral: "",
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
  compoundVariants: [
    // solid / color
    {
      variant: "solid",
      color: "main",
      className: {
        base: colorVariants.solid.main,
      },
    },
    {
      variant: "solid",
      color: "sub",
      className: {
        base: colorVariants.solid.sub,
      },
    },
    {
      variant: "solid",
      color: "neutral",
      className: {
        base: colorVariants.solid.neutral,
      },
    },
    {
      variant: "solid",
      color: "critical",
      className: {
        base: colorVariants.solid.critical,
      },
    },
    {
      variant: "solid",
      color: "warning",
      className: {
        base: colorVariants.solid.warning,
      },
    },
    {
      variant: "solid",
      color: "success",
      className: {
        base: colorVariants.solid.success,
      },
    },
    // subtle / color
    {
      variant: "subtle",
      color: "main",
      className: {
        base: "bg-interaction-main-subtle-default text-interaction-main-default",
      },
    },
    {
      variant: "subtle",
      color: "sub",
      className: {
        base: "bg-interaction-sub-subtle-default text-interaction-sub-default",
      },
    },
    {
      variant: "subtle",
      color: "neutral",
      className: {
        base: "bg-interaction-neutral-subtle-default text-base-content-default",
      },
    },
    {
      variant: "subtle",
      color: "success",
      className: {
        base: "bg-interaction-success-subtle-default text-interaction-success-active",
      },
    },
    {
      variant: "subtle",
      color: "warning",
      className: {
        base: "bg-interaction-warning-subtle-default text-utility-feedback-warning-strong",
      },
    },
    {
      variant: "subtle",
      color: "critical",
      className: {
        base: "bg-interaction-critical-subtle-default text-interaction-critical-default",
      },
    },
    // outline / color
    {
      variant: "outline",
      color: "main",
      className: {
        base: "bg-interaction-main-subtle-default text-interaction-main-default border-interaction-main-subtle-hover",
      },
    },
    {
      variant: "outline",
      color: "sub",
      className: {
        base: "bg-interaction-sub-subtle-default text-interaction-sub-default border-interaction-sub-subtle-hover",
      },
    },
    {
      variant: "outline",
      color: "neutral",
      className: {
        base: "bg-interaction-neutral-subtle-default text-base-content-default border-interaction-neutral-subtle-hover",
      },
    },
    {
      variant: "outline",
      color: "success",
      className: {
        base: "bg-interaction-success-subtle-default text-interaction-success-active border-interaction-success-subtle-hover",
      },
    },
    {
      variant: "outline",
      color: "warning",
      className: {
        base: "bg-interaction-warning-subtle-default text-utility-feedback-warning-strong border-interaction-warning-hover",
      },
    },
    {
      variant: "outline",
      color: "critical",
      className: {
        base: "bg-interaction-critical-subtle-default text-interaction-critical-default border-interaction-critical-subtle-hover",
      },
    },
    // dot / color
    {
      variant: "dot",
      color: "main",
      className: {
        dot: "bg-interaction-main-default",
      },
    },
    {
      variant: "dot",
      color: "sub",
      className: {
        dot: "bg-interaction-sub-default",
      },
    },
    {
      variant: "dot",
      color: "neutral",
      className: {
        dot: "bg-interaction-neutral-default",
      },
    },
    {
      variant: "dot",
      color: "critical",
      className: {
        dot: "bg-interaction-critical-default",
      },
    },
    {
      variant: "dot",
      color: "warning",
      className: {
        dot: "bg-interaction-warning-default",
      },
    },
    {
      variant: "dot",
      color: "success",
      className: {
        dot: "bg-interaction-success-default",
      },
    },
  ],
  defaultVariants: {
    variant: "solid",
    color: "main",
    size: "sm",
    radius: "sm",
  },
})

export type BadgeVariantProps = VariantProps<typeof badgeStyles>
export type BadgeSlots = keyof typeof badgeStyles.slots
