import type { VariantProps } from "tailwind-variants"

import { racFocusRing } from "../utils/classes"
import { tv } from "../utils/tv"

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
  base: "group relative flex w-fit shrink-0 cursor-pointer items-center justify-center transition forced-color-adjust-none",
  variants: {
    variant: {
      underlined:
        "selected:border-interaction-main-default dark:selected:border-base-divider-inverse",
      bordered: "",
    },
    prominence: {
      normal: "",
      strong: "",
    },
    isSelected: {
      false: "",
      true: "text-interaction-main-default dark:text-base-content-inverse",
    },
    isDisabled: {
      true: "forced-colors:selected:text-[HighlightText] text-interaction-support-disabled-content forced-colors:text-[GrayText]",
    },
    size: {
      md: "",
    },
    orientation: {
      horizontal: "",
      vertical: "w-full justify-start outline-offset-0",
    },
  },
  compoundVariants: [
    // Underlined variant
    {
      variant: "underlined",
      isSelected: false,
      className:
        "text-interaction-support-unselected-strong dark:text-interaction-support-unselected",
    },
    {
      prominence: "strong",
      variant: "underlined",
      size: "md",
      className: "prose-subhead-3",
    },
    {
      prominence: "normal",
      size: "md",
      orientation: "horizontal",
      className: "prose-subhead-2",
    },
    {
      variant: "underlined",
      orientation: "horizontal",
      className: "border-b-2 border-transparent pb-0.5",
    },
    {
      size: "md",
      variant: "underlined",
      className: "gap-4",
    },
    // Vertical orientation
    {
      prominence: "normal",
      size: "md",
      orientation: "vertical",
      className: "prose-body-1",
    },
    {
      variant: "underlined",
      orientation: "vertical",
      className:
        "hover:text-interaction-main-hover dark:hover:text-base-content-inverse dark:active:text-base-content-inverse active:text-interaction-main-hover dark:hover:bg-interaction-tinted-inverse-hover dark:active:bg-interaction-tinted-inverse-active hover:bg-interaction-muted-main-hover border-base-divider-strong active:bg-interaction-muted-main-active border-l-2 pb-0.5",
    },
    {
      size: "md",
      variant: "underlined",
      orientation: "vertical",
      className: "px-6 py-4",
    },
  ],
  defaultVariants: {
    size: "md",
    prominence: "strong",
    orientation: "horizontal",
    variant: "underlined",
  },
})

export type TabVariantProps = VariantProps<typeof tabStyles>

export const tabPanelStyles = tv({
  extend: racFocusRing,
  base: "text-base-content-default dark:text-base-content-inverse flex-1",
})

export type TabPanelVariantProps = VariantProps<typeof tabPanelStyles>

export const tabListStyles = tv({
  base: "flex",
  variants: {
    orientation: {
      horizontal: "flex-row overflow-x-auto",
      vertical: "flex-col items-start overflow-y-auto",
    },
    size: {
      md: "",
    },
  },
  compoundVariants: [
    {
      size: "md",
      orientation: "horizontal",
      className: "gap-8",
    },
  ],
  defaultVariants: {
    orientation: "horizontal",
    size: "md",
  },
})

export type TabListVariantProps = VariantProps<typeof tabListStyles>
