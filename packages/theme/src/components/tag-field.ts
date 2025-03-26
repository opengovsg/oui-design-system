import type { VariantProps } from "tailwind-variants"

import { focusVisibleClasses } from "../utils"
import { tv } from "../utils/tv"

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
    list: "relative z-10 max-h-80 w-(--trigger-width) overflow-y-auto rounded-b-sm bg-white p-0 shadow-sm",
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
