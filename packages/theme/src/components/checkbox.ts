import type { VariantProps } from "tailwind-variants"

import { cn } from "../utils"
import { racFocusRing } from "../utils/classes"
import { tv } from "../utils/tv"

export const checkboxStyles = tv({
  slots: {
    box: cn(
      "flex h-5 w-5 shrink-0 items-center justify-center rounded-sm border-2 transition",
      racFocusRing.base,
    ),
    input: "group relative flex items-center gap-2 text-sm transition",
    icon: "h-4 w-4 text-white group-disabled:text-gray-400 dark:text-slate-900 dark:group-disabled:text-slate-600 forced-colors:text-[HighlightText]",
  },
  variants: {
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
        input: "text-gray-300 dark:text-zinc-600 forced-colors:text-[GrayText]",
        box: "[--color:var(--color-gray-200)] dark:[--color:var(--color-zinc-700)] forced-colors:[--color:GrayText]!",
      },
    },
    isSelected: {
      false: {
        box: "group-pressed:[--color:var(--color-gray-500)] dark:group-pressed:[--color:var(--color-zinc-300)] border-(--color) bg-white [--color:var(--color-gray-400)] dark:bg-zinc-900 dark:[--color:var(--color-zinc-400)]",
      },
      true: {
        box: "group-pressed:[--color:var(--color-gray-800)] dark:group-pressed:[--color:var(--color-slate-200)] border-(--color) bg-(--color) [--color:var(--color-gray-700)] dark:[--color:var(--color-slate-300)] forced-colors:[--color:Highlight]!",
      },
    },
    isInvalid: {
      true: {
        box: "group-pressed:[--color:var(--color-red-800)] dark:group-pressed:[--color:var(--color-red-700)] [--color:var(--color-red-700)] dark:[--color:var(--color-red-600)] forced-colors:[--color:Mark]!",
      },
    },
  },
})

export type CheckboxVariantProps = VariantProps<typeof checkboxStyles>
export type CheckboxSlots = keyof ReturnType<typeof checkboxStyles>

export const checkboxGroupStyles = tv({
  base: "flex flex-col gap-2",
})
