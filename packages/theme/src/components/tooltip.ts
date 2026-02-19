import type { VariantProps } from "tailwind-variants"

import { tv } from "../utils/tv"

export const tooltipStyles = tv({
  slots: {
    base: "group prose-body-2 box-border will-change-transform",
    arrow:
      "group-placement-bottom:rotate-180 group-placement-left:-rotate-90 group-placement-right:rotate-90 block forced-colors:fill-[Canvas] forced-colors:stroke-[ButtonBorder]",
  },
  variants: {
    radius: {
      none: {
        base: "rounded-none",
      },
      sm: {
        base: "rounded-sm",
      },
      default: {
        base: "rounded",
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
    isEntering: {
      true: {
        base: "animate-in fade-in placement-bottom:slide-in-from-top-0.5 placement-top:slide-in-from-bottom-0.5 placement-left:slide-in-from-right-0.5 placement-right:slide-in-from-left-0.5 duration-200 ease-out",
      },
    },
    isExiting: {
      true: {
        base: "animate-out fade-out placement-bottom:slide-out-to-top-0.5 placement-top:slide-out-to-bottom-0.5 placement-left:slide-out-to-right-0.5 placement-right:slide-out-to-left-0.5 duration-150 ease-in",
      },
    },
    variant: {
      unstyled: {},
      default: {
        base: "bg-base-content-strong text-base-content-inverse border-base-content-strong border px-3 py-2",
        arrow: "fill-base-content-strong stroke-base-content-strong",
      },
    },
    size: {},
  },
  defaultVariants: {
    variant: "default",
    radius: "sm",
  },
})

export type TooltipVariantProps = VariantProps<typeof tooltipStyles>
export type TooltipSlots = keyof ReturnType<typeof tooltipStyles>
