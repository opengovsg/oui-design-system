import type { VariantProps } from "tailwind-variants"

import { tv } from "../utils/tv"

export const inputStyles = tv({
  base: "text-base-content placeholder:text-interaction-support-placeholder disabled:text-interaction-support-disabled-content w-full min-w-0 flex-1 rounded-sm bg-white outline-hidden",
  variants: {
    size: {
      xs: "prose-caption-2 placeholder:prose-subhead-5 h-[2.25rem] px-2",
      sm: "prose-caption-2 h-10 px-2 py-2.5 text-[1rem] sm:text-xs", // Minimum 16px font for ios
      md: "prose-body-1 h-10 px-3 py-2",
      lg: "h-12 px-3 py-2.5 text-2xl",
    },
    variant: {
      outline:
        "border-base-divider-strong invalid:border-interaction-critical invalid:border-interaction-critical-default focus:border-utility-focus-default shadow-utility-focus-default border not-motion-reduce:transition-shadow focus:shadow-[0_0_0_1px]",
      unstyled: "",
    },
  },
  defaultVariants: {
    size: "md",
    variant: "outline",
  },
})

export type InputVariantProps = VariantProps<typeof inputStyles>
