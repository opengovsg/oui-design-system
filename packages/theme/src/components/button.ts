import { VariantProps } from "tailwind-variants";
import { dataFocusVisibleClasses } from "../utils/classes";
import { tv } from "../utils/tv";

export const buttonStyles = tv({
  base: [
    "group",
    "inline-flex",
    "items-center",
    "justify-center",
    "box-border",
    "h-full",
    "min-w-max",
    "cursor-pointer",
    "rounded",
    "text-center",
    "transition",
    "overflow-hidden",
    "relative",
    ...dataFocusVisibleClasses,
  ],
  variants: {
    variant: {
      solid: "",
      outline: "",
      unstyled: "",
    },
    colorScheme: {
      default: "",
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
      true: "px-0 !gap-0",
      false: "[&>svg]:max-w-[theme(spacing.8)]",
    },
    size: {
      md: "prose-headline-base-medium min-h-12 px-5 py-3 gap-2",
      lg: "prose-headline-lg-medium min-h-[3.25rem] px-6 py-3.5 gap-3",
    },
  },
  compoundVariants: [
    {
      variant: "solid",
      colorScheme: "default",
      className:
        "bg-primary hover:bg-primary-hover text-content-fg disabled:bg-system-disabled",
    },
    {
      variant: "solid",
      colorScheme: "inverse",
      className: "bg-base-canvas text-base-content",
    },
    {
      variant: "outline",
      colorScheme: "inverse",
      className:
        "border border-base-divider-inverse text-content-fg hover:bg-base-canvas-inverse-overlay/80 hover:text-content-fg",
    },
    {
      variant: "outline",
      colorScheme: "default",
      className: "border border-brand-canvas-inverse text-brand-canvas-inverse",
    },
    {
      variant: "outline",
      size: "lg",
      // -1 px for border
      className: "px-[23px] py-[13px]",
    },
    {
      variant: "outline",
      size: "md",
      // -1 px for border
      className: "px-[19px] py-[11px]",
    },
    {
      isIconOnly: true,
      size: "md",
      class: "min-w-10 w-10 h-10",
    },
    {
      isIconOnly: true,
      size: "lg",
      class: "min-w-12 w-12 h-12",
    },
  ],
  defaultVariants: {
    variant: "solid",
    colorScheme: "default",
    size: "md",
    radius: "default",
  },
});

export type ButtonVariantProps = VariantProps<typeof buttonStyles>;
