import type { VariantProps } from "tailwind-variants"

import { cn } from "../utils"
import { racFocusRing } from "../utils/classes"
import { tv } from "../utils/tv"

export const checkboxStyles = tv({
  slots: {
    box: cn(
      "flex shrink-0 items-center justify-center self-start rounded-sm border-2 transition",
      racFocusRing.base,
    ),
    input: "group relative flex items-center transition",
    icon: "h-4 w-4 text-white group-disabled:text-white dark:text-slate-900 dark:group-disabled:text-slate-600 forced-colors:text-[HighlightText]",
  },
  variants: {
    color: {
      default: {
        input:
          "hover:bg-interaction-muted-main-hover pressed:bg-interaction-muted-main-active",
      },
    },
    size: {
      xs: {
        box: "mt-0.5 h-4 w-4",
        input: "prose-body-2 gap-3 px-1 py-2",
      },
      sm: {
        box: "h-5 w-5",
        input: "prose-body-2 gap-3 px-1 py-2",
      },
      md: {
        input: "prose-body-1 gap-4 px-1 py-2.5",
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
      false: {
        input: "text-gray-800 dark:text-zinc-200",
      },
      true: {
        input:
          "text-interaction-support-disabled-content dark:text-zinc-600 forced-colors:text-[GrayText]",
        box: "[--color:var(--color-gray-200)] dark:[--color:var(--color-zinc-700)] forced-colors:[--color:GrayText]!",
      },
    },
    isSelected: {
      false: {
        box: "group-pressed:[--color:var(--color-base-content-strong)] dark:group-pressed:[--color:var(--color-zinc-300)] border-(--color) bg-white [--color:var(--color-base-content-strong)] dark:bg-zinc-900 dark:[--color:var(--color-zinc-400)]",
      },
      true: {
        box: "border-(--color) bg-(--color) forced-colors:[--color:Highlight]!",
      },
    },
    isInvalid: {
      true: {
        box: "group-pressed:[--color:var(--color-interaction-critical-active)] dark:group-pressed:[--color:var(--color-red-700)] [--color:var(--color-interaction-critical-default)] dark:[--color:var(--color-red-600)] forced-colors:[--color:Mark]!",
      },
    },
  },
  compoundVariants: [
    {
      color: "default",
      isSelected: true,
      className: {
        box: "group-pressed:[--color:var(--color-interaction-main-active)] dark:group-pressed:[--color:var(--color-slate-200)] [--color:var(--color-interaction-main-default)] dark:[--color:var(--color-slate-300)]",
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
      isInvalid: true,
      isSelected: true,
      className: {
        box: "group-pressed:[--color:var(--color-interaction-critical-active)] [--color:var(--color-interaction-critical-default)] dark:[--color:var(--color-red-600)]",
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
  base: "flex flex-col",
})
