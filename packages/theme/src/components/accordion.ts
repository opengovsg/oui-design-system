import type { VariantProps } from "tailwind-variants"

import { focusVisibleClasses } from "../utils"
import { tv } from "../utils/tv"

export const accordionStyles = tv({
  slots: {
    base: "w-full",
    item: "border-base-divider-medium min-w-50 border-b first:border-t",
    heading: "",
    title: "flex-1 text-left",
    startContentWrapper: "inline-flex items-center",
    endContentWrapper: "inline-flex items-center",
    trigger: [
      "text-base-content-strong disabled:text-interaction-support-disabled-content flex w-full items-start justify-start gap-2 transition-colors",
      ...focusVisibleClasses,
      "outline-offset-0",
    ],
    indicator: "inline-flex transition-transform duration-200 ease-in-out",
    panel:
      "h-(--disclosure-panel-height) overflow-clip motion-safe:transition-[height]",
    content: "",
  },
  variants: {
    isExpanded: {
      true: {
        indicator: "rotate-180 transform",
      },
    },
    color: {
      main: {
        trigger:
          "hover:bg-interaction-muted-main-hover active:bg-interaction-muted-main-active disabled:bg-inherit",
      },
    },
    size: {
      sm: {
        title: "prose-subhead-2",
        trigger: "px-4 py-3",
        indicator: "size-5",
        content: "prose-body-2 px-4 pt-2 pb-6",
        startContentWrapper: "h-5 w-4",
        endContentWrapper: "h-5 w-4",
      },
      md: {
        title: "prose-subhead-1",
        trigger: "px-4 py-5",
        indicator: "size-6",
        content: "prose-body-1 px-4 pt-2 pb-6",
        startContentWrapper: "h-6 w-5",
        endContentWrapper: "h-6 w-5",
      },
    },
  },
  defaultVariants: {
    size: "md",
    color: "main",
  },
})

export type AccordionVariantProps = VariantProps<typeof accordionStyles>

export type AccordionSlots = keyof ReturnType<typeof accordionStyles>
