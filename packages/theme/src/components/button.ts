import { dataFocusVisibleClasses } from "../utils/classes";
import { tv } from "../utils/tv";

export const button = tv({
  base: [
    "box-border",
    "block",
    "h-full",
    "w-fit",
    "cursor-pointer",
    "rounded",
    "text-center",
    "transition",
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
    isFocusVisible: {
      true: "",
    },
    isDisabled: {
      true: "cursor-not-allowed",
    },
    size: {
      base: "prose-headline-base-medium min-h-12 px-5 py-3",
      lg: "prose-headline-lg-medium min-h-[3.25rem] px-6 py-3.5",
    },
  },
  compoundVariants: [
    {
      variant: "solid",
      colorScheme: "default",
      className:
        "bg-brand-canvas-inverse text-base-content-inverse active:bg-brand-interaction-pressed hover:bg-brand-interaction-hover hover:text-base-content-inverse",
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
        "border border-base-divider-inverse text-base-content-inverse hover:bg-base-canvas-inverse-overlay/80 hover:text-base-content-inverse",
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
      size: "base",
      // -1 px for border
      className: "px-[19px] py-[11px]",
    },
    {
      variant: "solid",
      isFocusVisible: true,
      className:
        "bg-utility-highlight text-base-content-strong transition-none",
    },
    {
      variant: "outline",
      isFocusVisible: true,
      className:
        "bg-utility-highlight text-base-content-strong transition-none",
    },
  ],
  defaultVariants: {
    variant: "solid",
    colorScheme: "default",
    size: "base",
  },
});
