import type { VariantProps } from "tailwind-variants"

import { cn } from "../utils"
import { groupFocusVisibleClasses } from "../utils/classes"
import { tv } from "../utils/tv"

export const toggleStyles = tv({
  slots: {
    base: "inline-flex cursor-pointer items-center gap-2 disabled:cursor-default",
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
          "in-selected:bg-interaction-success-default bg-interaction-support-unselected in-disabled:bg-interaction-support-disabled in-disabled:in-selected:bg-interaction-support-disabled",
        thumb:
          "in-selected:border-interaction-success-default in-disabled:in-selected:border-interaction-support-disabled in-disabled:bg-interaction-support-unselected border-interaction-support-unselected in-disabled:border-interaction-support-disabled",
        thumbIcon:
          "in-selected:text-interaction-success-default text-interaction-support-unselected in-disabled:text-interaction-support-disabled in-selected:in-disabled:text-interaction-support-disabled",
      },
    },
    size: {
      xs: {
        track: "h-[16px] w-[28px]",
        thumb: "in-selected:translate-x-[calc(26px-100%)] h-[14px] w-[14px]",
        thumbIcon: "h-[8px] w-[8px]",
      },
      sm: {
        track: "h-[20px] w-[32px]",
        thumb: "in-selected:translate-x-[calc(30px-100%)] h-[18px] w-[18px]",
        thumbIcon: "h-[10px] w-[10px]",
      },
      md: {
        track: "h-[24px] w-[40px]",
        thumb: "in-selected:translate-x-[calc(38px-100%)] h-[22px] w-[22px]",
        thumbIcon: "h-[12px] w-[12px]",
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
