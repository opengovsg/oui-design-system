import type { VariantProps } from "tailwind-variants"

import { cn } from "../utils"
import { groupFocusVisibleClasses } from "../utils/classes"
import { tv } from "../utils/tv"

export const toggleStyles = tv({
  slots: {
    base: "group/toggle inline-flex cursor-pointer items-center gap-2 disabled:cursor-default",
    track: cn(
      "box-border flex shrink-0 items-center rounded-full bg-clip-padding p-px transition duration-200 ease-in-out",
      groupFocusVisibleClasses,
    ),
    thumb:
      "flex translate-x-0 transform items-center justify-center rounded-full border bg-white transition duration-200 ease-in-out",
    thumbIcon: "",
  },
  variants: {
    colorScheme: {
      success: {
        track:
          "group-selected/toggle:bg-interaction-success-default bg-interaction-support-unselected in-disabled:bg-interaction-support-disabled in-disabled:group-selected/toggle:bg-interaction-support-disabled",
        thumb:
          "group-selected/toggle:border-interaction-success-default in-disabled:group-selected/toggle:border-interaction-support-disabled in-disabled:bg-interaction-support-unselected border-interaction-support-unselected in-disabled:border-interaction-support-disabled",
        thumbIcon:
          "group-selected/toggle:text-interaction-success-default text-interaction-support-unselected in-disabled:text-interaction-support-disabled group-selected/toggle:in-disabled:text-interaction-support-disabled",
      },
    },
    size: {
      xs: {
        track: "h-4 w-7",
        thumb:
          "group-selected/toggle:translate-x-[calc(26px-100%)] h-3.5 w-3.5",
        thumbIcon: "h-2 w-2",
      },
      sm: {
        track: "h-5 w-8",
        thumb:
          "group-selected/toggle:translate-x-[calc(30px-100%)] h-4.5 w-4.5",
        thumbIcon: "h-2.5 w-2.5",
      },
      md: {
        track: "h-6 w-10",
        thumb:
          "group-selected/toggle:translate-x-[calc(38px-100%)] h-5.5 w-5.5",
        thumbIcon: "h-3 w-3",
      },
    },
  },
  defaultVariants: {
    size: "md",
    colorScheme: "success",
  },
})

export type ToggleVariantProps = VariantProps<typeof toggleStyles>
export type ToggleSlots = keyof ReturnType<typeof toggleStyles>
