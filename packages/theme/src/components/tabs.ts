import type { VariantProps } from "tailwind-variants"

import { racFocusRing } from "../utils/classes"
import { tv } from "../utils/tv"

export const tabsStyles = tv({
  base: "isolate flex gap-4",
  variants: {
    variant: {
      underlined: "",
      bordered: "",
    },
    prominence: {
      normal: "",
      strong: "",
    },
    orientation: {
      horizontal: "flex-col",
      vertical: "w-[800px] flex-row",
    },
    size: {
      xs: "",
      sm: "",
      md: "",
      lg: "",
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
      bordered:
        "border-base-divider-strong not-selected:hover:bg-interaction-muted-main-hover active:bg-interaction-muted-main-active border",
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
      true: "forced-colors:selected:text-[HighlightText] text-interaction-support-disabled-content cursor-not-allowed forced-colors:text-[GrayText]",
    },
    size: {
      xs: "",
      sm: "",
      md: "",
      lg: "",
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
      isDisabled: false,
      className:
        "text-interaction-support-unselected-strong dark:text-interaction-support-unselected",
    },
    {
      variant: "underlined",
      isDisabled: true,
      className:
        "selected:text-interaction-support-disabled-content dark:selected:text-base-content-inverse selected:border-base-divider-strong text-interaction-support-disabled-content dark:text-interaction-support-unselected",
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
    // Bordered variant
    {
      variant: "bordered",
      size: "xs",
      className: "px-4 py-2",
    },
    {
      variant: "bordered",
      size: "sm",
      className: "px-4 py-2",
    },
    {
      variant: "bordered",
      size: "md",
      className: "px-4 py-2.5",
    },
    {
      variant: "bordered",
      size: "lg",
      className: "px-4 py-3",
    },
    {
      variant: "bordered",
      isSelected: true,
      className:
        "bg-interaction-muted-main-active border-interaction-main-default z-1",
    },
    {
      variant: "bordered",
      isDisabled: true,
      className:
        "bg-interaction-support-disabled selected:text-interaction-support-disabled-content border-base-divider-strong selected:bg-interaction-muted-main-active active:bg-interaction-support-disabled",
    },
    {
      variant: "bordered",
      orientation: "horizontal",
      className: "not-last:-me-px first:rounded-s-sm last:rounded-e-sm",
    },
    {
      variant: "bordered",
      orientation: "vertical",
      className: "not-last:-mb-px first:rounded-t-sm last:rounded-b-sm",
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
    variant: {
      underlined: "",
      bordered: "",
    },
    orientation: {
      horizontal: "flex-row overflow-x-auto",
      vertical: "flex-col items-start overflow-y-auto",
    },
    size: {
      xs: "",
      sm: "",
      md: "",
      lg: "",
    },
  },
  compoundVariants: [
    {
      size: "md",
      orientation: "horizontal",
      variant: "underlined",
      className: "gap-8",
    },
  ],
  defaultVariants: {
    orientation: "horizontal",
    variant: "underlined",
    size: "md",
  },
})

export type TabListVariantProps = VariantProps<typeof tabListStyles>
