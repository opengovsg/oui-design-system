import type { VariantProps } from "tailwind-variants"

import { tv } from "../utils/tv"

export const inputStyles = tv({
  base: "text-base-content placeholder:text-interaction-support-placeholder w-full min-w-0 flex-1 rounded-sm bg-white outline-hidden",
  variants: {
    size: {
      xs: "prose-body-2 placeholder:prose-subhead-5 max-sm:prose-body-1 h-9 px-3 py-2",
      sm: "prose-body-2 max-sm:prose-body-1 h-10 px-3 py-2.5",
      md: "prose-body-1 h-11 px-3 py-2",
    },
    variant: {
      outline:
        "border-base-divider-strong invalid:border-interaction-critical-default focus:border-utility-focus-default shadow-utility-focus-default border not-motion-reduce:transition-shadow focus:shadow-[0_0_0_1px]",
      unstyled: "",
    },
    isDisabled: {
      true: "text-interaction-support-disabled-content bg-interaction-support-disabled placeholder:text-interaction-support-disabled-content",
    },
  },
  defaultVariants: {
    size: "md",
    variant: "outline",
  },
})

export type InputVariantProps = VariantProps<typeof inputStyles>
