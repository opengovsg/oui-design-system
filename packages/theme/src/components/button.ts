import type { VariantProps } from "tailwind-variants"

import { cn, focusVisibleClasses } from "../utils"
import { tv } from "../utils/tv"
import { colorVariants } from "../utils/variants"

export const buttonStyles = tv({
  base: cn(
    "group relative box-border inline-flex h-full min-w-max cursor-pointer items-center justify-center overflow-hidden rounded text-center transition",
    focusVisibleClasses,
  ),
  variants: {
    layout: {
      stretch: "w-full",
      default: "",
    },
    variant: {
      solid: "",
      reverse: "",
      outline: "",
      clear: "",
      unstyled: "",
    },
    color: {
      main: "",
      success: "",
      warning: "",
      critical: "",
      sub: "",
      neutral: "",
      inverse: "",
    },
    radius: {
      none: "rounded-none",
      sm: "rounded-sm",
      default: "rounded",
      md: "rounded-md",
      lg: "rounded-lg",
      full: "rounded-full",
    },
    isFocusVisible: {
      true: "",
    },
    isDisabled: {
      true: "cursor-not-allowed",
    },
    isIconOnly: {
      true: "!gap-0 px-0",
      false: "[&>svg]:max-w-[theme(spacing.8)]",
    },
    size: {
      xs: "prose-subhead-2 h-9 min-w-16 gap-2 px-4 py-2",
      sm: "prose-subhead-1 h-10 min-w-20 gap-2 px-4 py-2",
      md: "prose-subhead-1 h-11 min-w-24 gap-3 px-4 py-2.5",
      lg: "prose-subhead-1 h-14 min-w-28 gap-3 px-4 py-4",
    },
  },
  compoundVariants: [
    // solid / color
    {
      variant: "solid",
      color: "main",
      className: colorVariants.solid.main,
    },
    {
      variant: "solid",
      color: "sub",
      className: colorVariants.solid.sub,
    },
    {
      variant: "solid",
      color: "neutral",
      className: colorVariants.solid.neutral,
    },
    {
      variant: "solid",
      color: "critical",
      className: colorVariants.solid.critical,
    },
    {
      variant: "solid",
      color: "warning",
      className: colorVariants.solid.warning,
    },
    {
      variant: "solid",
      color: "success",
      className: colorVariants.solid.success,
    },
    // reverse / color
    {
      variant: "reverse",
      color: "main",
      className: colorVariants.reverse.main,
    },
    {
      variant: "reverse",
      color: "critical",
      className: colorVariants.reverse.critical,
    },
    {
      variant: "reverse",
      color: "sub",
      className: colorVariants.reverse.sub,
    },
    {
      variant: "reverse",
      color: "neutral",
      className: colorVariants.reverse.neutral,
    },
    // outline / color
    {
      variant: "outline",
      color: "main",
      className: colorVariants.outline.main,
    },
    {
      variant: "outline",
      color: "critical",
      className: colorVariants.outline.critical,
    },
    {
      variant: "outline",
      color: "neutral",
      className: colorVariants.outline.neutral,
    },
    {
      variant: "outline",
      color: "sub",
      className: colorVariants.outline.sub,
    },
    {
      variant: "outline",
      color: "inverse",
      className: colorVariants.outline.inverse,
    },
    // clear / color
    {
      variant: "clear",
      color: "main",
      className: colorVariants.clear.main,
    },
    {
      variant: "clear",
      color: "critical",
      className: colorVariants.clear.critical,
    },
    {
      variant: "clear",
      color: "neutral",
      className: colorVariants.clear.neutral,
    },
    {
      variant: "clear",
      color: "sub",
      className: colorVariants.clear.sub,
    },
    {
      variant: "clear",
      color: "inverse",
      className: colorVariants.clear.inverse,
    },
    // iconbutton / size
    {
      isIconOnly: true,
      size: "lg",
      class: "h-12 w-12 min-w-12 p-3 [&_svg]:h-6 [&_svg]:w-6",
    },
    {
      isIconOnly: true,
      size: "md",
      class: "h-11 w-11 min-w-11 p-3 [&_svg]:h-5 [&_svg]:w-5",
    },
    {
      isIconOnly: true,
      size: "sm",
      class: "h-10 w-10 min-w-10 p-2.5 [&_svg]:h-5 [&_svg]:w-5",
    },
    {
      isIconOnly: true,
      size: "xs",
      class: "h-9 w-9 min-w-9 p-2.5 [&_svg]:h-4 [&_svg]:w-4",
    },
  ],
  defaultVariants: {
    variant: "solid",
    color: "main",
    size: "md",
    radius: "default",
  },
})

export type ButtonVariantProps = VariantProps<typeof buttonStyles>
