import type { VariantProps } from "tailwind-variants"

import { cn } from "../utils"
import { racFocusRing } from "../utils/classes"
import { tv } from "../utils/tv"

export const radioStyles = tv({
  slots: {
    circle: cn(
      "flex w-full shrink-0 items-center justify-center self-start rounded-full border-2 bg-white transition",
      racFocusRing.base,
    ),
    base: "group flex items-start",
    icon: "rounded-full transition",
  },
  variants: {
    size: {
      xs: {
        circle: "h-4 w-4",
        base: "prose-body-2 gap-3 px-1 py-2",
        icon: "h-2 w-2",
      },
      sm: {
        circle: "h-5 w-5",
        base: "prose-body-2 gap-3 px-1 py-2.5",
        icon: "h-2.5 w-2.5",
      },
      md: {
        circle: "h-6 w-6",
        base: "prose-body-1 gap-4 px-1 py-2.5",
        icon: "h-3 w-3",
      },
    },
    isFocusVisible: {
      true: {
        circle: racFocusRing.variants.isFocusVisible.true,
      },
      false: {
        circle: racFocusRing.variants.isFocusVisible.false,
      },
    },
    isDisabled: {
      false: {
        base: "text-gray-800",
      },
      true: {
        base: "text-interaction-support-disabled-content forced-colors:text-[GrayText]",
        box: "[--color:var(--color-gray-200)] forced-colors:[--color:GrayText]!",
      },
    },
    isSelected: {
      true: {
        circle: "border-interaction-main-default",
        icon: "bg-interaction-main-default scale-100",
      },
      false: {
        icon: "scale-0",
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
})

export type RadioVariantProps = VariantProps<typeof radioStyles>
export type RadioSlots = keyof ReturnType<typeof radioStyles>

export const radioGroupStyles = tv({
  base: "flex w-full flex-col",
  variants: {
    size: {
      xs: "",
      sm: "",
      md: "",
    },
  },
})

export type RadioGroupVariantProps = VariantProps<typeof radioGroupStyles>
