import type { VariantProps } from "tailwind-variants"

import { racFocusRing } from "../utils"
import { tv } from "../utils/tv"

export const linkStyles = tv({
  extend: racFocusRing,
  base: "inline cursor-pointer *:inline",
  variants: {
    color: {
      unstyled: "",
      default:
        "text-interaction-links-default hover:text-interaction-links-hover",
      neutral:
        "text-interaction-links-neutral-default hover:text-interaction-links-neutral-hover",
    },
    radius: {
      none: "rounded-none",
      sm: "rounded-sm",
      default: "rounded",
      md: "rounded-md",
      lg: "rounded-lg",
      full: "rounded-full",
    },
  },
  defaultVariants: {
    color: "default",
    radius: "sm",
  },
  compoundVariants: [
    {
      color: ["default", "neutral"],
      className:
        "disabled:text-interaction-support-disabled-content outline-offset-4 transition [-webkit-tap-highlight-color:transparent] hover:underline disabled:cursor-default disabled:no-underline",
    },
  ],
})

export type LinkVariantProps = VariantProps<typeof linkStyles>
