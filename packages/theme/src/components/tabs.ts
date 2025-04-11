import type { VariantProps } from "tailwind-variants"

import { racFocusRing } from "../utils/classes"
import { tv } from "../utils/tv"

export const tabStylesAll = tv({
  slots: {},
})

export const tabsStyles = tv({
  base: "flex gap-4",
  variants: {
    prominence: {
      normal: "",
      strong: "",
    },
    orientation: {
      horizontal: "flex-col",
      vertical: "w-[800px] flex-row",
    },
    size: {
      md: "",
    },
  },
})
export type TabsVariantProps = VariantProps<typeof tabsStyles>

export const tabStyles = tv({
  extend: racFocusRing,
  base: "flex cursor-pointer items-center justify-start transition forced-color-adjust-none",
  variants: {
    prominence: {
      normal: "",
      strong: "",
    },
    isSelected: {
      false: "",
      true: "text-interaction-main-default",
    },
    isDisabled: {
      true: "forced-colors:selected:text-[HighlightText] text-interaction-support-disabled-content forced-colors:text-[GrayText]",
    },
    size: {
      md: "",
    },
    orientation: {
      horizontal:
        "selected:border-interaction-main-default mb-0.5 border-b-2 border-transparent",
      vertical: "",
    },
  },
  compoundVariants: [
    {
      prominence: "strong",
      size: "md",
      className: "prose-subhead-3",
    },
    {
      prominence: "normal",
      size: "md",
      className: "prose-subhead-2",
    },
  ],
  defaultVariants: {
    size: "md",
    prominence: "strong",
    orientation: "horizontal",
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
    size: {
      md: "gap-8",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    size: "md",
  },
})

export type TabListVariantProps = VariantProps<typeof tabListStyles>
