import type { VariantProps } from "tailwind-variants"

import { cn } from "../utils"
import { racFocusRing } from "../utils/classes"
import { tv } from "../utils/tv"

export const checkboxStyles = tv({
  slots: {
    box: cn(
      "flex w-full shrink-0 items-center justify-center self-start rounded-sm border-2 bg-white transition",
      racFocusRing.base,
    ),
    base: "group relative flex items-stretch transition",
    icon: "h-4 w-4 text-white group-disabled:text-white forced-colors:text-[HighlightText]",
  },
  variants: {
    color: {
      default: {
        base: "hover:bg-interaction-muted-main-hover pressed:bg-interaction-muted-main-active",
      },
    },
    size: {
      xs: {
        box: "mt-0.5 h-4 w-4",
        base: "prose-body-2 gap-3 px-1 py-2",
      },
      sm: {
        box: "h-5 w-5",
        base: "prose-body-2 gap-3 px-1 py-2",
      },
      md: {
        base: "prose-body-1 gap-4 px-1 py-2.5",
        box: "h-6 w-6",
      },
    },
    isFocusVisible: {
      true: {
        box: racFocusRing.variants.isFocusVisible.true,
      },
      false: {
        box: racFocusRing.variants.isFocusVisible.false,
      },
    },
    isDisabled: {
      true: {
        base: "text-interaction-support-disabled-content forced-colors:text-[GrayText]",
      },
    },
    isSelected: {
      false: {
        box: "group-pressed:[--color:var(--color-base-content-strong)]",
      },
      true: {
        box: "border-(--color) bg-(--color) forced-colors:[--color:Highlight]!",
      },
    },
    isInvalid: {
      true: {
        box: "group-pressed:[--color:var(--color-interaction-critical-active)] [--color:var(--color-interaction-critical-default)] forced-colors:[--color:Mark]!",
      },
    },
  },
  compoundVariants: [
    {
      color: "default",
      isSelected: true,
      className: {
        box: "group-pressed:[--color:var(--color-interaction-main-active)] [--color:var(--color-interaction-main-default)]",
      },
    },
    {
      isDisabled: true,
      isSelected: true,
      className: {
        box: "[--color:var(--color-interaction-support-disabled-content)]",
      },
    },
    {
      isDisabled: true,
      isSelected: false,
      className: {
        box: "[--color:var(--color-interaction-support-disabled-content)]",
      },
    },
    {
      isInvalid: true,
      isSelected: true,
      className: {
        box: "group-pressed:[--color:var(--color-interaction-critical-active)] [--color:var(--color-interaction-critical-default)]",
      },
    },
  ],
  defaultVariants: {
    size: "md",
    color: "default",
  },
})

export type CheckboxVariantProps = VariantProps<typeof checkboxStyles>
export type CheckboxSlots = keyof ReturnType<typeof checkboxStyles>

export const checkboxGroupStyles = tv({
  base: "flex w-full flex-col",
  variants: {
    size: {
      xs: "",
      sm: "",
      md: "",
    },
  },
})
