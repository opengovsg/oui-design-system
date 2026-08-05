import type { VariantProps } from "tailwind-variants"

import { focusVisibleClasses } from "../utils"
import { tv } from "../utils/tv"
import { listBoxItemStyles } from "./list-box"

export const tagFieldStyles = tv({
  slots: {
    root: "flex flex-col gap-2",
    label: "",
    group: "flex-wrap items-start",
    tag: [
      ...focusVisibleClasses,
      "bg-interaction-main-subtle-default hover:bg-interaction-main-subtle-hover focus:bg-interaction-main-subtle-hover text-interaction-main-default flex cursor-pointer flex-row items-center gap-1 rounded-md transition",
    ],
    tagText: "line-clamp-1",
    tagIcon: "shrink-0 cursor-pointer",
    field: "h-auto min-w-24 p-0",
    trigger: "flex items-center aria-expanded:rotate-180",
    description: "",
    error: "",
    popover: "rounded-t-none",
    list: "relative z-10 max-h-80 w-(--trigger-width) overflow-y-auto p-0",
  },
  variants: {
    isDisabled: {
      true: {
        group: "",
      },
    },
    variant: {},
    size: {
      xs: {
        group: "prose-body-2 min-h-9 gap-1 px-2 py-1",
        field: "placeholder:prose-subhead-5 my-0.5 h-5 px-1",
        tag: "prose-caption-1 my-0.5 px-2 py-0.5",
        tagIcon: "size-3.5",
        trigger: "h-6 w-4",
      },
      sm: {
        group: "prose-body-2 min-h-10 gap-1 px-2 py-1.5",
        field: "h-6 px-1",
        tag: "prose-body-2 px-2 py-0.5",
        tagIcon: "size-4.5",
        trigger: "h-6 w-4",
      },
      md: {
        group: "prose-body-1 min-h-11 gap-1 px-2 py-1.5",
        field: "h-7 px-2",
        tag: "prose-subhead-2 px-2 py-1",
        tagIcon: "size-4.5",
        trigger: "h-7 w-5",
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
})

export type TagFieldVariantProps = VariantProps<typeof tagFieldStyles>
export type TagFieldSlots = keyof ReturnType<typeof tagFieldStyles>

export const tagFieldItemStyles = tv({
  extend: listBoxItemStyles,
  slots: {
    container: "flex-row items-start gap-2",
    checkboxBox:
      "flex shrink-0 items-center justify-center rounded-sm border-2 border-(--color) bg-white transition [--color:var(--color-base-content-strong)]",
    checkboxIcon: "text-white",
  },
  variants: {
    // xs needs a small margin-top to center the box against the label's
    // first line; sm and md are already centered without one.
    size: {
      xs: { checkboxBox: "mt-0.5 h-4 w-4", checkboxIcon: "h-3 w-3" },
      sm: { checkboxBox: "h-5 w-5", checkboxIcon: "h-3.5 w-3.5" },
      md: { checkboxBox: "h-6 w-6", checkboxIcon: "h-4 w-4" },
    },
    isSelected: {
      true: {
        checkboxBox:
          "border-(--color) bg-(--color) [--color:var(--color-interaction-main-default)]",
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
})

export type TagFieldItemVariantProps = VariantProps<typeof tagFieldItemStyles>
export type TagFieldItemSlots = keyof ReturnType<typeof tagFieldItemStyles>
