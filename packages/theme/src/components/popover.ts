import type { VariantProps } from "tailwind-variants"

import { tv } from "../utils/tv"

export const popoverStyles = tv({
  base: "bg-utility-ui text-base-content-strong rounded-sm bg-clip-padding shadow-sm forced-colors:bg-[Canvas]",
  variants: {
    isEntering: {
      true: "animate-in fade-in placement-bottom:slide-in-from-top-1 placement-top:slide-in-from-bottom-1 placement-left:slide-in-from-right-1 placement-right:slide-in-from-left-1 duration-200 ease-out",
    },
    isExiting: {
      true: "animate-out fade-out placement-bottom:slide-out-to-top-1 placement-top:slide-out-to-bottom-1 placement-left:slide-out-to-right-1 placement-right:slide-out-to-left-1 duration-150 ease-in",
    },
  },
})

export type PopoverVariantProps = VariantProps<typeof popoverStyles>

export const popoverArrowStyles = tv({
  base: "group-placement-bottom:rotate-180 group-placement-left:-rotate-90 group-placement-right:rotate-90 fill-utility-ui block forced-colors:fill-[Canvas] forced-colors:stroke-[ButtonBorder]",
})
