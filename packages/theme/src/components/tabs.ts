import type { VariantProps } from "tailwind-variants"

import { racFocusRing } from "../utils/classes"
import { tv } from "../utils/tv"

export const tabStylesAll = tv({
  slots: {},
})

export const tabsStyles = tv({
  base: "flex gap-4",
  variants: {
    orientation: {
      horizontal: "flex-col",
      vertical: "w-[800px] flex-row",
    },
  },
})
export type TabsVariantProps = VariantProps<typeof tabsStyles>

export const tabStyles = tv({
  extend: racFocusRing,
  base: "flex cursor-default items-center rounded-full px-4 py-1.5 text-sm font-medium transition forced-color-adjust-none",
  variants: {
    isSelected: {
      false:
        "pressed:text-gray-700 dark:pressed:text-zinc-200 pressed:bg-gray-200 dark:pressed:bg-zinc-800 text-gray-600 hover:bg-gray-200 hover:text-gray-700 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-200",
      true: "bg-gray-800 text-white dark:bg-zinc-200 dark:text-black forced-colors:bg-[Highlight] forced-colors:text-[HighlightText]",
    },
    isDisabled: {
      true: "selected:text-gray-300 dark:selected:text-zinc-500 forced-colors:selected:text-[HighlightText] selected:bg-gray-200 dark:selected:bg-zinc-600 forced-colors:selected:bg-[GrayText] text-gray-200 dark:text-zinc-600 forced-colors:text-[GrayText]",
    },
  },
})

export type TabVariantProps = VariantProps<typeof tabStyles>

export const tabPanelStyles = tv({
  extend: racFocusRing,
  base: "flex-1 p-4 text-sm text-gray-900 dark:text-zinc-100",
})

export type TabPanelVariantProps = VariantProps<typeof tabPanelStyles>

export const tabListStyles = tv({
  base: "flex gap-1",
  variants: {
    orientation: {
      horizontal: "flex-row",
      vertical: "flex-col items-start",
    },
  },
})

export type TabListVariantProps = VariantProps<typeof tabListStyles>
