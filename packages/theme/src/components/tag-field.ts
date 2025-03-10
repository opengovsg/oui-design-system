import type { VariantProps } from "tailwind-variants"

import { focusClasses } from "../utils"
import { tv } from "../utils/tv"

export const tagFieldStyles = tv({
  slots: {
    root: "flex flex-col gap-2",
    label: "",
    group: "flex-wrap items-start gap-1",
    tag: [
      ...focusClasses,
      "bg-interaction-main-subtle-default hover:bg-interaction-main-subtle-hover text-interaction-main-default flex cursor-pointer flex-row items-center gap-1 rounded-md transition",
    ],
    tagIcon: "cursor-pointer",
    input: "h-auto min-w-24 p-0",
    trigger: "flex items-center aria-expanded:rotate-180",
    description: "",
    error: "",
    popover: "",
    list: "relative z-10 mt-1 max-h-80 w-(--trigger-width) overflow-scroll bg-white p-0 shadow-md",
    listItem:
      "aria-disabled:text-interaction-support-disabled-content hover:bg-interaction-muted-main-hover active:bg-interaction-muted-main-active flex flex-col",
  },
  variants: {
    isDisabled: {
      true: {
        group: "",
      },
    },
    variant: {},
    size: {
      md: {
        group: "min-h-11 px-2 py-1.5",
        input: "prose-body-2 py-1",
        tag: "prose-subhead-2 px-2 py-1",
        tagIcon: "size-4",
        trigger: "h-full w-5",
        listItem: "prose-body-1 px-3 py-2",
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
})

export type TagFieldVariantProps = VariantProps<typeof tagFieldStyles>
export type TagFieldSlots = keyof ReturnType<typeof tagFieldStyles>
